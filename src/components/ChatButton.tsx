import React from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatButtonProps {
  unreadCount?: number;
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ unreadCount = 0, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
    >
      <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

export default ChatButton; 