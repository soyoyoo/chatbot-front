import React, { useEffect, useRef } from 'react';
import type { ChatMessage } from '../models/chat';
import styles from '../css/ChatHistory.module.css';

interface ChatHistoryProps {
  messages: ChatMessage[];
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.historyContainer}>
      {messages.map((msg) => {
        const isUser = msg.sender === 'user';
        return (
          <div
            key={msg.id}
            className={`${styles.messageRow} ${isUser ? styles.userRow : styles.botRow}`}
          >
            <div
              className={`${styles.bubble} ${isUser ? styles.userBubble : styles.botBubble}`}
            >
              {msg.text}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};