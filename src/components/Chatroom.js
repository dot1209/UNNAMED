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

const Chatroom = ({ news_id, w, h }) => {
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
    // TODO: use env
    const server = "http://140.116.245.147:888/";
    const endpoint = news_id ? server+"single-content-answer" : server+"multiple-content-answer"
    fetch(endpoint, {
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
            "cypher": "",
            "company": ""
          });
        }
        else if (data.error === "false" && data.answers.length === 0) {
          response.push({
            "text": "查無結果",
            "source": "system",
            "cypher": "",
            "link": "",
            "company": ""
          });
        }
        else {
          for (let i = 0; i < data.answers.length; i++) {
            response.push({
              "text": data.answers[i].answer,
              "source": "system",
              "cypher": "",
              "link": data.answers[i].link,
              "company": data.answers[i].company
            });
          }
          response.push({
            "text": "",
            "source": "system",
            "cypher": data.cypher,
            "link": "",
            "company": ""
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
      <Grid className="chat-container"
            flexDirection={"column"}
            sx={{
              height: h ? h : "650px",
              width: w ? w : "400px"}}>
        <Grid container justifyContent={"center"}>
          <Typography level='h4'> 🤔💭 </Typography>
          {/* <IconButton aria-label='close'>
            <CloseIcon />
          </IconButton> */}
        </Grid>
        <Grid className="chat-box" ref={chatBoxRef} flexDirection={"column"}>
          {/* Put message here */}
          {/* use index as key, we dont change the order */}
          {messages.map((message, index) => (
            <Message message={message} index={index} key={index} />
          ))}
        </Grid>

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
      </Grid>
    </Grid>
  );
}

export {Chatroom, FabChatroom};
