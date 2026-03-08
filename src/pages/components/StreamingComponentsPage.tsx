import { useState, useEffect } from "react";
import DocsLayout from "../../components/DocsLayout";
import CodePreview from "../../components/CodePreview";
import { Loader2, Check } from "lucide-react";

function StreamingBlockPreview() {
  return (
    <div className="terminal-card rounded-md p-4 text-sm">
      <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
        <Loader2 className="h-3 w-3 animate-spin text-primary" />
        <span>Streaming response...</span>
        <span className="ml-auto">142 tokens</span>
      </div>
      <div className="border-l-2 border-primary/30 pl-3 text-foreground">
        I'll help you implement the authentication module. First, let's create the login component...
        <span className="typing-cursor" />
      </div>
    </div>
  );
}

function TypingPreview() {
  const text = "Building your terminal UI...";
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) { setTimeout(() => { setDisplayed(""); i = 0; }, 1000); }
    }, 60);
    return () => clearInterval(interval);
  }, []);
  return <div className="text-sm">{displayed}<span className="typing-cursor" /></div>;
}

function TokenStreamPreview() {
  const tokens = ["const ", "app ", "= ", "new ", "TermUI", "(", ")", ";"];
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const i = setInterval(() => {
      setVisible((v) => v >= tokens.length ? 0 : v + 1);
    }, 300);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="space-y-2">
      <div className="text-xs text-muted-foreground flex items-center gap-2">
        Token-by-token rendering
        <span className="text-terminal-dim">({visible}/{tokens.length} tokens)</span>
      </div>
      <div className="text-sm font-mono">
        {tokens.slice(0, visible).map((t, i) => (
          <span key={i} className={i === visible - 1 ? "text-primary" : "text-foreground"}>{t}</span>
        ))}
        {visible < tokens.length && <span className="typing-cursor" />}
      </div>
    </div>
  );
}

function StreamingCodePreview() {
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="text-xs text-muted-foreground">generating: todo.tsx</span>
        <Loader2 className="h-3 w-3 animate-spin text-primary" />
      </div>
      <pre className="p-4 text-xs">
        <span className="text-terminal-magenta">import</span> {"{ useState }"} <span className="text-terminal-magenta">from</span> <span className="text-primary">'react'</span>;{"\n\n"}
        <span className="text-terminal-magenta">export default function</span> <span className="text-terminal-cyan">Todo</span>() {"{\n"}
        {"  "}<span className="text-terminal-magenta">const</span> [items, setItems] = useState([]);{"\n"}
        {"  "}<span className="typing-cursor" />
      </pre>
    </div>
  );
}

function StreamingMarkdownPreview() {
  return (
    <div className="space-y-2 text-sm">
      <div className="text-lg font-bold">Getting Started</div>
      <div className="text-muted-foreground">Follow these steps to set up your project:</div>
      <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
        <li>Install dependencies</li>
        <li>Configure your theme</li>
        <li>Add components<span className="typing-cursor" /></li>
      </ol>
    </div>
  );
}

const codes: Record<string, string> = {
  block: `import { StreamingBlock } from 'termui';
<StreamingBlock
  content={response}
  tokenCount={142}
  status="streaming"
/>`,
  typing: `import { TypingAnimation } from 'termui';
<TypingAnimation text="Building your terminal UI..." speed={60} loop />`,
  tokenstream: `import { TokenStream } from 'termui';
<TokenStream tokens={tokenArray} speed={300} showCursor />`,
  code: `import { StreamingCode } from 'termui';
<StreamingCode
  filename="todo.tsx"
  language="typescript"
  content={streamedCode}
/>`,
  markdown: `import { StreamingMarkdown } from 'termui';
<StreamingMarkdown content={streamedMd} />`,
};

const components = [
  { id: "block", title: "StreamingBlock", preview: <StreamingBlockPreview /> },
  { id: "typing", title: "TypingAnimation", preview: <TypingPreview /> },
  { id: "tokenstream", title: "TokenStream", preview: <TokenStreamPreview /> },
  { id: "code", title: "StreamingCode", preview: <StreamingCodePreview /> },
  { id: "markdown", title: "StreamingMarkdown", preview: <StreamingMarkdownPreview /> },
];

export default function StreamingComponentsPage() {
  return (
    <DocsLayout>
      <div className="max-w-4xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-primary/15 text-primary border border-primary/30 mb-3">
            5 components
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Streaming Components</h1>
          <p className="text-muted-foreground">LLM-optimized streaming UI — token streams, typing animations, and live code generation.</p>
        </div>
        <div className="space-y-8">
          {components.map((comp) => (
            <CodePreview key={comp.id} id={comp.id} title={comp.title} code={codes[comp.id]} preview={comp.preview} />
          ))}
        </div>
      </div>
    </DocsLayout>
  );
}
