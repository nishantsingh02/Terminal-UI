import DocsLayout from "../components/DocsLayout";
import { useState, useEffect, useRef } from "react";
import { Loader2, Check } from "lucide-react";

function AgentDemo() {
  const [messages, setMessages] = useState<{ role: string; text: string; done: boolean }[]>([]);
  const [inputVal, setInputVal] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const demoResponses: Record<string, string> = {
    default: "I can help you with that! Let me analyze your request and provide a detailed response. Here's what I found...",
    help: "Available commands:\n  /help   - Show this message\n  /status - Check agent status\n  /about  - About the creator\n  /clear  - Clear conversation\n\nYou can also type any question and I'll respond.",
    status: "Agent Status: Active\nModel: claude-3.5-sonnet\nTokens used: 2,450 / 100,000\nLatency: 120ms avg\nUptime: 99.9%",
    about: "╔══════════════════════════════════════╗\n║         About the Creator            ║\n╠══════════════════════════════════════╣\n║                                      ║\n║  Name:    Nishant Singh              ║\n║  Role:    Full-Stack Developer       ║\n║  GitHub:  github.com/nishantsingh02  ║\n║  X:       x.com/nishantsingh211      ║\n║                                      ║\n║  Building termui — beautiful         ║\n║  terminal UI components for          ║\n║  AI agents. Open source under MIT.   ║\n║                                      ║\n╚══════════════════════════════════════╝",
    clear: "",
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const cmd = inputVal.trim().toLowerCase().replace("/", "");
    if (cmd === "clear") {
      setMessages([]);
      setInputVal("");
      return;
    }

    const userMsg = { role: "user", text: inputVal, done: true };
    const response = demoResponses[cmd] || demoResponses.default;
    const aiMsg = { role: "assistant", text: "", done: false };
    setMessages((m) => [...m, userMsg, aiMsg]);
    setInputVal("");

    // Simulate streaming
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMessages((m) =>
        m.map((msg, idx) =>
          idx === m.length - 1 ? { ...msg, text: response.slice(0, i), done: i >= response.length } : msg
        )
      );
      if (i >= response.length) clearInterval(interval);
    }, 20);
  };

  return (
    <div className="terminal-card rounded-md overflow-hidden h-[500px] flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-terminal-red opacity-80" />
        <div className="w-3 h-3 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-3 h-3 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">termui-agent — demo</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
        <div className="text-muted-foreground">
          <div className="text-primary font-bold mb-1">🤖 TermUI Agent Demo</div>
          <div>Type a message or try <span className="text-terminal-cyan">/help</span>, <span className="text-terminal-cyan">/status</span>, <span className="text-terminal-cyan">/about</span>, or <span className="text-terminal-cyan">/clear</span></div>
        </div>

        {messages.map((msg, i) => (
          <div key={i} className="flex gap-3">
            <span className={`font-bold text-xs mt-0.5 flex-shrink-0 ${msg.role === "user" ? "text-terminal-cyan" : "text-terminal-magenta"}`}>
              {msg.role === "user" ? "YOU" : "AI"}
            </span>
            <div className="min-w-0">
              <div className="whitespace-pre-wrap">{msg.text}</div>
              {msg.role === "assistant" && !msg.done && <span className="typing-cursor" />}
              {msg.role === "assistant" && msg.done && (
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Check className="h-3 w-3 text-primary" /> {msg.text.length} chars
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-border px-4 py-3 flex items-center gap-2">
        <span className="text-primary">❯</span>
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
        />
      </form>
    </div>
  );
}

export default function ExamplesPage() {
  return (
    <DocsLayout>
      <div className="max-w-4xl space-y-10">
        <section>
          <h1 className="text-3xl font-display font-bold mb-2">Examples</h1>
          <p className="text-muted-foreground mb-8">
            Interactive demos showing TermUI components in action.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">AI Agent Chat</h2>
          <p className="text-sm text-muted-foreground mb-4">
            A complete chat interface with streaming responses. Try typing a message below.
          </p>
          <AgentDemo />
        </section>
      </div>
    </DocsLayout>
  );
}
