"use client";

import { useState, useRef, useEffect } from "react";
import { INITIAL_PROMPTS } from "@/lib/portfolio-context";
import type { AgentResponse } from "@/app/api/portfolio-agent/route";

type Message = {
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
};

export default function PortfolioAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const hasStarted = messages.length > 0 || loading;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, loading]);

  const ask = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setLoading(true);

    try {
      const res = await fetch("/api/portfolio-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = await res.json();
      if (!res.ok || !data.answer) {
        throw new Error(data.error ?? "Empty response");
      }
      const typed = data as AgentResponse;
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: typed.answer,
          suggestions: typed.suggestions ?? [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again.", suggestions: [] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  const lastSuggestions =
    messages.length > 0
      ? messages[messages.length - 1].suggestions ?? []
      : INITIAL_PROMPTS;

  return (
    <section
      className="bg-[#f6ece1] px-8 py-20 md:px-16"
      style={{
        minHeight: hasStarted ? "712px" : undefined,
        transition: "min-height 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="max-w-2xl mx-auto w-full"
        style={{
          flex: hasStarted ? "1" : undefined,
          display: "flex",
          flexDirection: "column",
        }}
      >

        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <p className="text-xs font-bold tracking-widest uppercase text-[#fe6500]">
            Explore My Work
          </p>
          {hasStarted && (
            <button
              onClick={() => { setMessages([]); setInput(""); }}
              aria-label="Close chat"
              className="text-2xl font-medium text-black/40 hover:text-black transition-colors leading-none"
            >
              ✕
            </button>
          )}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-6">
          Explore My Work With an <span className="text-[#fe6500]">AI Agent</span>
        </h2>
        <p className="text-sm text-black/80 mb-8">
          Ask questions about my projects, design approach, or experience.<br />
          This AI assistant is trained on my work and can help you explore my portfolio.
        </p>

        {/* Chat area — expands when conversation starts */}
        <div
          className="relative"
          style={{
            height: hasStarted ? "380px" : "0px",
            transition: "height 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            overflow: "hidden",
          }}
        >
          {/* Gradient: fades top edge as messages scroll up */}
          {hasStarted && (
            <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-[#f6ece1] to-transparent z-10 pointer-events-none" />
          )}

          {/* Scroll container — absolutely fills the chat area */}
          <div
            ref={scrollContainerRef}
            style={{
              position: "absolute",
              inset: 0,
              overflowY: hasStarted ? "auto" : "hidden",
              display: "flex",
              flexDirection: "column",
              scrollbarWidth: "none",
            }}
            className="[&::-webkit-scrollbar]:hidden"
          >
            {/* mt-auto pushes messages to bottom; new ones push old ones up */}
            <div className="flex flex-col gap-4 mt-auto pt-14 pb-4 pr-1">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "user" ? (
                    <div className="max-w-[85%] px-4 py-3 text-sm leading-6 rounded-2xl bg-black text-white rounded-br-sm">
                      {msg.content}
                    </div>
                  ) : (
                    <p className="text-sm leading-7 font-bold text-black/80 max-w-[90%]">
                      {msg.content}
                    </p>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
                    <span className="w-2 h-2 bg-black/30 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-black/30 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-black/30 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-3 -ml-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my work in AI, search, or monetization…"
            disabled={loading}
            className="flex-1 rounded-full bg-white/80 border border-black/10 px-5 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#fe6500] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-[#fe6500] hover:bg-[#e05a00] disabled:opacity-40 transition-colors text-white font-medium px-6 py-3 rounded-full text-sm"
          >
            Ask
          </button>
        </form>

        {!loading && lastSuggestions.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-8 -ml-4">
            {lastSuggestions.map((prompt) => (
              <button
                key={prompt}
                onClick={() => ask(prompt)}
                className="text-xs font-medium px-4 py-2 rounded-full border border-black/20 text-black/70 hover:border-[#fe6500] hover:text-[#fe6500] transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
