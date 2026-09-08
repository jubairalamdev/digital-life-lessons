"use client";

import { useEffect } from "react";
import { useChatLesson } from "@/lib/chat-context";

export default function ChatLessonContext({ lesson }) {
  const { setLesson } = useChatLesson();

  useEffect(() => {
    setLesson(lesson || null);
  }, [lesson, setLesson]);

  return null;
}