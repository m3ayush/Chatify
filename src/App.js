import React, { useEffect, useState } from 'react';
import {  FormControl, Input } from '@mui/material';
import './App.css';
import Message from './Message';
import db from './firebase';
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import Flipmove from "react-flip-move";
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';

function App() {
  const [input,setInput]=useState('')
  const [messages,setMessages]=useState([]);
  //whenever we need to store something use usestate
  const [username,setUsername]=useState('');

  useEffect(()=>{
    /*for old firebase versions
      db.collection('messages').onSnapshot(snapshot =>{
      setMessages(snapshot.docs.map(doc=> doc.data()))
    })*/

    const messagesCollection = collection(db, 'messages');
  
    const messagesQuery = query(messagesCollection, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({id:doc.id, message:doc.data()})));
    });
    // Cleanup the listener when the component unmounts
    return () => unsubscribe();

  },[])

  useEffect(()=>{
    //Instead of const username= prompt('Please enter your name') we are passing like this (in a function way)
    setUsername(prompt('Enter your username'));


  },[] /*dependency(condition)*/)


  const sendMessage = async (event) => {
    event.preventDefault();
  
    await addDoc(collection(db, 'messages'), {
      message: input,
      username: username,
      timestamp: serverTimestamp()
    });
  
    setInput('');
  };  


  /*  for old firebase versions

  const sendMessage=(event)=>{
    event.preventDefault();

    db.collection('messages').add({
      message:input,
      username:username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }
  */

  /* this was only for local adding of data
  const sendMessage=(event)=>{
    event.preventDefault();

    setMessages([
    ...messages, {username: username, text: input}]);
    setInput('');
  }
  */


  return (
    <div className="App">
      <h1 className='header'>Hello {username} 🚀👋</h1>
      <h3 className='header'>Welcome to Chatify🔥🔥</h3>
      
      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input className='app__input' placeholder='Enter the message.'
          inputProps={{ //for mui
            style: {
              color: '#f6d4b1', // Color of the text
              '::placeholder': {
                color: '#f6d4b1', // Color of the placeholder
                opacity: 1,    // Make sure placeholder is fully visible
                
              },
            },
          }}
          sx={{ //for mui
            '&:before': {
              borderBottom: '2px solid #424140', // Change the color before focus
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottom: '2px solid #585654', // Change the color when hovering
            },
            '&:after': {
              borderBottom: '2px solid #f6d4b1', // Change the color after focus
            },
          }}
          value={input} onChange={event => setInput(event.target.value)}/>

          <IconButton className='app__icon' disabled={!input} variant="contained" type='submit' onClick={sendMessage}
          sx={{
            color: input ? '#f6d4b1' : 'cbb29b', // Blue when enabled, grey when disabled
          }}
          >
            <SendIcon/>
          </IconButton>
 
        </FormControl>
      </form>
      <div className="message__container">   
        <Flipmove>
          {
            messages.map(({id, message})=>( 
              /*map- It is kind of loop, but insted we use this as it can return value.*/

              //<Message username={message.username} text={message.text}/>
              <Message key={id} username={username} message={message}/>
            ))
          }
        </Flipmove>
      </div>
    </div>
  );
}

export default App;
