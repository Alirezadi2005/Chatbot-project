import dayjs from 'dayjs';
import robotProfileImage from '../assets/robot.png';
//import userProfileImage from '../assets/user.png';
import userPersonalProfileImage from '../assets/images.jpg';
import './ChatMessage.css'

export function ChatMessage({message, sender}) {
  const time = dayjs().valueOf();
  const currentTime = dayjs(time).format('h:mma');
  
  return (
    <div className={
      sender === 'user' ? 'chat-message-user' : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img src={robotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {message}
        <div className="message-time">
          {currentTime}
        </div>
      </div>
      {sender === 'user' && (
        <img src={userPersonalProfileImage} className="chat-message-profile" /> 
      )}
    </div>
  );
}