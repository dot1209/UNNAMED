import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { Fab, Grid, IconButton } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/joy';
import Message from "./Message"

const FabChatroom = ({ news_id }) => {
  const [open, setOpen] = useState(false);

  const handleFabClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    { !open && (
      <Fab color='primary' onClick={handleFabClick}>
        <QuestionAnswerIcon />
      </Fab>
    )}
    { open && <Chatroom news_id={news_id} handleClose={handleClose} />}
    </>
  );
}

const Chatroom = ({ news_id }) => {
  const [messages, setMessages] = useState([]);
  const [snipper, setSnipper] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const submitStatus = useRef(false);

  function handleSendMessage(e) {
    e.preventDefault();
    if (currentMessage.trim() === '') return;
    setMessages([...messages, {
      text: currentMessage,
      source: 'user',
      cypher: "" }
    ]);
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
      <Message message={message} key={index}/>
    ));
  }, [messages]);
 
  useEffect(() => {
    if (!submitStatus.current) return;
    const data = {
      "question": messages.at(messages.length-1).text,
      "news_id": news_id
    };
    setSnipper(true);
    fetch("http://127.0.0.1:8000/single-content-answer", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        // process neoviz

        let response = [];
        if (data.error === "true") {
          response.push({
            "text": "出了點問題",
            "source": "system",
            "link": "",
            "cypher": ""
          });
        }
        else if (data.error === "false" && data.answers.length === 0) {
          response.push({
            "text": "查無結果",
            "source": "system",
            "cypher": "",
            "link": ""
          });
        }
        else {
          for (let i = 0; i < data.answers.length; i++) {
            response.push({
              "text": data.answers[i].answer,
              "link": "",
              "source": "system",
              "cypher": ""
            });
          }
          response.push({
            "text": "",
            "source": "system",
            "cypher": data.cypher
          });
        }
        // set current message to system
        setMessages([...messages, ...response]);
      })
      .finally(() => {
        submitStatus.current = false;
        setSnipper(false);
      });
  }, [messages, news_id]);

  return (
    <Grid container justifyContent={"center"} alignItems={"end"}>
      <div className="chat-container">
        <Grid container justifyContent={"center"}>
          <Typography level='h4'> 🤔💭 </Typography>
          {/* <IconButton aria-label='close'>
            <CloseIcon />
          </IconButton> */}
        </Grid>
        <div className="chat-box" ref={chatBoxRef}>
          {/* Put message here */}
          {/* use index as key, we dont change the order */}
          {messages.map((message, index) => (
            <Message message={message} index={index} key={index} />
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

export {Chatroom, FabChatroom};
