import React, { useState } from 'react';
import LeftNav from '../components/LeftNav';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-light-900 dark:bg-dark-900 transition-colors relative">
      
      {/* 1. Far Left Navigation */}
      <LeftNav />

      {/* 2. Chat List Sidebar */}
      <div className={`${selectedUser ? 'hidden md:flex' : 'flex'} w-full md:w-[350px] shrink-0 z-10 bg-light-800 dark:bg-dark-800 border-r border-light-600 dark:border-dark-600 overflow-hidden`}>
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>

      {/* 3. Main Chat Area */}
      <div className={`${!selectedUser ? 'hidden md:flex' : 'flex'} flex-1 z-10 bg-light-900 dark:bg-dark-900 overflow-hidden`}>
        <ChatBox selectedUser={selectedUser} onBack={() => setSelectedUser(null)} />
      </div>
    </div>
  );
};

export default Chat;
