import DocsLayout from "../components/DocsLayout";

export default function DocsPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl space-y-12">
        <section>
          <h1 className="text-3xl font-display font-bold mb-4">Introduction</h1>
          <p className="text-muted-foreground leading-relaxed mb-6">
            TermUI is a component library for building beautiful terminal user interfaces with React.
            Inspired by Shadcn UI's copy-paste philosophy, it provides a set of composable components
            designed specifically for CLI AI agents like Claude Code, Codex, and other terminal assistants.
          </p>
          <div className="terminal-card rounded-md p-5 space-y-3">
            <div className="text-xs text-muted-foreground">Key principles:</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span><strong className="text-foreground">Copy-paste, not install.</strong> <span className="text-muted-foreground">Own the code. Customize everything.</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span><strong className="text-foreground">Terminal-first.</strong> <span className="text-muted-foreground">ANSI colors, box-drawing, keyboard navigation built in.</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span><strong className="text-foreground">AI-agent ready.</strong> <span className="text-muted-foreground">Streaming text, chat UI, and token counters out of the box.</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span><strong className="text-foreground">Fully typed.</strong> <span className="text-muted-foreground">TypeScript-first with complete type definitions.</span></span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-display font-bold mb-4">Quick Start</h2>
          <div className="space-y-4">
            <div className="terminal-card rounded-md overflow-hidden">
              <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">Terminal</div>
              <pre className="p-4 text-sm">
                <code>
                  <span className="text-primary">$</span> npx create-termui@latest my-agent{"\n"}
                  <span className="text-primary">$</span> cd my-agent{"\n"}
                  <span className="text-primary">$</span> npx termui add box text chat spinner
                </code>
              </pre>
            </div>
            <p className="text-sm text-muted-foreground">
              This scaffolds a new project and adds the selected components to your <code className="text-terminal-cyan bg-muted px-1.5 py-0.5 rounded-sm">src/components/</code> directory.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-display font-bold mb-4">Project Structure</h2>
          <div className="terminal-card rounded-md p-4 text-sm">
            <pre>
{`my-agent/
├── src/
│   ├── components/
│   │   ├── Box.tsx
│   │   ├── Text.tsx
│   │   ├── Chat.tsx
│   │   ├── Spinner.tsx
│   │   └── ...
│   ├── themes/
│   │   ├── dark.ts
│   │   ├── light.ts
│   │   └── mono.ts
│   └── index.tsx
├── package.json
└── tsconfig.json`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-display font-bold mb-4">Usage Example</h2>
          <div className="terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">index.tsx</div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code>
{`import { render } from 'ink';
import { Box, Text, Chat, Spinner } from './components';

function App() {
  const [loading, setLoading] = useState(true);
  
  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="green">🤖 My AI Agent</Text>
      <Divider />
      {loading ? (
        <Spinner label="Thinking..." />
      ) : (
        <Chat streaming messages={messages} />
      )}
    </Box>
  );
}

render(<App />);`}
              </code>
            </pre>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
