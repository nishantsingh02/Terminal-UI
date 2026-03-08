import { useState, useEffect } from "react";
import DocsLayout from "../components/DocsLayout";

function KeyboardDemoWidget() {
  const items = ["Open file", "Search project", "Git commit", "Run tests", "Deploy"];
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, items.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="terminal-card rounded-md p-4">
      <div className="text-xs text-muted-foreground mb-3">Use ↑↓ arrow keys to navigate:</div>
      <div className="space-y-1">
        {items.map((item, i) => (
          <div
            key={i}
            className={`px-3 py-1.5 rounded-sm text-sm cursor-default transition-colors ${
              i === selected
                ? "bg-primary/15 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setSelected(i)}
          >
            <span className="mr-2">{i === selected ? "▸" : " "}</span>
            {item}
            {i === selected && (
              <kbd className="ml-auto float-right text-xs bg-muted px-1.5 py-0.5 rounded-sm">Enter</kbd>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KeyboardNavPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl space-y-12">
        <section>
          <h1 className="text-3xl font-display font-bold mb-4">Keyboard Navigation</h1>
          <p className="text-muted-foreground mb-6">
            TermUI components are built with full keyboard accessibility. Every interactive component 
            supports keyboard navigation out of the box.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Built-in Shortcuts</h2>
          <div className="terminal-card rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Key</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Action</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Component</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { key: "↑ / ↓", action: "Navigate items", component: "Select, CommandList" },
                  { key: "Enter", action: "Confirm selection", component: "Select, Input, Modal" },
                  { key: "Escape", action: "Cancel / close", component: "Modal, Select" },
                  { key: "Tab", action: "Next focusable element", component: "All" },
                  { key: "Shift+Tab", action: "Previous focusable element", component: "All" },
                  { key: "Space", action: "Toggle checkbox", component: "Checkbox, Toggle" },
                  { key: "Ctrl+C", action: "Exit application", component: "Global" },
                  { key: "? / h", action: "Show help", component: "CommandList" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="px-4 py-2.5">
                      <kbd className="bg-muted px-2 py-0.5 rounded-sm text-xs text-terminal-cyan">{row.key}</kbd>
                    </td>
                    <td className="px-4 py-2.5">{row.action}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{row.component}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">useKeyboard Hook</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Register custom keyboard shortcuts in any component.
          </p>
          <div className="terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">shortcuts.tsx</div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code>{`import { useKeyboard } from 'termui';

function App() {
  useKeyboard({
    'ctrl+k': () => openCommandPalette(),
    'ctrl+c': () => process.exit(),
    'escape': () => closeModal(),
    '?': () => showHelp(),
  });

  return (
    <Box>
      <Text>Press Ctrl+K for command palette</Text>
    </Box>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Focus Management</h2>
          <div className="terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">focus.tsx</div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code>{`import { useFocus, Box, Text } from 'termui';

function FocusableItem({ label }: { label: string }) {
  const { isFocused } = useFocus();

  return (
    <Box 
      borderColor={isFocused ? 'green' : 'gray'}
      borderStyle={isFocused ? 'bold' : 'single'}
    >
      <Text color={isFocused ? 'green' : 'white'}>
        {isFocused ? '▸ ' : '  '}{label}
      </Text>
    </Box>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Interactive Demo</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Try navigating with arrow keys in this simulated component:
          </p>
          <KeyboardDemoWidget />
        </section>
      </div>
    </DocsLayout>
  );
}
