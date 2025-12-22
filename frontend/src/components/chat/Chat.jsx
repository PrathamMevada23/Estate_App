import { useState } from 'react'
import './chat.scss'

function Chat({chats}) {
  const[chat,setChat] =useState(true)

  console.log(chats);
  
  return (
    <div className='chat'>
      <div className="messages">
        <h1>Messages</h1>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
          <span>Jhon Doe</span>
          <p>
            Hello, how are you?
          </p>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
          <span>Jhon Doe</span>
          <p>
            Hello, how are you?
          </p>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
          <span>Jhon Doe</span>
          <p>
            Hello, how are you?
          </p>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
          <span>Jhon Doe</span>
          <p>
            Hello, how are you?
          </p>
        </div>
      </div>

      {chat &&
      <div className="chatBox">
        <div className="top">
          <div className="user">
            <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
            Jhone Doe
          </div>
          <span className="close" 
            onClick={()=>setChat(null)}>
              x
          </span>
        </div>
        <div className="center">
          <div className="chatMessage">
            <p>hey!! How are you pal</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>hey!! How are you pal</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage">
            <p>hey!! How are you pal</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>hey!! How are you pal</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage">
            <p>hey!! How are you pal</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>hey!! How are you pal</p>
            <span>1 hour ago</span>
          </div>
        </div>
        <div className="bottom">
          <textarea name="" id=""></textarea>
          <button>Send</button>
        </div>
      </div>}
    </div>
  )
}

export default Chat