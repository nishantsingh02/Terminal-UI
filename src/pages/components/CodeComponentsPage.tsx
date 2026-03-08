import DocsLayout from "../../components/DocsLayout";
import CodePreview from "../../components/CodePreview";

function CodeBlockPreview() {
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="text-xs text-muted-foreground">agent.ts</span>
        <span className="text-xs text-terminal-cyan">TypeScript</span>
      </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code>
          <span className="text-terminal-magenta">import</span> {"{ "}<span className="text-foreground">Box, Text</span>{" }"} <span className="text-terminal-magenta">from</span> <span className="text-primary">'termui'</span>;{"\n\n"}
          <span className="text-terminal-magenta">export default function</span> <span className="text-terminal-cyan">Agent</span>() {"{\n"}
          {"  "}<span className="text-terminal-magenta">return</span> {"<"}<span className="text-terminal-amber">Box</span>{"> ... </"}<span className="text-terminal-amber">Box</span>{">;\n"}
          {"}"}
        </code>
      </pre>
    </div>
  );
}

function DiffBlockPreview() {
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="px-4 py-2 border-b border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">src/App.tsx</span>
        <span className="text-xs text-muted-foreground">+3 -1</span>
      </div>
      <pre className="p-4 text-xs overflow-x-auto space-y-0">
        <div className="text-muted-foreground"> {"  "}import React from 'react';</div>
        <div className="bg-terminal-red/10 text-terminal-red">- import {"{ old }"} from './old';</div>
        <div className="bg-primary/10 text-primary">+ import {"{ Box, Text }"} from 'termui';</div>
        <div className="bg-primary/10 text-primary">+ import {"{ Chat }"} from 'termui/agent';</div>
        <div className="text-muted-foreground"> </div>
        <div className="text-muted-foreground"> {"  "}export default function App() {"{"}</div>
        <div className="bg-terminal-red/10 text-terminal-red">-   return {"<div>old</div>"};</div>
        <div className="bg-primary/10 text-primary">+   return {"<Box><Chat streaming /></Box>"};</div>
        <div className="text-muted-foreground"> {"  }}"}</div>
      </pre>
    </div>
  );
}

function TerminalOutputPreview() {
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">bash</span>
      </div>
      <div className="p-4 text-xs space-y-1">
        <div><span className="text-primary">$</span> npm run build</div>
        <div className="text-muted-foreground">vite v5.0.0 building for production...</div>
        <div className="text-muted-foreground">✓ 142 modules transformed.</div>
        <div className="text-primary">✓ built in 1.23s</div>
        <div className="text-muted-foreground">dist/index.js   2.4 kB │ gzip: 1.1 kB</div>
      </div>
    </div>
  );
}

function SyntaxPreview() {
  return (
    <div className="text-sm">
      <span className="text-terminal-magenta">const</span>{" "}
      <span className="text-terminal-cyan">greeting</span>{" "}
      <span className="text-foreground">=</span>{" "}
      <span className="text-primary">"Hello, TermUI!"</span>;{"\n"}
      <span className="text-terminal-magenta">console</span>.
      <span className="text-terminal-amber">log</span>(
      <span className="text-terminal-cyan">greeting</span>);
    </div>
  );
}

function LineNumbersPreview() {
  const lines = [
    'import { Box } from "termui";',
    "",
    "function App() {",
    '  return <Box>Hello</Box>;',
    "}",
  ];
  return (
    <div className="text-xs">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="w-8 text-right pr-3 text-terminal-dim select-none">{i + 1}</span>
          <span className="text-foreground">{line}</span>
        </div>
      ))}
    </div>
  );
}

const codes: Record<string, string> = {
  codeblock: `import { CodeBlock } from 'termui';
<CodeBlock filename="agent.ts" language="typescript" code={code} />`,
  diffblock: `import { DiffBlock } from 'termui';
<DiffBlock
  filename="src/App.tsx"
  additions={3}
  deletions={1}
  hunks={diffHunks}
/>`,
  terminaloutput: `import { TerminalOutput } from 'termui';
<TerminalOutput lines={buildOutput} shell="bash" />`,
  syntax: `import { SyntaxHighlight } from 'termui';
<SyntaxHighlight language="typescript">{code}</SyntaxHighlight>`,
  linenumbers: `import { LineNumbers, CodeBlock } from 'termui';
<CodeBlock showLineNumbers startLine={1}>{code}</CodeBlock>`,
};

const components = [
  { id: "codeblock", title: "CodeBlock", preview: <CodeBlockPreview /> },
  { id: "diffblock", title: "DiffBlock", preview: <DiffBlockPreview /> },
  { id: "terminaloutput", title: "TerminalOutput", preview: <TerminalOutputPreview /> },
  { id: "syntax", title: "SyntaxHighlight", preview: <SyntaxPreview /> },
  { id: "linenumbers", title: "LineNumbers", preview: <LineNumbersPreview /> },
];

export default function CodeComponentsPage() {
  return (
    <DocsLayout>
      <div className="max-w-4xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-terminal-amber/15 text-terminal-amber border border-terminal-amber/30 mb-3">
            5 components
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Code & Developer</h1>
          <p className="text-muted-foreground">Code blocks, diff viewers, terminal output, and syntax highlighting.</p>
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
