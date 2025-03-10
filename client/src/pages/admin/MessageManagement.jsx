import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { samplemessage, samplechats } from '../../constants/sampleData';

const MessageManagement = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    date: null,
    sender: '',
    chat: '',
    hasAttachment: false,
  });
  
  // Load messages with chat information
  useEffect(() => {
    // In a real application, this would be an API call
    const enhancedMessages = samplemessage.map(message => {
      // Find chat associated with this message
      const chat = samplechats.find(c => c._id === message.chat) || { name: 'Unknown Chat' };
      return { ...message, chatName: chat.name };
    });
    
    setMessages(enhancedMessages);
    setFilteredMessages(enhancedMessages);
  }, []);
  
  // Filter messages based on search term and filter options
  useEffect(() => {
    let filtered = [...messages];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(message => 
        message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.chatName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply additional filters
    if (filterOptions.sender) {
      filtered = filtered.filter(message => 
        message.sender.name.toLowerCase().includes(filterOptions.sender.toLowerCase())
      );
    }
    
    if (filterOptions.chat) {
      filtered = filtered.filter(message => 
        message.chatName.toLowerCase().includes(filterOptions.chat.toLowerCase())
      );
    }
    
    if (filterOptions.date) {
      const filterDate = new Date(filterOptions.date).setHours(0, 0, 0, 0);
      filtered = filtered.filter(message => {
        const messageDate = new Date(message.createdAt).setHours(0, 0, 0, 0);
        return messageDate === filterDate;
      });
    }
    
    if (filterOptions.hasAttachment) {
      filtered = filtered.filter(message => 
        message.attachment && message.attachment.length > 0
      );
    }
    
    setFilteredMessages(filtered);
  }, [searchTerm, filterOptions, messages]);
  
  const handleDeleteMessage = (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const updatedMessages = messages.filter(msg => msg._id !== messageId);
      setMessages(updatedMessages);
      if (selectedMessage && selectedMessage._id === messageId) {
        setSelectedMessage(null);
      }
    }
  };
  
  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };
  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const resetFilters = () => {
    setFilterOptions({
      date: null,
      sender: '',
      chat: '',
      hasAttachment: false,
    });
    setSearchTerm('');
  };
  
  // Get unique senders and chats for filter dropdowns
  const uniqueSenders = [...new Set(messages.map(msg => msg.sender.name))];
  const uniqueChats = [...new Set(messages.map(msg => msg.chatName))];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Message Management</h1>
        </div>
        
        {/* Search and filter section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-4">
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Filter by Date</label>
              <input
                type="date"
                value={filterOptions.date || ''}
                onChange={(e) => setFilterOptions({...filterOptions, date: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Filter by Sender</label>
              <select
                value={filterOptions.sender}
                onChange={(e) => setFilterOptions({...filterOptions, sender: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">All Senders</option>
                {uniqueSenders.map((sender, index) => (
                  <option key={index} value={sender}>{sender}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Filter by Chat</label>
              <select
                value={filterOptions.chat}
                onChange={(e) => setFilterOptions({...filterOptions, chat: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">All Chats</option>
                {uniqueChats.map((chat, index) => (
                  <option key={index} value={chat}>{chat}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasAttachment"
                  checked={filterOptions.hasAttachment}
                  onChange={(e) => setFilterOptions({...filterOptions, hasAttachment: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="hasAttachment">Has Attachment</label>
              </div>
              
              <button
                onClick={resetFilters}
                className="ml-auto px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Message list */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h2 className="font-semibold">Messages ({filteredMessages.length})</h2>
              </div>
              <div className="divide-y max-h-screen overflow-y-auto">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <div
                      key={message._id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer ${
                        selectedMessage?._id === message._id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleSelectMessage(message)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{message.sender.name}</div>
                        <div className="text-sm text-gray-500">{formatDate(message.createdAt)}</div>
                      </div>
                      <div className="mb-2 text-sm text-gray-600">
                        Chat: {message.chatName}
                      </div>
                      <div className="text-gray-800">
                        {message.content}
                      </div>
                      {message.attachment && message.attachment.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.attachment.map((file, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={file.url}
                                alt="Attachment"
                                className="h-16 w-16 object-cover rounded border"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-white">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          ))}
                          <div className="text-xs text-gray-500 flex items-center">
                            {message.attachment.length} attachment(s)
                          </div>
                        </div>
                      )}
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMessage(message._id);
                          }}
                          className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No messages found. Try adjusting your filters.
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Message detail panel */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow h-full">
              {selectedMessage ? (
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-4">Message Details</h2>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">Sender</div>
                    <div className="font-medium">{selectedMessage.sender.name}</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">Chat</div>
                    <div>{selectedMessage.chatName}</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">Date & Time</div>
                    <div>{formatDate(selectedMessage.createdAt)}</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">Message ID</div>
                    <div className="text-sm font-mono bg-gray-100 p-1 rounded">
                      {selectedMessage._id}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">Content</div>
                    <div className="bg-gray-50 p-3 rounded border">
                      {selectedMessage.content}
                    </div>
                  </div>
                  
                  {selectedMessage.attachment && selectedMessage.attachment.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-500 mb-1">
                        Attachments ({selectedMessage.attachment.length})
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedMessage.attachment.map((file, index) => (
                          <a 
                            key={index} 
                            href={file.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <img
                              src={file.url}
                              alt={`Attachment ${index + 1}`}
                              className="w-full h-auto rounded border hover:opacity-90 transition-opacity"
                            />
                            <div className="text-xs mt-1 text-blue-600 truncate">
                              {file.public_id}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500 h-full flex items-center justify-center">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p className="text-lg font-medium mb-1">No Message Selected</p>
                    <p className="text-sm">Select a message to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MessageManagement;