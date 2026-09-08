"use client";

import { createContext, useContext, useState } from "react";

const ChatContext = createContext({
  lesson: null,
  setLesson: () => {},
});

export function ChatProvider({ children }) {
  const [lesson, setLesson] = useState(null);
  return (
    <ChatContext.Provider value={{ lesson, setLesson }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatLesson() {
  return useContext(ChatContext);
}