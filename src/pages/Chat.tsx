import { useEffect, useState } from "react";
import {
  sendToAI,
  getChats,
  getChat,
} from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

import type { Message } from "../types/chat";

type ChatHistory = {
  _id: string;
  title: string;
  updatedAt: string;
};

function Chat() {
  const [collapsed, setCollapsed] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(false);

  const [chatId, setChatId] = useState<string | null>(null);

  const [chats, setChats] = useState<ChatHistory[]>([]);

  // Load chat list
  const loadChats = async () => {
    try {
      const data = await getChats();
      setChats(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  const newChat = () => {
    setMessages([]);
    setChatId(null);
  };

  const openChat = async (id: string) => {
    try {
      const chat = await getChat(id);

      setChatId(chat._id);

      const converted: Message[] = chat.messages.map((msg: any) => ({
        role: msg.role === "assistant" ? "ai" : "user",
        text: msg.content,
      }));

      setMessages(converted);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const data = await sendToAI(text, chatId);

      if (!chatId && data.chatId) {
        setChatId(data.chatId);
      }

      const aiMessage: Message = {
        role: "ai",
        text: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);

      await loadChats();
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            error?.message ||
            "❌ AI Error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <Sidebar
  collapsed={collapsed}
  setCollapsed={setCollapsed}
  newChat={newChat}
  chats={chats}
  openChat={openChat}
  activeChatId={chatId}
/>

      <div className="main-content">
        <Navbar />

        <ChatWindow
          messages={messages}
          loading={loading}
        />

        <ChatInput
          onSend={sendMessage}
        />
      </div>
    </div>
  );
}

export default Chat;