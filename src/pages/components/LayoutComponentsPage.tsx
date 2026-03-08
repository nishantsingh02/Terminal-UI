import { useState } from "react";
import DocsLayout from "../../components/DocsLayout";
import CodePreview from "../../components/CodePreview";

function ContainerPreview() {
  return (
    <div className="border border-border rounded-sm p-4">
      <div className="text-xs text-muted-foreground mb-1">┌─ Container ── width: 100% ── maxWidth: terminal.columns ─┐</div>
      <div className="text-sm pl-2 text-foreground">Respects terminal width automatically</div>
      <div className="text-xs text-muted-foreground mt-1">└──────────────────────────────────────────────────────────┘</div>
    </div>
  );
}

function StackPreview() {
  return (
    <div className="space-y-2">
      <div className="bg-primary/10 border border-primary/30 rounded-sm px-3 py-2 text-xs text-primary">Item 1</div>
      <div className="bg-terminal-cyan/10 border border-terminal-cyan/30 rounded-sm px-3 py-2 text-xs text-terminal-cyan">Item 2</div>
      <div className="bg-terminal-amber/10 border border-terminal-amber/30 rounded-sm px-3 py-2 text-xs text-terminal-amber">Item 3</div>
    </div>
  );
}

function InlinePreview() {
  return (
    <div className="flex gap-2">
      <div className="bg-primary/10 border border-primary/30 rounded-sm px-3 py-2 text-xs text-primary">Left</div>
      <div className="bg-terminal-cyan/10 border border-terminal-cyan/30 rounded-sm px-3 py-2 text-xs text-terminal-cyan flex-1">Center (flex)</div>
      <div className="bg-terminal-amber/10 border border-terminal-amber/30 rounded-sm px-3 py-2 text-xs text-terminal-amber">Right</div>
    </div>
  );
}

function GridPreview() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[1,2,3,4,5,6].map((i) => (
        <div key={i} className="bg-secondary border border-border rounded-sm px-3 py-3 text-xs text-center text-muted-foreground">
          Cell {i}
        </div>
      ))}
    </div>
  );
}

function SplitPanePreview() {
  return (
    <div className="flex border border-border rounded-sm overflow-hidden h-32">
      <div className="w-1/3 border-r border-border p-3 text-xs">
        <div className="text-primary font-medium mb-2">Files</div>
        <div className="space-y-1 text-muted-foreground">
          <div>📄 App.tsx</div>
          <div>📄 index.ts</div>
          <div>📁 components/</div>
        </div>
      </div>
      <div className="flex-1 p-3 text-xs bg-muted/30">
        <div className="text-terminal-cyan font-medium mb-2">Editor</div>
        <div className="text-muted-foreground">
          <span className="text-terminal-magenta">import</span> React <span className="text-terminal-magenta">from</span> <span className="text-primary">'react'</span>;
        </div>
      </div>
    </div>
  );
}

function PanelPreview() {
  return (
    <div className="terminal-card rounded-md p-4">
      <div className="text-sm font-semibold text-foreground mb-2">Panel Title</div>
      <div className="text-sm text-muted-foreground">Bordered content section with optional title bar.</div>
    </div>
  );
}

function TabsPreview() {
  const [tab, setTab] = useState(0);
  const tabs = ["Output", "Problems", "Terminal"];
  return (
    <div className="border border-border rounded-sm overflow-hidden">
      <div className="flex border-b border-border">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`px-4 py-2 text-xs transition-colors ${
              i === tab ? "bg-secondary text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
            {t === "Problems" && <span className="ml-1.5 text-terminal-amber">3</span>}
          </button>
        ))}
      </div>
      <div className="p-3 text-xs text-muted-foreground">
        {tab === 0 && "Build succeeded in 1.2s"}
        {tab === 1 && (
          <div className="space-y-1">
            <div><span className="text-terminal-amber">⚠</span> Unused variable 'x' (line 12)</div>
            <div><span className="text-terminal-amber">⚠</span> Missing return type (line 24)</div>
            <div><span className="text-terminal-red">✕</span> Type error (line 31)</div>
          </div>
        )}
        {tab === 2 && <div><span className="text-primary">$</span> npm run dev</div>}
      </div>
    </div>
  );
}

function AccordionPreview() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { title: "Dependencies", content: "react@18.3.1, ink@4.0.0, chalk@5.0.0" },
    { title: "Dev Dependencies", content: "typescript@5.0, vitest@1.0, tsup@8.0" },
    { title: "Scripts", content: "dev, build, test, lint, publish" },
  ];
  return (
    <div className="border border-border rounded-sm divide-y divide-border">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-secondary/50 transition-colors"
          >
            <span>{item.title}</span>
            <span className={`text-xs text-muted-foreground transition-transform ${open === i ? "rotate-90" : ""}`}>▸</span>
          </button>
          {open === i && (
            <div className="px-3 py-2 text-xs text-muted-foreground bg-muted/30">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function SeparatorPreview() {
  return (
    <div className="space-y-3 text-sm">
      <div>Content above</div>
      <div className="border-t border-border" />
      <div>Between separators</div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="flex-1 border-t border-border" />
        <span>Section</span>
        <span className="flex-1 border-t border-border" />
      </div>
      <div>Content below</div>
    </div>
  );
}

function ScrollAreaPreview() {
  return (
    <div className="border border-border rounded-sm h-28 overflow-y-auto p-3 text-xs space-y-1">
      {Array.from({ length: 15 }, (_, i) => (
        <div key={i} className="text-muted-foreground">
          <span className="text-terminal-dim mr-2">{String(i + 1).padStart(2, " ")}</span>
          Log entry: Process event #{i + 1}
        </div>
      ))}
    </div>
  );
}

function CenterPreview() {
  return (
    <div className="border border-border rounded-sm h-24 flex items-center justify-center">
      <span className="text-sm text-primary">Centered content</span>
    </div>
  );
}

const codes: Record<string, string> = {
  container: `import { Container } from 'termui';
<Container maxWidth={120} padding={2}>
  <Text>Respects terminal width</Text>
</Container>`,
  stack: `import { Stack } from 'termui';
<Stack gap={1}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Stack>`,
  inline: `import { Inline } from 'termui';
<Inline gap={1}>
  <Box>Left</Box>
  <Box flex={1}>Center</Box>
  <Box>Right</Box>
</Inline>`,
  grid: `import { Grid } from 'termui';
<Grid columns={3} gap={1}>
  {cells.map(c => <Box key={c}>Cell {c}</Box>)}
</Grid>`,
  splitpane: `import { SplitPane } from 'termui';
<SplitPane direction="horizontal" ratio={0.3}>
  <FileTree />
  <Editor />
</SplitPane>`,
  panel: `import { Panel } from 'termui';
<Panel title="Panel Title" border="single">
  <Text>Bordered content section</Text>
</Panel>`,
  tabs: `import { Tabs, Tab } from 'termui';
<Tabs defaultTab="output">
  <Tab label="Output" badge={null}>...</Tab>
  <Tab label="Problems" badge={3}>...</Tab>
  <Tab label="Terminal">...</Tab>
</Tabs>`,
  accordion: `import { Accordion, AccordionItem } from 'termui';
<Accordion>
  <AccordionItem title="Dependencies">react, ink, chalk</AccordionItem>
  <AccordionItem title="Scripts">dev, build, test</AccordionItem>
</Accordion>`,
  scrollarea: `import { ScrollArea } from 'termui';
<ScrollArea height={10}>
  {logs.map(log => <LogLine key={log.id} {...log} />)}
</ScrollArea>`,
  separator: `import { Separator } from 'termui';
<Text>Above</Text>
<Separator />
<Separator label="Section" />
<Text>Below</Text>`,
  center: `import { Center } from 'termui';
<Center>
  <Text color="green">Centered content</Text>
</Center>`,
};

const components = [
  { id: "container", title: "Container", preview: <ContainerPreview /> },
  { id: "stack", title: "Stack", preview: <StackPreview /> },
  { id: "inline", title: "Inline", preview: <InlinePreview /> },
  { id: "grid", title: "Grid", preview: <GridPreview /> },
  { id: "splitpane", title: "SplitPane", preview: <SplitPanePreview /> },
  { id: "panel", title: "Panel", preview: <PanelPreview /> },
  { id: "tabs", title: "Tabs", preview: <TabsPreview /> },
  { id: "accordion", title: "Accordion", preview: <AccordionPreview /> },
  { id: "scrollarea", title: "ScrollArea", preview: <ScrollAreaPreview /> },
  { id: "separator", title: "Separator", preview: <SeparatorPreview /> },
  { id: "center", title: "Center", preview: <CenterPreview /> },
];

export default function LayoutComponentsPage() {
  return (
    <DocsLayout>
      <div className="max-w-4xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-primary/15 text-primary border border-primary/30 mb-3">
            11 components
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Layout Components</h1>
          <p className="text-muted-foreground">
            Structural primitives for building terminal layouts — from simple stacks to complex split-pane editors.
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
