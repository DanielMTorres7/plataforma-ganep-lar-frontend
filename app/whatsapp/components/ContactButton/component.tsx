import React from 'react';
import './styles.css';

const ContactButton: React.FC = () => {
  let statusIcon = '';
  
  let timestamp = '';

  return (
    <button className='user_btn'>
      <div className='user_btn_img'>
        <span></span>
      </div>
      <div className='user_btn_info'>
        <p>{'Daniel Torres'}</p>
        <div className='user_btn_last_message'>
        <p>{statusIcon} {'Last Message'} </p>   
        </div>
        <span>{timestamp}</span>
      </div>
      <span className='user_btn_pop'>0</span>
    </button>
  );
};

export default ContactButton;