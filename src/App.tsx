import { useState } from 'react';
import type { ChatMessage } from './models/chat';
import { ChatHistory } from './components/ChatHistory';
import { SearchInput } from './components/SearchInput';
import { fetchChatResponse } from './logic/openai';
import './App.css';

const INITIAL_TIME = new Date().toISOString();

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
 

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const botResponseText = await fetchChatResponse(text, INITIAL_TIME);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `오류: ${(error as Error).message}`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="appContainer">
      <h1 className="headerTitle">Your Own Chatbot</h1>
      <ChatHistory messages={messages} />
      <SearchInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}