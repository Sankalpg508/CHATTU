import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { samplechats, samplemessage } from '../../constants/sampleData';

const ChatManagement = () => {
  // Combine sample data to create a more complete chat list
  const [chats, setChats] = useState(
    samplechats.map((chat, index) => {
      // Use sample messages or generate placeholder last message
      const lastMessage = index < 2 
        ? samplemessage[index % samplemessage.length].content 
        : "No recent messages";
      
      // Randomly assign status for demonstration
      const statuses = ['active', 'pending', 'closed'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      // Create date (recent dates for demo)
      const today = new Date();
      const randomDaysAgo = Math.floor(Math.random() * 5);
      const chatDate = new Date(today);
      chatDate.setDate(today.getDate() - randomDaysAgo);
      
      return {
        id: chat._id,
        user: chat.name,
        avatar: chat.avatar[0],
        lastMessage,
        status: randomStatus,
        date: chatDate.toISOString().split('T')[0],
        groupChat: chat.groupChat,
        members: chat.members
      };
    })
  );
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleStatusChange = (id, newStatus) => {
    setChats(chats.map(chat => 
      chat.id === id ? { ...chat, status: newStatus } : chat
    ));
  };
  
  // Filter by status and search term
  const filteredChats = chats
    .filter(chat => filter === 'all' || chat.status === filter)
    .filter(chat => chat.user.toLowerCase().includes(searchTerm.toLowerCase()));
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Chat Management</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              className="px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex space-x-2 mb-6">
          <button 
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${filter === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${filter === 'closed' ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('closed')}
          >
            Closed
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredChats.map(chat => (
                <tr key={chat.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={chat.avatar} 
                          alt={chat.user} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{chat.user}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 truncate max-w-xs">{chat.lastMessage}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {chat.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {chat.groupChat ? 'Group' : 'Personal'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${chat.status === 'active' ? 'bg-green-100 text-green-800' : 
                        chat.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {chat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => console.log('View chat', chat.id)}
                    >
                      View
                    </button>
                    <select 
                      className="text-sm border rounded p-1"
                      value={chat.status}
                      onChange={(e) => handleStatusChange(chat.id, e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredChats.length === 0 && (
            <div className="py-10 text-center text-gray-500">
              No chats found with the selected filter.
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredChats.length}</span> of <span className="font-medium">{chats.length}</span> chats
          </div>
          <div className="flex space-x-2">
            <button 
              className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50"
              onClick={() => console.log('Export chats')}
            >
              Export
            </button>
            <button 
              className="px-4 py-2 border rounded-md bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete selected chats?')) {
                  console.log('Delete selected chats');
                }
              }}
            >
              Delete Selected
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ChatManagement;