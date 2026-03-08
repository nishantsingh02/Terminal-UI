import { useState } from "react";
import DocsLayout from "../../components/DocsLayout";
import CodePreview from "../../components/CodePreview";
import { Check, Eye, EyeOff } from "lucide-react";

function TextInputPreview() {
  const [val, setVal] = useState("");
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-primary">❯</span>
        <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Enter project name..." className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1" />
      </div>
      <div className="text-xs text-muted-foreground">? What is your project name?</div>
    </div>
  );
}

function PasswordPreview() {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <span className="text-primary">❯</span>
      <span className="text-xs text-muted-foreground">Password:</span>
      <span className="text-sm">{show ? "my-secret-key" : "•••••••••••••"}</span>
      <button onClick={() => setShow(!show)} className="text-muted-foreground hover:text-foreground">
        {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

function SelectPreview() {
  const [selected, setSelected] = useState(0);
  const options = ["React", "Vue", "Svelte", "Angular"];
  return (
    <div className="border border-border rounded-sm p-3">
      <div className="text-xs text-muted-foreground mb-2">? Select a framework</div>
      <div className="space-y-0.5 text-sm">
        {options.map((o, i) => (
          <div key={o} onClick={() => setSelected(i)} className={`cursor-pointer px-2 py-0.5 rounded-sm ${i === selected ? "text-primary" : "text-muted-foreground"}`}>
            {i === selected ? "❯ " : "  "}{o}
          </div>
        ))}
      </div>
    </div>
  );
}

function MultiSelectPreview() {
  const [checked, setChecked] = useState([0, 2]);
  const options = ["TypeScript", "ESLint", "Prettier", "Vitest"];
  const toggle = (i: number) => setChecked(checked.includes(i) ? checked.filter((c) => c !== i) : [...checked, i]);
  return (
    <div className="border border-border rounded-sm p-3">
      <div className="text-xs text-muted-foreground mb-2">? Select features <span className="text-terminal-dim">(space to toggle)</span></div>
      <div className="space-y-0.5 text-sm">
        {options.map((o, i) => (
          <div key={o} onClick={() => toggle(i)} className="cursor-pointer px-2 py-0.5 text-muted-foreground hover:text-foreground">
            <span className={checked.includes(i) ? "text-primary" : "text-muted-foreground"}>
              {checked.includes(i) ? "◉ " : "○ "}
            </span>
            {o}
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckboxPreview() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <div className="space-y-2 text-sm">
      <div onClick={() => setA(!a)} className="flex items-center gap-2 cursor-pointer">
        <span className={a ? "text-primary" : "text-muted-foreground"}>{a ? "☑" : "☐"}</span>
        <span>Enable dark mode</span>
      </div>
      <div onClick={() => setB(!b)} className="flex items-center gap-2 cursor-pointer">
        <span className={b ? "text-primary" : "text-muted-foreground"}>{b ? "☑" : "☐"}</span>
        <span>Send analytics</span>
      </div>
    </div>
  );
}

function SwitchPreview() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center gap-3 text-sm">
      <button onClick={() => setOn(!on)} className={`w-10 h-5 rounded-full transition-colors relative ${on ? "bg-primary" : "bg-secondary"}`}>
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${on ? "left-5" : "left-0.5"}`} />
      </button>
      <span>{on ? "Enabled" : "Disabled"}</span>
    </div>
  );
}

function CommandPalettePreview() {
  return (
    <div className="terminal-card rounded-md overflow-hidden max-w-sm">
      <div className="px-3 py-2 border-b border-border flex items-center gap-2">
        <span className="text-primary text-sm">⌘</span>
        <span className="text-sm text-muted-foreground">Type a command...</span>
      </div>
      <div className="p-1 space-y-0.5">
        {[
          { label: "Open File", key: "⌘P", active: true },
          { label: "Run Command", key: "⌘⇧P" },
          { label: "Search Files", key: "⌘⇧F" },
          { label: "Toggle Terminal", key: "⌘`" },
        ].map((c) => (
          <div key={c.label} className={`flex items-center justify-between px-3 py-1.5 rounded-sm text-sm ${c.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
            <span>{c.active ? "▸ " : "  "}{c.label}</span>
            <kbd className="text-xs bg-muted px-1.5 py-0.5 rounded-sm">{c.key}</kbd>
          </div>
        ))}
      </div>
    </div>
  );
}

function PathInputPreview() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-primary">❯</span>
      <span className="text-muted-foreground">Path:</span>
      <span className="text-terminal-cyan">~/projects/</span>
      <span className="text-foreground">my-agent</span>
      <span className="text-muted-foreground">/src</span>
    </div>
  );
}

const codes: Record<string, string> = {
  textinput: `import { TextInput } from 'termui';
<TextInput
  label="Project name"
  placeholder="Enter project name..."
  onSubmit={setName}
/>`,
  password: `import { PasswordInput } from 'termui';
<PasswordInput
  label="Password"
  onSubmit={setPassword}
  mask="•"
/>`,
  select: `import { Select } from 'termui';
<Select
  label="Select a framework"
  options={['React', 'Vue', 'Svelte', 'Angular']}
  onSelect={handleSelect}
/>`,
  multiselect: `import { MultiSelect } from 'termui';
<MultiSelect
  label="Select features"
  options={['TypeScript', 'ESLint', 'Prettier', 'Vitest']}
  defaultSelected={[0, 2]}
  onSubmit={handleFeatures}
/>`,
  checkbox: `import { Checkbox } from 'termui';
<Checkbox label="Enable dark mode" checked onChange={toggle} />`,
  switch: `import { Switch } from 'termui';
<Switch label="Enabled" checked={on} onChange={setOn} />`,
  commandpalette: `import { CommandPalette } from 'termui';
<CommandPalette
  commands={[
    { label: 'Open File', key: '⌘P', action: openFile },
    { label: 'Run Command', key: '⌘⇧P', action: runCmd },
  ]}
/>`,
  pathinput: `import { PathInput } from 'termui';
<PathInput
  label="Path"
  basePath="~/projects/"
  onSubmit={setPath}
  autoComplete
/>`,
};

const components = [
  { id: "textinput", title: "TextInput", preview: <TextInputPreview /> },
  { id: "password", title: "PasswordInput", preview: <PasswordPreview /> },
  { id: "select", title: "Select", preview: <SelectPreview /> },
  { id: "multiselect", title: "MultiSelect", preview: <MultiSelectPreview /> },
  { id: "checkbox", title: "Checkbox", preview: <CheckboxPreview /> },
  { id: "switch", title: "Switch", preview: <SwitchPreview /> },
  { id: "commandpalette", title: "CommandPalette", preview: <CommandPalettePreview /> },
  { id: "pathinput", title: "PathInput", preview: <PathInputPreview /> },
];

export default function InputComponentsPage() {
  return (
    <DocsLayout>
      <div className="max-w-4xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-terminal-amber/15 text-terminal-amber border border-terminal-amber/30 mb-3">
            8 components
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Input Components</h1>
          <p className="text-muted-foreground">
            CLI interaction primitives — text inputs, selectors, toggles, and command palettes.
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
