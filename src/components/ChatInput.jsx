import {  useState } from 'react'
import { Chatbot } from 'supersimpledev'
import loadingSpinnerImage from '../assets/loading-spinner.gif';
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function saveInputTextKeyDown(event) {
    if (event.key === 'Enter') {sendMessage();} else if (event.key === 'Escape') {setInputText('');}
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }

    setIsLoading(true);
    setInputText('');
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];
    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loading-image" src={loadingSpinnerImage} />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setIsLoading(false);
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input 
        className="chat-input"
        placeholder="send a message to chatbot" 
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={saveInputTextKeyDown}
      />
      <button className="send-button" onClick={sendMessage}>Send</button>

      <button className="clear-button" onClick={clearMessages}>Clear</button>
    </div>
  );
}