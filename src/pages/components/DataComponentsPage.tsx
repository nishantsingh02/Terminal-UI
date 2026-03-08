import { useState } from "react";
import DocsLayout from "../../components/DocsLayout";
import CodePreview from "../../components/CodePreview";
import { Check, X, AlertCircle, Loader2, ChevronRight, ChevronDown } from "lucide-react";

function TablePreview() {
  return (
    <div className="overflow-x-auto text-sm">
      <table className="w-full">
        <thead><tr className="border-b border-border text-left">
          <th className="py-2 pr-6 text-muted-foreground font-medium">Name</th>
          <th className="py-2 pr-6 text-muted-foreground font-medium">Type</th>
          <th className="py-2 pr-6 text-muted-foreground font-medium">Size</th>
          <th className="py-2 text-muted-foreground font-medium">Status</th>
        </tr></thead>
        <tbody>
          {[
            { name: "App.tsx", type: "tsx", size: "2.4kb", status: "✓" },
            { name: "index.ts", type: "ts", size: "0.8kb", status: "✓" },
            { name: "styles.css", type: "css", size: "1.2kb", status: "~" },
          ].map((r) => (
            <tr key={r.name} className="border-b border-border/50">
              <td className="py-2 pr-6 text-terminal-cyan">{r.name}</td>
              <td className="py-2 pr-6 text-muted-foreground">{r.type}</td>
              <td className="py-2 pr-6 text-muted-foreground">{r.size}</td>
              <td className="py-2 text-primary">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ListPreview() {
  return (
    <div className="space-y-1 text-sm">
      {["Install dependencies", "Configure TypeScript", "Add components", "Run dev server"].map((item, i) => (
        <div key={i} className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-secondary">
          <span className="text-primary">▸</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function TreeViewPreview() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ src: true, components: true });
  const toggle = (key: string) => setExpanded({ ...expanded, [key]: !expanded[key] });
  return (
    <div className="text-sm space-y-0.5">
      <div className="flex items-center gap-1 cursor-pointer hover:text-foreground text-muted-foreground" onClick={() => toggle("src")}>
        {expanded.src ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        <span className="text-terminal-amber">📁</span> src/
      </div>
      {expanded.src && (
        <div className="pl-5 space-y-0.5">
          <div className="flex items-center gap-1 cursor-pointer hover:text-foreground text-muted-foreground" onClick={() => toggle("components")}>
            {expanded.components ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            <span className="text-terminal-amber">📁</span> components/
          </div>
          {expanded.components && (
            <div className="pl-5 space-y-0.5">
              <div className="text-muted-foreground pl-4">📄 <span className="text-terminal-cyan">Button.tsx</span></div>
              <div className="text-muted-foreground pl-4">📄 <span className="text-terminal-cyan">Input.tsx</span></div>
            </div>
          )}
          <div className="text-muted-foreground pl-4">📄 <span className="text-terminal-cyan">App.tsx</span></div>
          <div className="text-muted-foreground pl-4">📄 <span className="text-terminal-cyan">index.ts</span></div>
        </div>
      )}
    </div>
  );
}

function FileTreePreview() {
  return (
    <div className="text-xs font-mono text-muted-foreground">
      <pre>{`my-agent/
├── src/
│   ├── components/
│   │   ├── Box.tsx
│   │   ├── Text.tsx
│   │   └── Chat.tsx
│   ├── hooks/
│   │   └── useKeyboard.ts
│   ├── App.tsx
│   └── index.ts
├── package.json
└── tsconfig.json`}</pre>
    </div>
  );
}

function KeyValuePreview() {
  return (
    <div className="space-y-1 text-sm">
      {[
        { key: "Name", value: "termui-agent" },
        { key: "Version", value: "0.1.0" },
        { key: "Runtime", value: "Node.js 20.x" },
        { key: "Uptime", value: "4h 32m" },
      ].map((kv) => (
        <div key={kv.key} className="flex items-center">
          <span className="text-muted-foreground w-24">{kv.key}</span>
          <span className="text-foreground">{kv.value}</span>
        </div>
      ))}
    </div>
  );
}

function StatCardPreview() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: "Tokens Used", value: "12,450", trend: "+12%" },
        { label: "Avg Latency", value: "120ms", trend: "-5%" },
        { label: "Success Rate", value: "99.2%", trend: "+0.1%" },
      ].map((s) => (
        <div key={s.label} className="terminal-card rounded-md p-3 text-center">
          <div className="text-lg font-bold text-primary">{s.value}</div>
          <div className="text-xs text-muted-foreground">{s.label}</div>
          <div className="text-xs text-primary mt-1">{s.trend}</div>
        </div>
      ))}
    </div>
  );
}

function SparklinePreview() {
  const data = [3, 7, 4, 8, 2, 9, 5, 6, 8, 3, 7, 9, 4, 6, 8];
  const max = Math.max(...data);
  const chars = data.map((d) => {
    const idx = Math.round((d / max) * 7);
    return "▁▂▃▄▅▆▇█"[idx];
  });
  return (
    <div className="space-y-2">
      <div className="text-xs text-muted-foreground">Requests / minute</div>
      <div className="text-lg text-primary tracking-wider">{chars.join("")}</div>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>15m ago</span>
        <span>now</span>
      </div>
    </div>
  );
}

const codes: Record<string, string> = {
  table: `import { Table } from 'termui';
<Table
  columns={[
    { key: 'name', title: 'Name' },
    { key: 'type', title: 'Type' },
    { key: 'size', title: 'Size' },
  ]}
  data={files}
/>`,
  list: `import { List, ListItem } from 'termui';
<List>
  {items.map(item => <ListItem key={item}>{item}</ListItem>)}
</List>`,
  treeview: `import { TreeView } from 'termui';
<TreeView
  data={directoryStructure}
  onSelect={handleFileSelect}
  defaultExpanded={['src', 'components']}
/>`,
  filetree: `import { FileTree } from 'termui';
<FileTree root="my-agent" files={fileStructure} />`,
  keyvalue: `import { KeyValue } from 'termui';
<KeyValue data={{ Name: "termui", Version: "0.1.0" }} />`,
  statcard: `import { StatCard } from 'termui';
<StatCard label="Tokens" value="12,450" trend="+12%" />`,
  sparkline: `import { Sparkline } from 'termui';
<Sparkline data={requestsPerMinute} label="Requests / minute" />`,
};

const components = [
  { id: "table", title: "Table", preview: <TablePreview /> },
  { id: "list", title: "List", preview: <ListPreview /> },
  { id: "treeview", title: "TreeView", preview: <TreeViewPreview /> },
  { id: "filetree", title: "FileTree", preview: <FileTreePreview /> },
  { id: "keyvalue", title: "KeyValue", preview: <KeyValuePreview /> },
  { id: "statcard", title: "StatCard", preview: <StatCardPreview /> },
  { id: "sparkline", title: "Sparkline", preview: <SparklinePreview /> },
];

export default function DataComponentsPage() {
  return (
    <DocsLayout>
      <div className="max-w-4xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-terminal-cyan/15 text-terminal-cyan border border-terminal-cyan/30 mb-3">
            7 components
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Data Display</h1>
          <p className="text-muted-foreground">Tables, trees, key-value pairs, stat cards and sparklines for CLI dashboards.</p>
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
