import DocsLayout from "../../components/DocsLayout";
import CodePreview from "../../components/CodePreview";
import { AlertCircle, Loader2, ChevronRight, Clock } from "lucide-react";

function LogViewerPreview() {
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="px-4 py-2 border-b border-border flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Log Viewer</span>
        <span className="text-muted-foreground">47 entries</span>
      </div>
      <div className="p-3 space-y-1 text-xs font-mono max-h-32 overflow-y-auto">
        <div><span className="text-terminal-dim">14:32:01</span> <span className="text-terminal-cyan">[INFO]</span> Agent started</div>
        <div><span className="text-terminal-dim">14:32:02</span> <span className="text-terminal-cyan">[INFO]</span> Connected to model</div>
        <div><span className="text-terminal-dim">14:32:05</span> <span className="text-terminal-amber">[WARN]</span> High token usage</div>
        <div><span className="text-terminal-dim">14:32:07</span> <span className="text-terminal-magenta">[DEBUG]</span> Tool call: read_file</div>
        <div><span className="text-terminal-dim">14:32:08</span> <span className="text-terminal-red">[ERROR]</span> Permission denied</div>
        <div><span className="text-terminal-dim">14:32:09</span> <span className="text-terminal-cyan">[INFO]</span> Retrying...</div>
      </div>
    </div>
  );
}

function TracePreview() {
  return (
    <div className="text-xs space-y-0.5">
      {[
        { depth: 0, label: "agent.run()", time: "2.1s", color: "text-primary" },
        { depth: 1, label: "llm.complete()", time: "1.2s", color: "text-terminal-cyan" },
        { depth: 2, label: "tool.readFile()", time: "0.3s", color: "text-terminal-amber" },
        { depth: 2, label: "tool.writeFile()", time: "0.1s", color: "text-terminal-amber" },
        { depth: 1, label: "llm.complete()", time: "0.5s", color: "text-terminal-cyan" },
      ].map((t, i) => (
        <div key={i} style={{ paddingLeft: `${t.depth * 16}px` }} className="flex items-center gap-2">
          <span className={t.color}>{t.depth > 0 ? "├─" : "┌"}</span>
          <span>{t.label}</span>
          <span className="text-muted-foreground ml-auto">{t.time}</span>
        </div>
      ))}
    </div>
  );
}

function EventTimelinePreview() {
  return (
    <div className="space-y-0">
      {[
        { time: "0ms", label: "Request received", type: "info" },
        { time: "50ms", label: "Auth validated", type: "info" },
        { time: "1.2s", label: "LLM response started", type: "info" },
        { time: "1.5s", label: "Tool: write_file", type: "tool" },
        { time: "2.1s", label: "Response complete", type: "success" },
      ].map((e, i) => (
        <div key={i} className="flex items-center gap-3 text-xs py-1">
          <span className="text-muted-foreground w-12 text-right">{e.time}</span>
          <span className={`w-1.5 h-1.5 rounded-full ${e.type === "success" ? "bg-primary" : e.type === "tool" ? "bg-terminal-amber" : "bg-terminal-cyan"}`} />
          <span>{e.label}</span>
        </div>
      ))}
    </div>
  );
}

function DiffViewerPreview() {
  return (
    <div className="text-xs font-mono space-y-0">
      <div className="text-muted-foreground">@@ -1,3 +1,4 @@</div>
      <div className="text-muted-foreground"> import React from 'react';</div>
      <div className="bg-terminal-red/10 text-terminal-red">-import {"{ old }"} from './old';</div>
      <div className="bg-primary/10 text-primary">+import {"{ Box }"} from 'termui';</div>
      <div className="bg-primary/10 text-primary">+import {"{ Chat }"} from 'termui/agent';</div>
    </div>
  );
}

function StackTracePreview() {
  return (
    <div className="text-xs font-mono space-y-0.5">
      <div className="text-terminal-red font-bold">TypeError: Cannot read property 'map' of undefined</div>
      <div className="text-muted-foreground pl-4">at AgentChat (src/components/Chat.tsx:42:18)</div>
      <div className="text-muted-foreground pl-4">at renderWithHooks (react-dom.js:1234)</div>
      <div className="text-terminal-dim pl-4">at mountIndeterminateComponent (react-dom.js:5678)</div>
    </div>
  );
}

function RequestPreview() {
  return (
    <div className="terminal-card rounded-md overflow-hidden text-xs">
      <div className="px-3 py-1.5 border-b border-border flex items-center gap-2">
        <span className="bg-primary/15 text-primary px-1.5 py-0.5 rounded-sm font-medium">POST</span>
        <span className="text-muted-foreground">/api/v1/chat/completions</span>
        <span className="ml-auto text-primary">200</span>
        <span className="text-muted-foreground">320ms</span>
      </div>
      <div className="p-3 text-muted-foreground">
        <div><span className="text-terminal-cyan">model</span>: "claude-3.5-sonnet"</div>
        <div><span className="text-terminal-cyan">tokens</span>: 245</div>
        <div><span className="text-terminal-cyan">stream</span>: true</div>
      </div>
    </div>
  );
}

const codes: Record<string, string> = {
  logviewer: `import { LogViewer } from 'termui';
<LogViewer logs={agentLogs} maxHeight={20} follow />`,
  trace: `import { TraceViewer } from 'termui';
<TraceViewer trace={executionTrace} />`,
  eventtimeline: `import { EventTimeline } from 'termui';
<EventTimeline events={agentEvents} />`,
  diffviewer: `import { DiffViewer } from 'termui';
<DiffViewer hunks={diffHunks} filename="App.tsx" />`,
  stacktrace: `import { StackTrace } from 'termui';
<StackTrace error={caughtError} />`,
  request: `import { RequestViewer } from 'termui';
<RequestViewer method="POST" url="/api/chat" status={200} />`,
};

const components = [
  { id: "logviewer", title: "LogViewer", preview: <LogViewerPreview /> },
  { id: "trace", title: "TraceViewer", preview: <TracePreview /> },
  { id: "eventtimeline", title: "EventTimeline", preview: <EventTimelinePreview /> },
  { id: "diffviewer", title: "DiffViewer", preview: <DiffViewerPreview /> },
  { id: "stacktrace", title: "StackTrace", preview: <StackTracePreview /> },
  { id: "request", title: "RequestViewer", preview: <RequestPreview /> },
];

export default function DevToolsComponentsPage() {
  return (
    <DocsLayout>
      <div className="max-w-4xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-terminal-red/15 text-terminal-red border border-terminal-red/30 mb-3">
            6 components
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Dev Tools & Logs</h1>
          <p className="text-muted-foreground">Log viewers, trace inspectors, diff viewers, and debugging tools for AI agent workflows.</p>
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
