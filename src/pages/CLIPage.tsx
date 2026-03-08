import DocsLayout from "../components/DocsLayout";

export default function CLIPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl space-y-12">
        <section>
          <h1 className="text-3xl font-display font-bold mb-4">CLI</h1>
          <p className="text-muted-foreground mb-6">
            The TermUI CLI helps you scaffold projects and add components — just like Shadcn UI.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Commands</h2>
          <div className="space-y-6">
            {/* init */}
            <div className="terminal-card rounded-md overflow-hidden">
              <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                <code className="text-sm text-primary font-semibold">termui init</code>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs bg-primary/15 text-primary border border-primary/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> stable
                </span>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <p className="text-muted-foreground">Initialize a new TermUI project with the recommended folder structure.</p>
                <pre className="bg-muted rounded-sm p-3 text-xs overflow-x-auto">
{`$ npx termui init

? Project name: my-agent
? Which theme? (dark / light / mono): dark
? Include example app? (Y/n): Y

✔ Created my-agent/
✔ Installed dependencies
✔ Added example app

  cd my-agent && npm start`}
                </pre>
                <div className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Options:</strong>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="py-1.5 pr-4 text-terminal-cyan">--name &lt;name&gt;</td>
                        <td className="py-1.5 text-muted-foreground">Project name</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-1.5 pr-4 text-terminal-cyan">--theme &lt;theme&gt;</td>
                        <td className="py-1.5 text-muted-foreground">Default theme (dark, light, mono)</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-1.5 pr-4 text-terminal-cyan">--no-example</td>
                        <td className="py-1.5 text-muted-foreground">Skip example app</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 pr-4 text-terminal-cyan">--typescript</td>
                        <td className="py-1.5 text-muted-foreground">Use TypeScript (default: true)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* add */}
            <div className="terminal-card rounded-md overflow-hidden">
              <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                <code className="text-sm text-primary font-semibold">termui add</code>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs bg-primary/15 text-primary border border-primary/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> stable
                </span>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <p className="text-muted-foreground">Add individual components to your project. Components are copied into your codebase.</p>
                <pre className="bg-muted rounded-sm p-3 text-xs overflow-x-auto">
{`$ npx termui add box text spinner chat

✔ Added Box → src/components/Box.tsx
✔ Added Text → src/components/Text.tsx
✔ Added Spinner → src/components/Spinner.tsx
✔ Added Chat → src/components/Chat.tsx

4 components added successfully.`}
                </pre>
                <div className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Available components:</strong>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["box", "text", "input", "spinner", "progress", "divider", "card", "table", "badge", "codeblock", "commandlist", "chat", "streaming", "toast", "modal"].map((c) => (
                    <code key={c} className="bg-muted px-2 py-0.5 rounded-sm text-terminal-cyan">{c}</code>
                  ))}
                </div>
              </div>
            </div>

            {/* theme */}
            <div className="terminal-card rounded-md overflow-hidden">
              <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                <code className="text-sm text-primary font-semibold">termui theme</code>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs bg-terminal-amber/15 text-terminal-amber border border-terminal-amber/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-terminal-amber" /> beta
                </span>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <p className="text-muted-foreground">Manage themes for your project.</p>
                <pre className="bg-muted rounded-sm p-3 text-xs overflow-x-auto">
{`$ npx termui theme set light
✔ Theme set to light

$ npx termui theme list
  dark (default)
  light
  mono

$ npx termui theme create my-theme
✔ Created themes/my-theme.ts`}
                </pre>
              </div>
            </div>

            {/* diff */}
            <div className="terminal-card rounded-md overflow-hidden">
              <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                <code className="text-sm text-primary font-semibold">termui diff</code>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs bg-terminal-amber/15 text-terminal-amber border border-terminal-amber/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-terminal-amber" /> beta
                </span>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <p className="text-muted-foreground">Check for updates to components you've installed.</p>
                <pre className="bg-muted rounded-sm p-3 text-xs overflow-x-auto">
{`$ npx termui diff

  Box      ✓ up to date
  Text     ✓ up to date
  Spinner  ⚠ 2 changes available
  Chat     ⚠ 5 changes available`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold mb-4">Publishing Your Own Package</h2>
          <p className="text-sm text-muted-foreground mb-4">
            TermUI components can be bundled and published as an npm package for your team or the community.
          </p>
          <div className="terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">Terminal</div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code>
                <span className="text-muted-foreground"># 1. Build the library</span>{"\n"}
                <span className="text-primary">$</span> npm run build{"\n\n"}
                <span className="text-muted-foreground"># 2. Update package.json with your details</span>{"\n"}
                <span className="text-primary">$</span> npm version patch{"\n\n"}
                <span className="text-muted-foreground"># 3. Publish to npm</span>{"\n"}
                <span className="text-primary">$</span> npm publish --access public{"\n\n"}
                <span className="text-muted-foreground"># Or publish with a scope</span>{"\n"}
                <span className="text-primary">$</span> npm publish --access public --scope=@myorg
              </code>
            </pre>
          </div>
          <div className="mt-4 terminal-card rounded-md overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground">package.json (recommended config)</div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code>{`{
  "name": "my-termui-components",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./components/*": {
      "import": "./dist/components/*.mjs",
      "require": "./dist/components/*.js"
    }
  },
  "sideEffects": false,
  "files": ["dist"],
  "peerDependencies": {
    "ink": "^4.0.0",
    "react": "^18.0.0"
  }
}`}</code>
            </pre>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
