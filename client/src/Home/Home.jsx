import React from "react";
import "./Home.css";
import { AiFillMessage } from "react-icons/ai";

import logo from "../assets/BotJS.png";

const Home = () => {
  const topics = [
    "Greetings like 'Hi', 'Hello'",
    "Who developed you ?",
    "Ask me a riddle",
    "What can you do ?",
    "How old are you ?",
    "See you later !",
    "Tell me a joke",
    "haha !!",
    "Awesome",
    "Thank You",
    "what tech stack is used to build you ?",
  ];
  return (
    <div className="home-wrapper">
      <img src={logo} className="logo" />
      <div className="heading">
        <h2>Chatbot using ReactJs, ExpressJs and Nodejs</h2>
      </div>
      <div className="home-details">
        <div className="home-title starting-guide">
          Click <AiFillMessage color="blue" fontSize={35} /> at the bottom-right to get started !
        </div>
        <div className="home-title">
          Here is the list of topics you can ask for,
        </div>
        <ul className="topics">
          {topics.map((el, ind) => {
            return (
              <li className="topic" key={ind}>
                {el}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
