import { Link } from "react-router-dom";
import DocsLayout from "../components/DocsLayout";

const categories = [
  { title: "Terminal Loaders", desc: "Spinner, ProgressBar, PulseDots, BouncingBar, ClockTimer, MatrixStream.", count: 6, href: "/components/loaders" },
  { title: "ASCII Text", desc: "Block Font, Shadow Font, Slim Font, Glitch Effect, Typewriter Reveal.", count: 5, href: "/components/ascii" },
  { title: "Cards", desc: "ProjectCard, StatCards, ProfileCard, FeatureGrid, NotificationStack.", count: 5, href: "/components/cards" },
  { title: "AI Agent", desc: "AgentChat, ToolCall, ToolResult, StreamingText, Timeline.", count: 10, href: "/components/agent" },
  { title: "Streaming", desc: "StreamingBlock, TypingAnimation, TokenStream, StreamingCode.", count: 5, href: "/components/streaming" },
  { title: "Code & Developer", desc: "CodeBlock, DiffBlock, TerminalOutput, SyntaxHighlight.", count: 5, href: "/components/code" },
  { title: "Dev Tools & Logs", desc: "LogViewer, TraceViewer, DiffViewer, StackTrace.", count: 6, href: "/components/devtools" },
  { title: "Data Display", desc: "Table, TreeView, FileTree, StatCard, Sparkline.", count: 7, href: "/components/data" },
  { title: "Status & Feedback", desc: "Alert, Toast, Progress, StepProgress, Modal, Spinner.", count: 9, href: "/components/feedback" },
  { title: "Input", desc: "TextInput, Select, MultiSelect, CommandPalette, Switch.", count: 8, href: "/components/input" },
  { title: "Navigation", desc: "Menu, Breadcrumb, CommandMenu, SearchBar.", count: 4, href: "/components/nav" },
  { title: "Text & Display", desc: "Heading, Badge, MarkdownViewer, JsonViewer, AnsiText.", count: 11, href: "/components/display" },
  { title: "Layout", desc: "Container, Stack, Grid, SplitPane, Tabs, Accordion, and more.", count: 11, href: "/components/layout" },
];

export default function ComponentsPage() {
  const total = categories.reduce((sum, c) => sum + c.count, 0);
  return (
    <DocsLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Components</h1>
        <p className="text-lg text-muted-foreground mb-8">
          {total} components across {categories.length} categories.
        </p>

        <div className="grid gap-1">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.href}
              className="flex items-center justify-between py-3 px-3 -mx-3 rounded-lg hover:bg-accent transition-colors group"
            >
              <div>
                <h3 className="text-sm font-medium text-foreground group-hover:underline">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
              </div>
              <span className="text-xs text-muted-foreground tabular-nums">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </DocsLayout>
  );
}
