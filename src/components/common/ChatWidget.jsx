"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useChatLesson } from "@/lib/chat-context";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const STARTERS = [
  "Help me reflect on this lesson",
  "Summarize this lesson for me",
  "Give me one practical action step",
  "How can I apply this to my life?",
];

export default function ChatWidget() {
  const { lesson } = useChatLesson();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your Digital Life Lessons mentor. Ask me anything about this lesson or life reflections.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, isSending]);

  const sendMessage = async (text) => {
    const content = text.trim();
    if (!content || isSending) return;

    const updated = [...messages, { role: "user", content }];
    setMessages(updated);
    setInput("");
    setIsSending(true);

    try {
      const payload = { messages: updated };
      if (lesson?.title) payload.lesson = { title: lesson.title };

      const res = await fetch(`${SERVER_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let message = "Something went wrong. Please try again.";
        if (res.status === 429) message = "You're sending messages too fast. Please wait a moment.";
        if (res.status === 503) message = "The AI assistant isn't configured yet. Please try again later.";
        setMessages((prev) => [...prev, { role: "assistant", content: message }]);
        return;
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "I couldn't find an answer. Try rephrasing." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Check your connection and try again." },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-[calc(100vw-2rem)] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-emerald-500 text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              <span className="text-sm font-bold tracking-tight">Lesson Mentor</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="hover:bg-emerald-600 rounded-lg p-1 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="h-80 overflow-y-auto px-4 py-4 space-y-3 bg-white dark:bg-zinc-950/60">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-emerald-500 text-white rounded-br-md"
                      : "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-md"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-1.5 pt-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="block text-left w-full text-xs px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {isSending && (
              <div className="flex justify-start">
                <div className="px-3.5 py-2 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-sm rounded-bl-md">
                  <Bot size={16} className="animate-pulse" />
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2 px-3 py-3 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this lesson..."
              disabled={isSending}
              className="flex-1 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-emerald-500 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isSending || !input.trim()}
              aria-label="Send message"
              className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-emerald-500 text-white rounded-xl px-3.5 transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-4 sm:right-6 z-50 h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageCircle size={24} className="-scale-x-100" />
        )}
      </button>
    </>
  );
}