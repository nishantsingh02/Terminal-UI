import DocsLayout from "../components/DocsLayout";

export default function ArchitecturePage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl space-y-12">
        <section>
          <h1 className="text-3xl font-display font-bold mb-4">Architecture</h1>
          <p className="text-muted-foreground mb-6">
            How TermUI is designed to scale from 15 to 75+ components while staying maintainable,
            tree-shakable, and developer-friendly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Design Principles</h2>
          <div className="space-y-4">
            {[
              { title: "Copy-paste, not install", desc: "Components live in your codebase. No hidden abstractions. You own every line." },
              { title: "Composition over configuration", desc: "Small primitives that compose into complex UIs. No mega-components with 40 props." },
              { title: "Terminal-native", desc: "Every component respects terminal constraints: fixed-width fonts, ANSI colors, box-drawing characters." },
              { title: "Agent-first", desc: "AI agent workflows (streaming, tool calls, chat) are first-class citizens, not afterthoughts." },
              { title: "Zero runtime overhead", desc: "Tree-shakable exports. Only ship what you use. No global state or context requirements." },
            ].map((p) => (
              <div key={p.title} className="terminal-card rounded-md p-4">
                <div className="text-sm font-semibold text-foreground mb-1">{p.title}</div>
                <div className="text-sm text-muted-foreground">{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Project Structure</h2>
          <div className="terminal-card rounded-md p-4 text-sm">
            <pre className="text-foreground">{`termui/
├── src/
│   ├── components/
│   │   ├── layout/          # Container, Stack, Grid, SplitPane...
│   │   ├── display/         # Text, Heading, Badge, JsonViewer...
│   │   ├── input/           # TextInput, Select, CommandPalette...
│   │   ├── agent/           # AgentChat, ToolCall, Streaming...
│   │   ├── feedback/        # Alert, Toast, Progress, Spinner...
│   │   ├── data/            # Table, TreeView, FileTree, StatCard...
│   │   ├── code/            # CodeBlock, DiffBlock, Syntax...
│   │   ├── nav/             # Menu, Breadcrumb, SearchBar...
│   │   ├── devtools/        # LogViewer, TraceViewer, DiffViewer...
│   │   └── streaming/       # StreamingBlock, TokenStream...
│   ├── hooks/
│   │   ├── useKeyboard.ts
│   │   ├── useFocus.ts
│   │   ├── useTerminalSize.ts
│   │   └── useStreaming.ts
│   ├── themes/
│   │   ├── dark.ts
│   │   ├── light.ts
│   │   └── mono.ts
│   ├── utils/
│   │   ├── ansi.ts
│   │   ├── box-drawing.ts
│   │   └── colors.ts
│   └── index.ts             # Barrel exports
├── cli/
│   ├── commands/
│   │   ├── init.ts
│   │   ├── add.ts
│   │   ├── diff.ts
│   │   └── theme.ts
│   └── index.ts
├── registry/                # Component metadata for CLI
│   └── components.json
├── examples/
│   ├── agent-chat/
│   ├── dashboard/
│   └── dev-tools/
└── docs/`}</pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Component Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { name: "Layout", count: 11, color: "text-primary" },
              { name: "Text & Display", count: 11, color: "text-terminal-cyan" },
              { name: "Input", count: 8, color: "text-terminal-amber" },
              { name: "AI Agent", count: 10, color: "text-terminal-magenta" },
              { name: "Dev Tools", count: 6, color: "text-terminal-red" },
              { name: "Feedback", count: 9, color: "text-primary" },
              { name: "Data Display", count: 7, color: "text-terminal-cyan" },
              { name: "Code", count: 5, color: "text-terminal-amber" },
              { name: "Navigation", count: 4, color: "text-terminal-magenta" },
              { name: "Streaming", count: 5, color: "text-primary" },
              { name: "Utility", count: 7, color: "text-muted-foreground" },
            ].map((cat) => (
              <div key={cat.name} className="terminal-card rounded-md p-3 text-center">
                <div className={`text-lg font-bold ${cat.color}`}>{cat.count}</div>
                <div className="text-xs text-muted-foreground">{cat.name}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <span className="text-2xl font-display font-bold text-primary">75+</span>
            <span className="text-sm text-muted-foreground ml-2">total components</span>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">How the CLI Works</h2>
          <div className="terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">CLI Architecture</div>
            <pre className="p-4 text-sm overflow-x-auto">{`┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   CLI Tool  │────▸│   Registry   │────▸│  Your Code  │
│  termui add │     │ components.  │     │ src/compo-  │
│             │     │    json      │     │   nents/    │
└─────────────┘     └──────────────┘     └─────────────┘
       │                   │                    │
       │              Fetches component         │
       │              source + deps             │
       │                                        │
       └──── Resolves dependencies ─────────────┘
             Copies files
             Updates imports`}</pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Agent Message Flow</h2>
          <p className="text-sm text-muted-foreground mb-4">
            The AI Agent components follow a composable pattern that mirrors real agent architectures:
          </p>
          <div className="terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">Agent Composition</div>
            <pre className="p-4 text-sm overflow-x-auto"><code>{`<AgentChat>
  <UserMessage text="build a todo app" />
  
  <AgentMessage streaming>
    <ThinkingIndicator label="Planning..." />
    <StreamingText content={response} />
  </AgentMessage>
  
  <ToolCall name="write_file" status="running">
    <CodeBlock language="ts" file="todo.tsx" />
  </ToolCall>
  
  <ToolResult status="success">
    <FileTree files={createdFiles} />
  </ToolResult>
  
  <AgentMessage>
    <StreamingMarkdown content={summary} />
    <MessageActions />
  </AgentMessage>
</AgentChat>`}</code></pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Publishing as npm Package</h2>
          <div className="terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">package.json</div>
            <pre className="p-4 text-sm overflow-x-auto"><code>{`{
  "name": "@termui/components",
  "version": "0.1.0",
  "exports": {
    ".": "./dist/index.js",
    "./components/*": "./dist/components/*/index.js",
    "./hooks/*": "./dist/hooks/*.js",
    "./themes/*": "./dist/themes/*.js"
  },
  "sideEffects": false,
  "peerDependencies": {
    "ink": "^4.0.0",
    "react": "^18.0.0"
  }
}`}</code></pre>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-primary">▸</span>
              <span><strong className="text-foreground">Tree-shakable:</strong> <span className="text-muted-foreground">Each component is independently importable</span></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">▸</span>
              <span><strong className="text-foreground">Dual ESM/CJS:</strong> <span className="text-muted-foreground">Works in any Node.js environment</span></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">▸</span>
              <span><strong className="text-foreground">Zero dependencies:</strong> <span className="text-muted-foreground">Only ink and React as peer deps</span></span>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
