"use client";

import { useState } from "react";
import { Link, MessageCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function ShareButtons({ lesson }) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/lesson/${lesson._id}`
      : "";

  const shareText = `${lesson.title} — Digital Life Lessons`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const openTwitter = () =>
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "noopener,noreferrer"
    );

  const openFacebook = () =>
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "noopener,noreferrer"
    );

  const openWhatsApp = () =>
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      "_blank",
      "noopener,noreferrer"
    );

  const iconBtn =
    "min-w-0 px-3 h-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all text-xs font-medium flex items-center gap-1.5";

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600 font-bold mr-1 hidden sm:inline">
        Share
      </span>
      <button onClick={copyLink} className={iconBtn} aria-label="Copy link">
        <Link size={14} />
        <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
      </button>
      <button onClick={openTwitter} className={iconBtn} aria-label="Share on X / Twitter">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="hidden sm:inline">X</span>
      </button>
      <button onClick={openFacebook} className={iconBtn} aria-label="Share on Facebook">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <span className="hidden sm:inline">Facebook</span>
      </button>
      <button onClick={openWhatsApp} className={iconBtn} aria-label="Share on WhatsApp">
        <MessageCircle size={14} />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>
    </div>
  );
}
