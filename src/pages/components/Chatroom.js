import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { Grid } from '@mui/material';
import { Typography } from '@mui/joy';

const Chatroom = ({ news_id }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const submitStatus = useRef(false);

  function handleSendMessage(e) {
    e.preventDefault();
    if (currentMessage.trim() === '') return;
    setMessages([...messages, { text: currentMessage, source: 'user' }]);
    setCurrentMessage('');
    submitStatus.current = true;
  }

  function handleInputChange(e) {
    setCurrentMessage(e.target.value);
  }

  const chatBoxRef = useRef(null);
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
    messages.map((message, index) => (
      <div
        className={`message ${message.source}`}
        key={index}
      >
        {message.text}
      </div>
    ));
  }, [messages]);
 
  useEffect(() => {
    if (!submitStatus.current) return;
    const data = {
      "question": messages.at(messages.length-1).text,
      "news_id": news_id
    };
    fetch("http://127.0.0.1:8000/single-content-answer", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      "body": JSON.stringify(data)
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        // build message
        let prompt = data.prompt + "可能的原因有：";
        let response = []
        response.push({text: prompt, source: "system"})
        for (let i = 0; i < data.answers.length; i++) {
          response.push({text: data.answers[i].answer, source: "system"});
        }
        // set current message to system
        setMessages([...messages, ...response]);
      })
      .finally(submitStatus.current = false);
  }, [messages, news_id]);

  return (
    <Grid container justifyContent={"center"} alignItems={"end"}>
      <div className="chat-container">
        <Grid container justifyContent={"center"}>
          <Typography level='h4'> 🤔💭 </Typography>
        </Grid>
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((message, index) => (
            <div
              className={`message ${message.source}`}
              key={index}
            >
              {message.text}
            </div>
          ))}
        </div>

        <form className="message-form" onSubmit={handleSendMessage}>
          <input
            className="message-input"
            type="text"
            placeholder="Type your message here..."
            value={currentMessage}
            onChange={handleInputChange}
          />
          <button className="send-button" type="submit">
            Send
          </button>
        </form>
      </div>
    </Grid>
  );
}

export default Chatroom;