import { useState, useEffect } from "react";
import DocsLayout from "../../components/DocsLayout";
import CodePreview from "../../components/CodePreview";
import { Check, X, AlertCircle, Loader2 } from "lucide-react";

function HeadingPreview() {
  return (
    <div className="space-y-2">
      <div className="text-xl font-bold text-foreground">h1 — Page Title</div>
      <div className="text-lg font-semibold text-foreground">h2 — Section Title</div>
      <div className="text-base font-medium text-foreground">h3 — Subsection</div>
      <div className="text-sm font-medium text-muted-foreground">h4 — Minor heading</div>
    </div>
  );
}

function TextPreview() {
  return (
    <div className="space-y-1.5">
      <div className="text-foreground">Regular body text</div>
      <div className="text-muted-foreground text-sm">Muted secondary text</div>
      <div className="text-primary font-bold">Bold primary text</div>
      <div className="text-foreground italic">Italic emphasis</div>
      <div className="text-terminal-cyan underline">Underlined link-style</div>
      <div className="text-terminal-red line-through">Strikethrough deprecated</div>
    </div>
  );
}

function HighlightPreview() {
  return (
    <div className="text-sm space-y-2">
      <div>Use <span className="bg-primary/20 text-primary px-1 rounded-sm">highlight</span> for emphasis</div>
      <div>Warning: <span className="bg-terminal-amber/20 text-terminal-amber px-1 rounded-sm">rate limit</span> approaching</div>
      <div>Error in <span className="bg-terminal-red/20 text-terminal-red px-1 rounded-sm">line 42</span></div>
    </div>
  );
}

function KbdPreview() {
  return (
    <div className="flex flex-wrap gap-3 items-center text-sm">
      <div className="flex items-center gap-1">
        <kbd className="bg-muted border border-border px-2 py-0.5 rounded-sm text-xs">⌘</kbd>
        <span className="text-muted-foreground">+</span>
        <kbd className="bg-muted border border-border px-2 py-0.5 rounded-sm text-xs">K</kbd>
      </div>
      <div className="flex items-center gap-1">
        <kbd className="bg-muted border border-border px-2 py-0.5 rounded-sm text-xs">Ctrl</kbd>
        <span className="text-muted-foreground">+</span>
        <kbd className="bg-muted border border-border px-2 py-0.5 rounded-sm text-xs">C</kbd>
      </div>
      <kbd className="bg-muted border border-border px-2 py-0.5 rounded-sm text-xs">Escape</kbd>
      <kbd className="bg-muted border border-border px-2 py-0.5 rounded-sm text-xs">Enter ↵</kbd>
    </div>
  );
}

function BadgePreview() {
  return (
    <div className="flex flex-wrap gap-2">
      {[
        { label: "Active", cls: "bg-primary/15 text-primary border-primary/30" },
        { label: "Warning", cls: "bg-terminal-amber/15 text-terminal-amber border-terminal-amber/30" },
        { label: "Error", cls: "bg-terminal-red/15 text-terminal-red border-terminal-red/30" },
        { label: "Info", cls: "bg-terminal-cyan/15 text-terminal-cyan border-terminal-cyan/30" },
        { label: "Beta", cls: "bg-terminal-magenta/15 text-terminal-magenta border-terminal-magenta/30" },
      ].map((b) => (
        <span key={b.label} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs border ${b.cls}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" /> {b.label}
        </span>
      ))}
    </div>
  );
}

function TimestampPreview() {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground font-mono">14:32:05</span>
        <span>Server started</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground font-mono">14:32:07</span>
        <span>Connected to database</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground font-mono">14:32:08</span>
        <span className="text-primary">Ready on port 3000</span>
      </div>
    </div>
  );
}

function LinkPreview() {
  return (
    <div className="space-y-1 text-sm">
      <div><span className="text-terminal-cyan underline cursor-pointer hover:text-terminal-cyan/80">https://docs.termui.dev</span></div>
      <div><span className="text-terminal-blue underline cursor-pointer hover:text-terminal-blue/80">View on GitHub →</span></div>
      <div>See the <span className="text-primary underline cursor-pointer">installation guide</span> for details.</div>
    </div>
  );
}

function MarkdownPreview() {
  return (
    <div className="border border-border rounded-sm p-4 text-sm space-y-3">
      <div className="text-lg font-bold">Markdown Rendering</div>
      <div className="text-muted-foreground">Renders markdown content with proper terminal styling including:</div>
      <ul className="space-y-1 text-muted-foreground ml-4">
        <li>• <strong className="text-foreground">Bold</strong> and <em>italic</em> text</li>
        <li>• <code className="bg-muted px-1 rounded-sm text-terminal-cyan text-xs">inline code</code></li>
        <li>• Lists and blockquotes</li>
        <li>• <span className="text-terminal-cyan underline">Links</span></li>
      </ul>
      <div className="border-l-2 border-primary/40 pl-3 text-muted-foreground italic">"Blockquote styling"</div>
    </div>
  );
}

function JsonPreview() {
  return (
    <div className="border border-border rounded-sm p-3 text-xs">
      <div>{"{"}</div>
      <div className="pl-4"><span className="text-terminal-cyan">"name"</span>: <span className="text-primary">"termui"</span>,</div>
      <div className="pl-4"><span className="text-terminal-cyan">"version"</span>: <span className="text-primary">"0.1.0"</span>,</div>
      <div className="pl-4"><span className="text-terminal-cyan">"components"</span>: <span className="text-terminal-amber">75</span>,</div>
      <div className="pl-4"><span className="text-terminal-cyan">"stable"</span>: <span className="text-terminal-magenta">true</span></div>
      <div>{"}"}</div>
    </div>
  );
}

function LogLinePreview() {
  return (
    <div className="space-y-1 text-xs font-mono">
      <div><span className="text-muted-foreground">14:32:05</span> <span className="text-terminal-cyan">[INFO]</span> Server started on port 3000</div>
      <div><span className="text-muted-foreground">14:32:06</span> <span className="text-terminal-amber">[WARN]</span> Deprecated API used in auth module</div>
      <div><span className="text-muted-foreground">14:32:07</span> <span className="text-terminal-red">[ERROR]</span> Failed to connect to Redis</div>
      <div><span className="text-muted-foreground">14:32:08</span> <span className="text-terminal-magenta">[DEBUG]</span> Retrying connection (attempt 2/3)</div>
    </div>
  );
}

function AnsiPreview() {
  return (
    <div className="space-y-1 text-sm">
      <div className="text-terminal-red">■ Red (ANSI 1)</div>
      <div className="text-primary">■ Green (ANSI 2)</div>
      <div className="text-terminal-amber">■ Yellow (ANSI 3)</div>
      <div className="text-terminal-blue">■ Blue (ANSI 4)</div>
      <div className="text-terminal-magenta">■ Magenta (ANSI 5)</div>
      <div className="text-terminal-cyan">■ Cyan (ANSI 6)</div>
      <div className="flex gap-1 mt-2 text-xs text-muted-foreground">
        {["#000","#c00","#0a0","#cc0","#00c","#c0c","#0cc","#ccc"].map((c, i) => (
          <span key={i} className="w-6 h-4 rounded-sm" style={{ background: c }} />
        ))}
      </div>
    </div>
  );
}

const codes: Record<string, string> = {
  heading: `import { Heading } from 'termui';
<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section Title</Heading>`,
  text: `import { Text, MutedText } from 'termui';
<Text bold>Bold primary</Text>
<MutedText>Secondary muted</MutedText>
<Text italic>Emphasized</Text>`,
  highlight: `import { Highlight } from 'termui';
<Text>Use <Highlight>highlight</Highlight> for emphasis</Text>
<Text>Warning: <Highlight color="yellow">rate limit</Highlight></Text>`,
  kbd: `import { Kbd } from 'termui';
<Kbd>⌘</Kbd> + <Kbd>K</Kbd>
<Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>`,
  badge: `import { Badge } from 'termui';
<Badge variant="success">Active</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>`,
  timestamp: `import { Timestamp } from 'termui';
<Timestamp time="14:32:05">Server started</Timestamp>`,
  link: `import { Link } from 'termui';
<Link url="https://docs.termui.dev">Documentation</Link>`,
  markdown: `import { MarkdownViewer } from 'termui';
<MarkdownViewer content={markdownString} />`,
  json: `import { JsonViewer } from 'termui';
<JsonViewer data={{ name: "termui", version: "0.1.0" }} />`,
  logline: `import { LogLine } from 'termui';
<LogLine level="info" time="14:32:05">Server started</LogLine>
<LogLine level="error" time="14:32:07">Connection failed</LogLine>`,
  ansi: `import { AnsiText } from 'termui';
<AnsiText code="\\x1b[31mRed text\\x1b[0m" />
<AnsiText code="\\x1b[1;32mBold green\\x1b[0m" />`,
};

const components = [
  { id: "heading", title: "Heading", preview: <HeadingPreview /> },
  { id: "text", title: "Text", preview: <TextPreview /> },
  { id: "highlight", title: "Highlight", preview: <HighlightPreview /> },
  { id: "kbd", title: "Kbd", preview: <KbdPreview /> },
  { id: "badge", title: "Badge", preview: <BadgePreview /> },
  { id: "timestamp", title: "Timestamp", preview: <TimestampPreview /> },
  { id: "link", title: "Link", preview: <LinkPreview /> },
  { id: "markdown", title: "MarkdownViewer", preview: <MarkdownPreview /> },
  { id: "json", title: "JsonViewer", preview: <JsonPreview /> },
  { id: "logline", title: "LogLine", preview: <LogLinePreview /> },
  { id: "ansi", title: "AnsiText", preview: <AnsiPreview /> },
];

export default function DisplayComponentsPage() {
  return (
    <DocsLayout>
      <div className="max-w-4xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-terminal-cyan/15 text-terminal-cyan border border-terminal-cyan/30 mb-3">
            11 components
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Text & Display</h1>
          <p className="text-muted-foreground">
            Rich text rendering, syntax highlighting, JSON/markdown viewers, and ANSI color support.
          </p>
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
