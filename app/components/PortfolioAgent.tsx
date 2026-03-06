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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
      const data: AgentResponse = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
          suggestions: data.suggestions ?? [],
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
    <section className="bg-[#f6ece1] px-8 py-20 md:px-16">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <p className="text-xs font-bold tracking-widest uppercase text-[#fe6500] mb-3">
          Explore My Work
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-2">
          Explore My Work With an <span className="text-[#fe6500]">AI Agent</span>
        </h2>
        <p className="text-sm text-black/50 mb-8">
          Ask questions about my projects, design approach, or experience.<br />
          This AI assistant is trained on my work and can help you explore my portfolio.
        </p>

        {/* Chat window — only visible after first message */}
        {messages.length > 0 && (
          <div className="mb-6 flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-1">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-sm leading-6 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-black text-white rounded-br-sm"
                      : "bg-white text-black shadow-sm rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
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
        )}

        {/* Suggested prompts */}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my work in AI, search, or monetization…"
            disabled={loading}
            className="flex-1 rounded-full bg-white border border-black/10 px-5 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#fe6500] disabled:opacity-50"
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
          <div className="flex flex-wrap gap-2 mt-4">
            {lastSuggestions.map((prompt) => (
              <button
                key={prompt}
                onClick={() => ask(prompt)}
                className="text-xs font-medium px-4 py-2 rounded-full border border-black/20 text-black/70 hover:border-[#fe6500] hover:text-[#fe6500] transition-colors bg-white/60"
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
