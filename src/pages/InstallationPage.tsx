import DocsLayout from "../components/DocsLayout";

export default function InstallationPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl space-y-10">
        <section>
          <h1 className="text-3xl font-display font-bold mb-4">Installation</h1>
          <p className="text-muted-foreground mb-6">
            Get up and running with TermUI in minutes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-3">Prerequisites</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-primary">▸</span> Node.js 18+ or Bun
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">▸</span> React 18+
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">▸</span> TypeScript 5+
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-3">Create a new project</h2>
          <div className="terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">Terminal</div>
            <pre className="p-4 text-sm">
              <code>
                <span className="text-muted-foreground"># Using npm</span>{"\n"}
                <span className="text-primary">$</span> npx create-termui@latest my-agent{"\n\n"}
                <span className="text-muted-foreground"># Using bun</span>{"\n"}
                <span className="text-primary">$</span> bunx create-termui@latest my-agent{"\n\n"}
                <span className="text-muted-foreground"># Using pnpm</span>{"\n"}
                <span className="text-primary">$</span> pnpm dlx create-termui@latest my-agent
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-3">Add components</h2>
          <div className="terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">Terminal</div>
            <pre className="p-4 text-sm">
              <code>
                <span className="text-primary">$</span> npx termui add box text spinner chat{"\n\n"}
                <span className="text-muted-foreground"># Or add all components</span>{"\n"}
                <span className="text-primary">$</span> npx termui add --all
              </code>
            </pre>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Components are copied directly into your project at <code className="text-terminal-cyan bg-muted px-1 py-0.5 rounded-sm">src/components/</code>. You own the code — customize freely.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-3">Manual installation</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Prefer to add components manually? Just copy the source from the component page.
          </p>
          <div className="terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">Terminal</div>
            <pre className="p-4 text-sm">
              <code>
                <span className="text-primary">$</span> npm install ink react{"\n"}
                <span className="text-primary">$</span> npm install -D @types/react typescript
              </code>
            </pre>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
