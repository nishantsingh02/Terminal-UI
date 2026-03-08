import { useState, useEffect } from "react";
import DocsLayout from "../../components/DocsLayout";
import CodePreview from "../../components/CodePreview";
import { Loader2, Check, X, AlertCircle, Wrench, Play, CheckCircle2, Clock, ChevronRight, Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";

/* ===== AI AGENT COMPONENT PREVIEWS ===== */

function AgentChatPreview() {
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">claude-agent</span>
        <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Connected
        </span>
      </div>
      <div className="p-4 space-y-4 text-sm max-h-64 overflow-y-auto">
        {/* User message */}
        <div className="flex gap-3">
          <span className="text-terminal-cyan font-bold text-xs mt-0.5 w-8 flex-shrink-0">YOU</span>
          <div className="bg-secondary/50 rounded-md px-3 py-2 max-w-[85%]">Build me a todo app with React</div>
        </div>
        {/* Agent thinking */}
        <div className="flex gap-3">
          <span className="text-terminal-magenta font-bold text-xs mt-0.5 w-8 flex-shrink-0">AI</span>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> Thinking for 1.2s
            </div>
            <div>I'll create a todo app with the following structure:</div>
          </div>
        </div>
        {/* Tool call */}
        <div className="ml-11 border border-terminal-amber/30 bg-terminal-amber/5 rounded-md overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-terminal-amber/20 text-xs">
            <Wrench className="h-3 w-3 text-terminal-amber" />
            <span className="text-terminal-amber font-medium">write_file</span>
            <span className="text-muted-foreground ml-auto">src/App.tsx</span>
          </div>
          <pre className="p-3 text-xs text-muted-foreground overflow-x-auto">
{`export default function App() {
  const [todos, setTodos] = useState([]);
  return <TodoList items={todos} />;
}`}
          </pre>
        </div>
        {/* Tool result */}
        <div className="ml-11 flex items-center gap-2 text-xs">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
          <span className="text-primary">File written successfully</span>
          <span className="text-muted-foreground">— src/App.tsx (24 lines)</span>
        </div>
        {/* Agent follow-up */}
        <div className="flex gap-3">
          <span className="text-terminal-magenta font-bold text-xs mt-0.5 w-8 flex-shrink-0">AI</span>
          <div className="space-y-2 flex-1">
            <div>I've created the basic todo app. Want me to add persistence?</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>245 tokens</span>
              <span>·</span>
              <span>3 tool calls</span>
              <span>·</span>
              <span>2.1s</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-4 py-2.5 flex items-center gap-2">
        <span className="text-primary text-sm">❯</span>
        <span className="text-sm text-muted-foreground">Type a message...</span>
      </div>
    </div>
  );
}

function ChatBubblePreview() {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <span className="text-terminal-cyan font-bold text-xs mt-0.5 w-8">USER</span>
        <div className="bg-secondary/50 rounded-md px-3 py-2 text-sm max-w-[80%]">
          How do I deploy this?
        </div>
      </div>
      <div className="flex gap-3">
        <span className="text-terminal-magenta font-bold text-xs mt-0.5 w-8">AI</span>
        <div className="border border-border rounded-md px-3 py-2 text-sm max-w-[80%] space-y-1">
          <div>You can deploy using the CLI:</div>
          <code className="block bg-muted rounded-sm px-2 py-1 text-xs text-terminal-cyan">npm run deploy</code>
        </div>
      </div>
    </div>
  );
}

function StreamingTextPreview() {
  const text = "Let me analyze the codebase and suggest improvements for the authentication module...";
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) { setDone(true); clearInterval(interval); }
    }, 30);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {!done ? <Loader2 className="h-3 w-3 animate-spin text-primary" /> : <Check className="h-3 w-3 text-primary" />}
        <span>{done ? "Complete" : "Streaming..."}</span>
      </div>
      <div className="text-sm">{displayed}{!done && <span className="typing-cursor" />}</div>
    </div>
  );
}

function ThinkingPreview() {
  const [frame, setFrame] = useState(0);
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  useEffect(() => {
    const i = setInterval(() => setFrame((f) => (f + 1) % frames.length), 80);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-terminal-magenta">{frames[frame]}</span>
        <span className="text-muted-foreground">Thinking...</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-terminal-magenta">{frames[frame]}</span>
        <span className="text-muted-foreground">Analyzing 12 files...</span>
        <span className="text-xs text-terminal-dim">(3.2s)</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-primary">✓</span>
        <span className="text-muted-foreground">Planning complete</span>
        <span className="text-xs text-terminal-dim">(1.8s)</span>
      </div>
    </div>
  );
}

function ToolCallPreview() {
  return (
    <div className="space-y-3">
      {/* Running */}
      <div className="border border-terminal-amber/30 bg-terminal-amber/5 rounded-md overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-terminal-amber/20 text-xs">
          <Wrench className="h-3 w-3 text-terminal-amber" />
          <span className="text-terminal-amber font-medium">read_file</span>
          <Loader2 className="h-3 w-3 animate-spin text-terminal-amber ml-auto" />
        </div>
        <div className="px-3 py-2 text-xs text-muted-foreground">
          Reading <span className="text-terminal-cyan">src/auth/login.ts</span>
        </div>
      </div>
      {/* Success */}
      <div className="border border-primary/30 bg-primary/5 rounded-md overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-primary/20 text-xs">
          <Wrench className="h-3 w-3 text-primary" />
          <span className="text-primary font-medium">write_file</span>
          <Check className="h-3 w-3 text-primary ml-auto" />
        </div>
        <div className="px-3 py-2 text-xs text-muted-foreground">
          Wrote 45 lines to <span className="text-terminal-cyan">src/components/Button.tsx</span>
        </div>
      </div>
      {/* Failed */}
      <div className="border border-terminal-red/30 bg-terminal-red/5 rounded-md overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-terminal-red/20 text-xs">
          <Wrench className="h-3 w-3 text-terminal-red" />
          <span className="text-terminal-red font-medium">run_command</span>
          <X className="h-3 w-3 text-terminal-red ml-auto" />
        </div>
        <div className="px-3 py-2 text-xs text-terminal-red">
          Error: Permission denied — /etc/hosts
        </div>
      </div>
    </div>
  );
}

function ToolResultPreview() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs">
        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
        <span className="text-primary font-medium">Success</span>
        <span className="text-muted-foreground">— Created 3 files, modified 1</span>
      </div>
      <div className="border border-border rounded-md p-3 text-xs space-y-1">
        <div className="flex items-center gap-2 text-primary">
          <span>+</span> <span>src/components/Auth.tsx</span> <span className="text-muted-foreground">(new)</span>
        </div>
        <div className="flex items-center gap-2 text-primary">
          <span>+</span> <span>src/hooks/useAuth.ts</span> <span className="text-muted-foreground">(new)</span>
        </div>
        <div className="flex items-center gap-2 text-terminal-amber">
          <span>~</span> <span>src/App.tsx</span> <span className="text-muted-foreground">(modified)</span>
        </div>
      </div>
    </div>
  );
}

function AgentStatusPreview() {
  return (
    <div className="flex items-center gap-4 text-xs">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-foreground">Active</span>
      </div>
      <span className="text-muted-foreground">claude-3.5-sonnet</span>
      <span className="text-muted-foreground">·</span>
      <span className="text-muted-foreground">12,450 tokens</span>
      <span className="text-muted-foreground">·</span>
      <span className="text-muted-foreground">120ms avg</span>
    </div>
  );
}

function TimelinePreview() {
  const steps = [
    { icon: <Play className="h-3 w-3" />, label: "Request received", time: "0ms", color: "text-primary" },
    { icon: <Clock className="h-3 w-3" />, label: "Thinking...", time: "1.2s", color: "text-terminal-amber" },
    { icon: <Wrench className="h-3 w-3" />, label: "Tool: read_file", time: "0.3s", color: "text-terminal-cyan" },
    { icon: <Wrench className="h-3 w-3" />, label: "Tool: write_file", time: "0.1s", color: "text-terminal-cyan" },
    { icon: <Check className="h-3 w-3" />, label: "Response complete", time: "2.1s", color: "text-primary" },
  ];
  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className={`${step.color} p-1`}>{step.icon}</div>
            {i < steps.length - 1 && <div className="w-px h-4 bg-border" />}
          </div>
          <div className="flex items-center gap-2 text-sm pb-2">
            <span>{step.label}</span>
            <span className="text-xs text-muted-foreground">{step.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ThreadPreview() {
  return (
    <div className="border border-border rounded-md overflow-hidden text-sm">
      <div className="px-3 py-2 border-b border-border bg-secondary/30 flex items-center justify-between">
        <span className="font-medium">Conversation #12</span>
        <span className="text-xs text-muted-foreground">5 messages · 1,240 tokens</span>
      </div>
      <div className="divide-y divide-border/50">
        {[
          { role: "user", text: "Add dark mode to the app", time: "2m ago" },
          { role: "assistant", text: "I'll add a theme toggle with...", time: "2m ago" },
          { role: "user", text: "Use system preference by default", time: "1m ago" },
        ].map((m, i) => (
          <div key={i} className="px-3 py-2 flex items-start gap-2">
            <span className={`text-xs font-bold mt-0.5 ${m.role === "user" ? "text-terminal-cyan" : "text-terminal-magenta"}`}>
              {m.role === "user" ? "U" : "A"}
            </span>
            <div className="flex-1 min-w-0">
              <div className="truncate">{m.text}</div>
            </div>
            <span className="text-[10px] text-muted-foreground flex-shrink-0">{m.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessageActionsPreview() {
  return (
    <div className="flex items-center gap-1 text-xs">
      <button className="p-1.5 rounded-sm hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
        <Copy className="h-3.5 w-3.5" />
      </button>
      <button className="p-1.5 rounded-sm hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
        <ThumbsUp className="h-3.5 w-3.5" />
      </button>
      <button className="p-1.5 rounded-sm hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
        <ThumbsDown className="h-3.5 w-3.5" />
      </button>
      <button className="p-1.5 rounded-sm hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
        <RotateCcw className="h-3.5 w-3.5" />
      </button>
      <span className="text-muted-foreground ml-2">Copy · Rate · Retry</span>
    </div>
  );
}

/* ===== CODE STRINGS ===== */
const codes: Record<string, string> = {
  agentchat: `import { AgentChat, UserMessage, AgentMessage, ToolCall, ToolResult } from 'termui';

<AgentChat
  model="claude-3.5-sonnet"
  onMessage={handleMessage}
  streaming
>
  <UserMessage text="build a todo app" />
  <AgentMessage streaming>
    <StreamingText content={response} />
  </AgentMessage>
  <ToolCall name="write_file" file="src/App.tsx" status="running" />
  <ToolResult status="success" files={['src/App.tsx']} />
</AgentChat>`,
  chatbubble: `import { ChatBubble } from 'termui';

<ChatBubble role="user">How do I deploy this?</ChatBubble>
<ChatBubble role="assistant">
  You can deploy using the CLI:
  <CodeBlock code="npm run deploy" />
</ChatBubble>`,
  streaming: `import { StreamingText } from 'termui';

<StreamingText
  content={streamedResponse}
  speed={30}
  showCursor
  onComplete={() => setDone(true)}
/>`,
  thinking: `import { ThinkingIndicator } from 'termui';

<ThinkingIndicator label="Thinking..." />
<ThinkingIndicator label="Analyzing 12 files..." elapsed="3.2s" />
<ThinkingIndicator done label="Planning complete" elapsed="1.8s" />`,
  toolcall: `import { ToolCall } from 'termui';

<ToolCall name="read_file" status="running">
  Reading src/auth/login.ts
</ToolCall>

<ToolCall name="write_file" status="success">
  Wrote 45 lines to src/components/Button.tsx
</ToolCall>

<ToolCall name="run_command" status="error">
  Error: Permission denied
</ToolCall>`,
  toolresult: `import { ToolResult } from 'termui';

<ToolResult status="success" summary="Created 3 files, modified 1">
  <FileChange type="add" path="src/components/Auth.tsx" />
  <FileChange type="add" path="src/hooks/useAuth.ts" />
  <FileChange type="modify" path="src/App.tsx" />
</ToolResult>`,
  agentstatus: `import { AgentStatus } from 'termui';

<AgentStatus
  status="active"
  model="claude-3.5-sonnet"
  tokens={12450}
  latency="120ms"
/>`,
  timeline: `import { AgentTimeline, TimelineStep } from 'termui';

<AgentTimeline>
  <TimelineStep icon="play" label="Request received" time="0ms" />
  <TimelineStep icon="clock" label="Thinking..." time="1.2s" />
  <TimelineStep icon="tool" label="Tool: read_file" time="0.3s" />
  <TimelineStep icon="check" label="Response complete" time="2.1s" />
</AgentTimeline>`,
  thread: `import { ConversationThread } from 'termui';

<ConversationThread
  id={12}
  messages={messages}
  tokenCount={1240}
/>`,
  actions: `import { MessageActions } from 'termui';

<MessageActions
  onCopy={() => copyToClipboard(text)}
  onRate={(rating) => sendFeedback(rating)}
  onRetry={() => regenerateResponse()}
/>`,
};

const components = [
  { id: "agentchat", title: "AgentChat", preview: <AgentChatPreview />, badge: "★ Core" },
  { id: "chatbubble", title: "ChatBubble", preview: <ChatBubblePreview /> },
  { id: "streaming", title: "StreamingText", preview: <StreamingTextPreview /> },
  { id: "thinking", title: "ThinkingIndicator", preview: <ThinkingPreview /> },
  { id: "toolcall", title: "ToolCall", preview: <ToolCallPreview />, badge: "★ Core" },
  { id: "toolresult", title: "ToolResult", preview: <ToolResultPreview />, badge: "★ Core" },
  { id: "agentstatus", title: "AgentStatus", preview: <AgentStatusPreview /> },
  { id: "timeline", title: "AgentTimeline", preview: <TimelinePreview /> },
  { id: "thread", title: "ConversationThread", preview: <ThreadPreview /> },
  { id: "actions", title: "MessageActions", preview: <MessageActionsPreview /> },
];

export default function AgentComponentsPage() {
  return (
    <DocsLayout>
      <div className="max-w-4xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-terminal-magenta/15 text-terminal-magenta border border-terminal-magenta/30 mb-3">
            10 components
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">AI Agent Components</h1>
          <p className="text-muted-foreground">
            The components that make TermUI unique — purpose-built for AI agent interfaces with
            streaming, tool calls, and conversation management.
          </p>
        </div>

        <div className="space-y-8">
          {components.map((comp) => (
            <CodePreview
              key={comp.id}
              id={comp.id}
              title={
                comp.badge
                  ? `${comp.title}  ·  ${comp.badge}`
                  : comp.title
              }
              code={codes[comp.id]}
              preview={comp.preview}
            />
          ))}
        </div>
      </div>
    </DocsLayout>
  );
}
