import { useState, useEffect } from 'react';

interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: number;
  read: boolean;
}

interface ChatState {
  isOpen: boolean;
  unreadCount: number;
  messages: Message[];
}

export const useChat = (userId: string) => {
  const [chatState, setChatState] = useState<ChatState>({
    isOpen: false,
    unreadCount: 0,
    messages: []
  });

  // Carrega mensagens do localStorage ao iniciar
  useEffect(() => {
    const savedMessages = localStorage.getItem('chat_messages');
    if (savedMessages) {
      const messages = JSON.parse(savedMessages);
      const unreadCount = messages.filter(
        (msg: Message) => msg.to === userId && !msg.read
      ).length;
      
      setChatState(prev => ({
        ...prev,
        messages,
        unreadCount
      }));
    }
  }, [userId]);

  // Atualiza o contador de mensagens não lidas
  useEffect(() => {
    const unreadCount = chatState.messages.filter(
      msg => msg.to === userId && !msg.read
    ).length;

    setChatState(prev => ({
      ...prev,
      unreadCount
    }));
  }, [chatState.messages, userId]);

  const toggleChat = () => {
    setChatState(prev => ({
      ...prev,
      isOpen: !prev.isOpen
    }));

    // Marca todas as mensagens como lidas quando abre o chat
    if (!chatState.isOpen) {
      const updatedMessages = chatState.messages.map(msg =>
        msg.to === userId ? { ...msg, read: true } : msg
      );

      setChatState(prev => ({
        ...prev,
        messages: updatedMessages,
        unreadCount: 0
      }));

      localStorage.setItem('chat_messages', JSON.stringify(updatedMessages));
    }
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: Date.now(),
      read: false
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

    localStorage.setItem('chat_messages', JSON.stringify([...chatState.messages, newMessage]));
  };

  const markAsRead = (messageId: string) => {
    const updatedMessages = chatState.messages.map(msg =>
      msg.id === messageId ? { ...msg, read: true } : msg
    );

    setChatState(prev => ({
      ...prev,
      messages: updatedMessages
    }));

    localStorage.setItem('chat_messages', JSON.stringify(updatedMessages));
  };

  return {
    isOpen: chatState.isOpen,
    unreadCount: chatState.unreadCount,
    messages: chatState.messages,
    toggleChat,
    addMessage,
    markAsRead
  };
};

export type { Message }; 