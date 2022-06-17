import React from 'react'
import { useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import './Chat.css'
import axios from '../axios'


const Chat = ({ messages }) => {
    const [input, setInput] = useState("");
  
    const sendMessage = async (e) => {
      e.preventDefault();
      await axios.post("/messages/new", {
        message: input,
        name: "eddie",
        timestamp: new Date().toUTCString(),
        received: true,
      });
  
      setInput("");
    };
   
  return (
    <div className='chat'>


    <div className='chat_header'>
       <Avatar/>
       <div className='chat_headerInfo'>
        <h3>Room Name</h3>
        <p> Last seen at....</p>
       </div>
       <div className='chat_headerRight'>
        <IconButton>
            <SearchOutlined/>
        </IconButton>
        <IconButton>
            <AttachFile/>
        </IconButton>
        <IconButton>
            <MoreVert/>
        </IconButton>
       </div>
    </div>





    <div className='chat_body'>
        {messages.map((message, i) =>(
        <p key ={i} className={`chat_message ${message.received && 'chat_receiver'}`}>
            <span className='chat_name'>{message.name}</span>
           {message.message}
            <span className='chat_timestamp'>
                {message.timestamp}
            </span>
        </p>

        ))}     
    </div>




    
    <div className='chat_footer'>
        <InsertEmoticon/>
        <form>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic/>

    </div>
    </div>
  )
}

export default Chat