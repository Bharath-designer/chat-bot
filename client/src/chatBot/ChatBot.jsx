import axios from "axios";

import { AiFillMessage } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import "./ChatBot.style.css";
import { useRef } from "react";

const ChatBot = () => {
  const [showBot, setShowBot] = useState(false);
  const [message, setMessage] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [chats, setChats] = useState([]);

  const loaderRef = useRef();

  let dotCount = 1;

  const changeLoader = () => {
    if (loaderRef.current)
      loaderRef.current.innerHTML = "Bot is typing" + " .".repeat(dotCount++);
    if (dotCount === 5) dotCount = 1;
  };

  useEffect(() => {
    if (botTyping) {
      const intervalID = setInterval(changeLoader, 200);
      return () => {
        dotCount = 1;
        clearInterval(intervalID);
      };
    }
  }, [botTyping]);

  const toggleBot = () => {
    setShowBot(!showBot);
  };

  const handleSend = () => {
    const inputField = document.querySelector("#inputField");
    inputField.focus();
    if (!message || botTyping) return;
    setBotTyping(true);
    const tempObj = { sender: "user", text: message };
    setChats((chat) => [...chat, tempObj]);
    setMessage("");
    axios
      .post("/msg", { message: message })
      .then((res) => {
        let tempObj = { sender: "bot" };
        tempObj[res.data.type] = res.data.value || "I can't understand what you said.";
        setChats((chat) => [...chat, tempObj]);
        setBotTyping(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const chatWindow = document.querySelector(".chat-window");
    chatWindow && (chatWindow.scrollTop = chatWindow.scrollHeight);
  }, [chats, showBot]);
  return (
    <div className="chatBot">
      <AnimatePresence>
        {showBot && (
          <motion.div
            initial={{
              y: "100px",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100px",
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "circOut",
            }}
            className="chatBot-container"
          >
            <div className="chatBot-header">
              {botTyping && (
                <div ref={loaderRef} className="loader">
                  Bot is typing . . . .
                </div>
              )}
            </div>
            <div className="chat-window">
              {chats.map((chat, key) => {
                if (chat.sender === "user") {
                  return (
                    <div key={key} className="chat-row-user">
                      <div className="user-chat">{chat.text}</div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={key}
                      className="vertical-align-bot-chat chat-row-bot"
                    >
                      {chat.text && <div className="bot-chat">{chat.text}</div>}
                      {chat.image && (
                        <img className="image-chat" src={chat.image} />
                      )}
                      {chat.buttons &&
                        chat.buttons.map((field, k) => (
                          <button key={k} className="bot-chat bot-payloads ">
                            {field.title}
                          </button>
                        ))}
                    </div>
                  );
                }
              })}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="input-row"
            >
              <input
                autoComplete="off"
                onChange={(e) => setMessage(e.target.value)}
                type=""
                value={message}
                id="inputField"
                placeholder="Start Conversation...."
              />
              <button type="submit">
                <IoMdSend color="white" size="18px" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="toggle-chatBot-btn">
        <button onClick={toggleBot}>
          {showBot ? (
            <IoClose color="blue" size="100%" />
          ) : (
            <AiFillMessage color="blue" size="100%" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
