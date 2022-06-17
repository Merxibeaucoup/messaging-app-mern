
import './App.css';
import Chat from './components/Chat/Chat';
import Sidebar from './components/sidebar/Sidebar';
import React from 'react';
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import axios from './components/axios'

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() =>{
    axios.get("/messages/sync").then(res =>{
      setMessages(res.data)
    });
  },[]);



  useEffect(()=> {
    const pusher = new Pusher('4044c6305bfc1c7d6e3c',{
      cluster:'us2'

    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data)=>{
      setMessages([...messages, data])
    });

    return () =>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])
 

  return (
    <div className="app_body">
      <Sidebar/>
      <Chat messages={messages} />
      
    </div>
  );
}

export default App;
