import React, { useState, useEffect, useRef } from "react";
import { X, Send, ChevronLeft, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: number;
  read: boolean;
}

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  online: boolean;
}

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    id: string;
    name: string;
    role: string;
  };
}

const Chat: React.FC<ChatProps> = ({ isOpen, onClose, currentUser }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const allContacts: Contact[] = [
    { id: "1", name: "Dr. Silva", role: "Médico", online: true },
    { id: "2", name: "Enfermeira Ana", role: "Enfermeiro", online: true },
    { id: "3", name: "João Santos", role: "Paciente", online: true },
    { id: "4", name: "Maria Lima", role: "Paciente", online: false },
    { id: "5", name: "Carlos Manutenção", role: "Manutenção", online: true },
    { id: "6", name: "Dr. Santos", role: "Médico", online: true },
    { id: "7", name: "Enfermeiro Carlos", role: "Enfermeiro", online: false },
    { id: "8", name: "Pedro Silva", role: "Manutenção", online: true },
    { id: "9", name: "Ana Limpeza", role: "Limpeza", online: true },
  ];

  const filterContactsByRole = (contacts: Contact[], userRole: string) => {
    switch (userRole.toLowerCase()) {
      case "limpeza":
        return contacts.filter(
          (contact) =>
            contact.role === "Limpeza" ||
            contact.role === "Manutenção" ||
            contact.role === "Enfermeiro"
        );
      case "manutenção":
        return contacts.filter(
          (contact) =>
            contact.role === "Limpeza" ||
            contact.role === "Manutenção" ||
            contact.role === "Enfermeiro"
        );
      default:
        return contacts;
    }
  };

  const contacts = filterContactsByRole(allContacts, currentUser.role).filter(
    (contact) => contact.id !== currentUser.id
  );

  useEffect(() => {
    const savedMessages = localStorage.getItem("chat_messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: Date.now().toString(),
      from: currentUser.id,
      to: selectedContact.id,
      content: newMessage,
      timestamp: Date.now(),
      read: false,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getContactMessages = () => {
    if (!selectedContact) return [];
    return messages.filter(
      (msg) =>
        (msg.from === currentUser.id && msg.to === selectedContact.id) ||
        (msg.from === selectedContact.id && msg.to === currentUser.id)
    );
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "médico":
        return "text-blue-600";
      case "enfermeiro":
        return "text-green-600";
      case "paciente":
        return "text-purple-600";
      case "manutenção":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      className={cn(
        "fixed right-4 bottom-4 w-[380px] bg-white rounded-lg shadow-xl z-50",
        "transform transition-all duration-300 ease-in-out",
        isOpen
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none",
        "flex flex-col h-[600px]"
      )}
    >
      <div className="p-4 border-b flex items-center justify-between bg-blue-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          {selectedContact && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedContact(null)}
              className="mr-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <h2 className="font-semibold">
            {selectedContact ? selectedContact.name : "Chat HospitAll"}
          </h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {!selectedContact ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome ou função..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                {contact.avatar ? (
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{contact.name}</h3>
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full",
                        contact.online ? "bg-green-500" : "bg-gray-300"
                      )}
                    />
                  </div>
                  <p className={cn("text-sm", getRoleColor(contact.role))}>
                    {contact.role}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {getContactMessages().map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col max-w-[80%] space-y-1",
                    message.from === currentUser.id
                      ? "ml-auto items-end"
                      : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2",
                      message.from === currentUser.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    )}
                  >
                    {message.content}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <Input
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
