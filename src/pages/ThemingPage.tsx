import DocsLayout from "../components/DocsLayout";

export default function ThemingPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl space-y-12">
        <section>
          <h1 className="text-3xl font-display font-bold mb-4">Theming</h1>
          <p className="text-muted-foreground mb-6">
            TermUI ships with a flexible theme system supporting dark, light, and monochrome terminal themes.
            Themes control colors, borders, and text styles across all components.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Built-in Themes</h2>
          <div className="grid gap-4">
            {/* Dark theme preview */}
            <div className="terminal-card rounded-md overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                <span className="text-sm font-semibold">Dark <span className="text-muted-foreground font-normal">(default)</span></span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs bg-primary/15 text-primary border border-primary/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Active
                </span>
              </div>
              <div className="p-4 space-y-2 text-sm" style={{ background: "hsl(220 16% 4%)" }}>
                <div className="flex gap-3">
                  <span style={{ color: "hsl(142 72% 50%)" }}>$</span>
                  <span style={{ color: "hsl(155 10% 82%)" }}>termui theme set dark</span>
                </div>
                <div style={{ color: "hsl(220 8% 46%)" }}>✔ Theme set to dark</div>
                <div className="flex gap-2 mt-2">
                  <span className="w-4 h-4 rounded-sm" style={{ background: "hsl(142 72% 50%)" }} />
                  <span className="w-4 h-4 rounded-sm" style={{ background: "hsl(185 80% 55%)" }} />
                  <span className="w-4 h-4 rounded-sm" style={{ background: "hsl(46 90% 55%)" }} />
                  <span className="w-4 h-4 rounded-sm" style={{ background: "hsl(300 60% 65%)" }} />
                  <span className="w-4 h-4 rounded-sm" style={{ background: "hsl(0 72% 55%)" }} />
                </div>
              </div>
            </div>

            {/* Light theme preview */}
            <div className="rounded-md overflow-hidden border border-border">
              <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: "#e0e0e0", background: "#fafafa" }}>
                <span className="text-sm font-semibold" style={{ color: "#1a1a1a" }}>Light</span>
              </div>
              <div className="p-4 space-y-2 text-sm" style={{ background: "#ffffff", color: "#333" }}>
                <div className="flex gap-3">
                  <span style={{ color: "#16a34a" }}>$</span>
                  <span>termui theme set light</span>
                </div>
                <div style={{ color: "#888" }}>✔ Theme set to light</div>
                <div className="flex gap-2 mt-2">
                  <span className="w-4 h-4 rounded-sm" style={{ background: "#16a34a" }} />
                  <span className="w-4 h-4 rounded-sm" style={{ background: "#0891b2" }} />
                  <span className="w-4 h-4 rounded-sm" style={{ background: "#ca8a04" }} />
                  <span className="w-4 h-4 rounded-sm" style={{ background: "#a855f7" }} />
                  <span className="w-4 h-4 rounded-sm" style={{ background: "#dc2626" }} />
                </div>
              </div>
            </div>

            {/* Monochrome theme preview */}
            <div className="rounded-md overflow-hidden border border-border">
              <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: "#333", background: "#0a0a0a" }}>
                <span className="text-sm font-semibold" style={{ color: "#aaa" }}>Monochrome</span>
              </div>
              <div className="p-4 space-y-2 text-sm" style={{ background: "#000", color: "#999" }}>
                <div className="flex gap-3">
                  <span style={{ color: "#ccc" }}>$</span>
                  <span style={{ color: "#ccc" }}>termui theme set mono</span>
                </div>
                <div style={{ color: "#666" }}>✔ Theme set to mono</div>
                <div className="flex gap-2 mt-2">
                  <span className="w-4 h-4 rounded-sm" style={{ background: "#fff" }} />
                  <span className="w-4 h-4 rounded-sm" style={{ background: "#ccc" }} />
                  <span className="w-4 h-4 rounded-sm" style={{ background: "#999" }} />
                  <span className="w-4 h-4 rounded-sm" style={{ background: "#666" }} />
                  <span className="w-4 h-4 rounded-sm" style={{ background: "#333" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Theme Configuration</h2>
          <div className="terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">themes/dark.ts</div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code>{`import { defineTheme } from 'termui';

export const darkTheme = defineTheme({
  name: 'dark',
  colors: {
    background: '#0a0e14',
    foreground: '#c5cdd9',
    primary: '#22c55e',
    secondary: '#1a1f2b',
    muted: '#2a2f3b',
    accent: '#eab308',
    error: '#ef4444',
    info: '#22d3ee',
    warning: '#eab308',
    success: '#22c55e',
  },
  borders: {
    style: 'single', // 'single' | 'double' | 'round' | 'bold'
    color: 'muted',
  },
  text: {
    fontWeight: 'normal',
    dimOpacity: 0.5,
  },
});`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Using Themes</h2>
          <div className="terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">index.tsx</div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code>{`import { ThemeProvider } from 'termui';
import { darkTheme } from './themes/dark';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box flexDirection="column">
        <Text color="primary">Themed text</Text>
        <Card title="Themed card">
          <Text>Content inherits the theme</Text>
        </Card>
      </Box>
    </ThemeProvider>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">ANSI Color Support</h2>
          <p className="text-sm text-muted-foreground mb-4">
            TermUI maps theme colors to ANSI escape codes for true terminal rendering. 
            All 16 standard ANSI colors are supported, plus 256-color and true-color modes.
          </p>
          <div className="terminal-card rounded-md p-4">
            <div className="text-xs text-muted-foreground mb-3">Standard ANSI colors:</div>
            <div className="grid grid-cols-8 gap-2">
              {[
                { label: "black", color: "#000" },
                { label: "red", color: "hsl(0 72% 55%)" },
                { label: "green", color: "hsl(142 72% 50%)" },
                { label: "yellow", color: "hsl(46 90% 55%)" },
                { label: "blue", color: "hsl(210 80% 60%)" },
                { label: "magenta", color: "hsl(300 60% 65%)" },
                { label: "cyan", color: "hsl(185 80% 55%)" },
                { label: "white", color: "#ccc" },
              ].map((c) => (
                <div key={c.label} className="text-center">
                  <div className="w-full h-6 rounded-sm mb-1" style={{ background: c.color }} />
                  <div className="text-[10px] text-muted-foreground">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Switching Themes at Runtime</h2>
          <div className="terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">Terminal</div>
            <pre className="p-4 text-sm">
              <code>
                <span className="text-muted-foreground"># Set theme via CLI</span>{"\n"}
                <span className="text-primary">$</span> npx termui theme set light{"\n\n"}
                <span className="text-muted-foreground"># Or programmatically</span>{"\n"}
                <span className="text-terminal-magenta">import</span> {"{ useTheme }"} <span className="text-terminal-magenta">from</span> <span className="text-primary">'termui'</span>;{"\n\n"}
                <span className="text-terminal-magenta">const</span> {"{ setTheme }"} = useTheme();{"\n"}
                setTheme(<span className="text-primary">'light'</span>);
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Responsive to Terminal Width</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Components automatically adapt to terminal width. Use the <code className="text-terminal-cyan bg-muted px-1 py-0.5 rounded-sm">useTerminalSize</code> hook
            to build responsive layouts.
          </p>
          <div className="terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">responsive.tsx</div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code>{`import { useTerminalSize, Box, Text } from 'termui';

function Layout() {
  const { columns, rows } = useTerminalSize();
  
  return (
    <Box flexDirection={columns < 80 ? 'column' : 'row'}>
      <Box width={columns < 80 ? '100%' : '30%'}>
        <Text>Sidebar</Text>
      </Box>
      <Box flex={1}>
        <Text>Main Content</Text>
      </Box>
    </Box>
  );
}`}</code>
            </pre>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
