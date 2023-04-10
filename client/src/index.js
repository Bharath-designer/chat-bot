import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ChatBot from "./chatBot/ChatBot"
import Home from './Home/Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Home/>
    <ChatBot />

  </React.StrictMode>
);

