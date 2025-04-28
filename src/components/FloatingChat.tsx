
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Chat from './Chat';
import { useChat } from '@/hooks/useChat';

interface FloatingChatProps {
  currentUser: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
}

const FloatingChat: React.FC<FloatingChatProps> = ({ currentUser }) => {
  const { isOpen, unreadCount, toggleChat } = useChat(currentUser.id);

  return (
    <>
      <button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "flex items-center justify-center",
          "w-14 h-14 rounded-full bg-blue-500 shadow-lg",
          "hover:bg-blue-600 transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        )}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>

      <Chat
        isOpen={isOpen}
        onClose={toggleChat}
        currentUser={currentUser}
      />
    </>
  );
};

export default FloatingChat;
