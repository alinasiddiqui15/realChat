import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { onlineUsers } = useSocket();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users'); // Assuming you have a route to get users
        // Filter out the current user safely unwrapping nested users array if present
        const usersList = response.data?.data?.users || response.data?.users || response.data;
        if (Array.isArray(usersList)) {
          setUsers(usersList.filter(u => u._id !== currentUser._id));
        } else {
          console.error('Expected an array of users, got:', usersList);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  if (loading) {
    return <div className="w-64 md:w-80 border-r border-light-600 dark:border-dark-600 bg-light-800 dark:bg-dark-800 h-full flex"><Loader /></div>;
  }

  return (
    <aside className="w-full h-full flex flex-col transition-all duration-300 bg-light-800 dark:bg-dark-800">
      <div className="px-6 py-5 border-b border-light-600 dark:border-dark-600">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="w-full bg-light-900 dark:bg-dark-900 border-none rounded-full pl-11 pr-4 py-3 focus:outline-none transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 font-medium text-sm"
          />
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>
      
      <div className="px-6 pt-5 pb-2 flex justify-between items-center">
        <h2 className="text-gray-800 dark:text-gray-200 font-bold text-base">All Chats</h2>
        <span className="bg-primary-500 text-gray-800 dark:text-gray-100 text-[10px] font-extrabold px-2 py-0.5 rounded-full">{users.length}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
        {users.length === 0 ? (
          <div className="p-4 text-gray-500 text-center text-sm mt-10">No conversations yet</div>
        ) : (
          users.map((user) => {
            const isOnline = onlineUsers.includes(user._id);
            const isSelected = selectedUser?._id === user._id;
            
            return (
              <div 
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`p-3 mx-2 mb-1 flex items-center gap-3 cursor-pointer transition-all rounded-xl ${
                  isSelected 
                    ? 'bg-nexus-gradient text-white shadow-lg shadow-primary-500/20' 
                    : 'hover:bg-gray-100 dark:hover:bg-dark-700/50 text-gray-800 dark:text-gray-200'
                }`}
              >
                <div className="relative shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-primary-100 dark:bg-dark-700 text-primary-600 dark:text-primary-400'
                  }`}>
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  {isOnline && (
                    <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 rounded-full ${
                      isSelected ? 'border-primary-600' : 'border-white dark:border-dark-800'
                    }`}></span>
                  )}
                </div>
                
                <div className="flex flex-col overflow-hidden w-full">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold truncate">{user.username}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>10:30 AM</span>
                  </div>
                  <span className={`text-xs truncate ${isSelected ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>
                    Click to view conversation...
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
