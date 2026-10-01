import React, { useState, useRef, useEffect } from 'react';
import styles from '../css/SearchInput.module.css';

interface SearchInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  
  // 1. input 엘리먼트를 참조할 ref 생성
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. isLoading이 false가 될 때(응답이 완료되어 disabled가 풀릴 때) 포커스 이동
  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    onSendMessage(input.trim());
    setInput('');

    // 3. 메시지 전송 직후 포커스 (isLoading 변화 전 즉시 포커스 유지)
    inputRef.current?.focus();
  };

  return (
    <form className={styles.inputForm} onSubmit={handleSubmit}>
      <input
        ref={inputRef} // 4. ref 연결
        type="text"
        className={styles.inputField}
        placeholder="Enter text here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" className={styles.submitBtn} disabled={isLoading || !input.trim()}>
        {isLoading ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
};