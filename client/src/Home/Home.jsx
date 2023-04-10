import React from "react";
import "./Home.css";

const Home = () => {
    const topics = ["Greetings like 'Hi', 'Hello'.","What is your name"]
  return (
    <div className="home-wrapper">
      <div className="heading">
        <h2>Chatbot using ReactJs and Nodejs</h2>
      </div>
      <div className="home-details">
        <div className="home-title">
          Here is the list of topics you can ask for,
        </div>
        <ul className="topics">
            {topics.map((el,ind)=>{
                return (
                    <li className="topic" key={ind}>{el}</li>
                )
            })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
