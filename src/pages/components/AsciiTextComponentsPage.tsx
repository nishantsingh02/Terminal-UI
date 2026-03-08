import { useState, useEffect } from "react";
import DocsLayout from "../../components/DocsLayout";
import CodePreview from "../../components/CodePreview";

/* ===== ASCII ART FONTS ===== */

const BLOCK_FONT: Record<string, string[]> = {
  A: ["█▀█", "█▀█", "▀ ▀"],
  B: ["█▀▄", "█▀▄", "▀▀ "],
  C: ["█▀▀", "█  ", "▀▀▀"],
  D: ["█▀▄", "█ █", "▀▀ "],
  E: ["█▀▀", "█▀▀", "▀▀▀"],
  F: ["█▀▀", "█▀ ", "▀  "],
  G: ["█▀▀", "█ █", "▀▀▀"],
  H: ["█ █", "█▀█", "▀ ▀"],
  I: ["▀█▀", " █ ", "▀▀▀"],
  J: ["  █", "  █", "▀▀ "],
  K: ["█ █", "█▀▄", "▀ ▀"],
  L: ["█  ", "█  ", "▀▀▀"],
  M: ["█▄█", "█ █", "▀ ▀"],
  N: ["█▀█", "█ █", "▀ ▀"],
  O: ["█▀█", "█ █", "▀▀▀"],
  P: ["█▀█", "█▀ ", "▀  "],
  Q: ["█▀█", "█ █", "▀▀▄"],
  R: ["█▀█", "█▀▄", "▀ ▀"],
  S: ["█▀▀", "▀▀█", "▀▀▀"],
  T: ["▀█▀", " █ ", " ▀ "],
  U: ["█ █", "█ █", "▀▀▀"],
  V: ["█ █", "█ █", " ▀ "],
  W: ["█ █", "█ █", "█▀█"],
  X: ["█ █", " █ ", "█ █"],
  Y: ["█ █", " █ ", " ▀ "],
  Z: ["▀▀█", " █ ", "█▀▀"],
  " ": ["   ", "   ", "   "],
};

const SHADOW_FONT: Record<string, string[]> = {
  A: ["╔═╗", "╠═╣", "╩ ╩"],
  B: ["╔╗ ", "╠╩╗", "╚═╝"],
  C: ["╔═╗", "║  ", "╚═╝"],
  D: ["╔╦╗", " ║║", "═╩╝"],
  E: ["╔═╗", "║╣ ", "╚═╝"],
  F: ["╔═╗", "╠╣ ", "╚  "],
  G: ["╔═╗", "║ ╦", "╚═╝"],
  H: ["╦ ╦", "╠═╣", "╩ ╩"],
  I: ["╦", "║", "╩"],
  J: [" ╦", " ║", "╚╝"],
  K: ["╦╔═", "╠╩╗", "╩ ╩"],
  L: ["╦  ", "║  ", "╩═╝"],
  M: ["╔╦╗", "║║║", "╩ ╩"],
  N: ["╔╗╔", "║║║", "╝╚╝"],
  O: ["╔═╗", "║ ║", "╚═╝"],
  P: ["╔═╗", "╠═╝", "╩  "],
  Q: ["╔═╗", "║╔╝", "╚╝ "],
  R: ["╦═╗", "╠╦╝", "╩╚═"],
  S: ["╔═╗", "╚═╗", "╚═╝"],
  T: ["╔╦╗", " ║ ", " ╩ "],
  U: ["╦ ╦", "║ ║", "╚═╝"],
  V: ["╦  ╦", "╚╗╔╝", " ╚╝ "],
  W: ["╦ ╦", "║║║", "╚╩╝"],
  X: ["═╗╔═", " ╚╝ ", "═╗╔═"],
  Y: ["╦ ╦", "╚╦╝", " ╩ "],
  Z: ["╔═╗", "╔═╝", "╚══"],
  " ": ["   ", "   ", "   "],
};

const SLIM_FONT: Record<string, string[]> = {
  A: [" ▄ ", "█▀█", "▀ ▀"],
  B: ["█▀▄", "█▀▄", "▀▀ "],
  C: ["▄▀▀", "█  ", " ▀▀"],
  D: ["█▀▄", "█ █", "▀▀ "],
  E: ["█▀▀", "█▀ ", "▀▀▀"],
  F: ["█▀▀", "█▀ ", "▀  "],
  G: ["▄▀▀", "█ █", " ▀▀"],
  H: ["█ █", "█▀█", "▀ ▀"],
  I: ["▀█▀", " █ ", " ▀ "],
  J: [" ▀█", "  █", "▀▀ "],
  K: ["█ █", "█▀▄", "▀ ▀"],
  L: ["█  ", "█  ", "▀▀▀"],
  M: ["█▄█", "█ █", "▀ ▀"],
  N: ["█▀▄", "█ █", "▀ ▀"],
  O: ["▄▀▄", "█ █", " ▀ "],
  P: ["█▀█", "█▀ ", "▀  "],
  Q: ["▄▀▄", "█ █", " ▀▄"],
  R: ["█▀▄", "█▀▄", "▀ ▀"],
  S: ["▄▀▀", " ▀▄", "▀▀ "],
  T: ["▀█▀", " █ ", " ▀ "],
  U: ["█ █", "█ █", " ▀ "],
  V: ["█ █", "▀▄▀", " ▀ "],
  W: ["█ █", "█▄█", "▀ ▀"],
  X: ["▀▄▀", " █ ", "▀▄▀"],
  Y: ["█ █", " █ ", " ▀ "],
  Z: ["▀▀█", " █ ", "█▀▀"],
  " ": ["   ", "   ", "   "],
};

function renderAscii(text: string, font: Record<string, string[]>): string {
  const upper = text.toUpperCase();
  const lines = [0, 1, 2].map((row) =>
    upper
      .split("")
      .map((ch) => (font[ch] || font[" "])[row])
      .join(" ")
  );
  return lines.join("\n");
}

/* ===== PREVIEW COMPONENTS ===== */

function AsciiPreview({ text, font, color }: { text: string; font: Record<string, string[]>; color: string }) {
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">zsh — ascii</span>
      </div>
      <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-xs sm:text-sm overflow-x-auto">
        <pre className={color} style={{ lineHeight: "1.2" }}>
          {renderAscii(text, font)}
        </pre>
      </div>
    </div>
  );
}

function GlitchAsciiPreview() {
  const text = "GLITCH";
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOffset(Math.random() > 0.7 ? Math.floor(Math.random() * 3) - 1 : 0), 150);
    return () => clearInterval(id);
  }, []);
  const lines = renderAscii(text, BLOCK_FONT).split("\n");
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">zsh — glitch</span>
      </div>
      <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-xs sm:text-sm overflow-x-auto">
        <pre style={{ lineHeight: "1.2" }}>
          {lines.map((line, i) => (
            <div key={i} style={{ transform: `translateX(${i === 1 ? offset * 4 : 0}px)` }} className="text-terminal-red">
              {line}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

function TypewriterAsciiPreview() {
  const text = "TERMUI";
  const [len, setLen] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLen((p) => (p >= text.length ? 0 : p + 1)), 400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">zsh — typewriter</span>
      </div>
      <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-xs sm:text-sm overflow-x-auto">
        <pre className="text-terminal-cyan" style={{ lineHeight: "1.2" }}>
          {renderAscii(text.slice(0, len), BLOCK_FONT)}
        </pre>
      </div>
    </div>
  );
}

/* ===== INTERACTIVE PLAYGROUND ===== */

const fontOptions = [
  { label: "Block", font: BLOCK_FONT },
  { label: "Shadow", font: SHADOW_FONT },
  { label: "Slim", font: SLIM_FONT },
];

const colorOptions = [
  { label: "Green", class: "text-primary" },
  { label: "Cyan", class: "text-terminal-cyan" },
  { label: "Amber", class: "text-terminal-amber" },
  { label: "Red", class: "text-terminal-red" },
  { label: "Magenta", class: "text-terminal-magenta" },
  { label: "Blue", class: "text-terminal-blue" },
];

function AsciiPlayground() {
  const [input, setInput] = useState("HELLO");
  const [fontIdx, setFontIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs text-muted-foreground mb-1 block">Text</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 12))}
            maxLength={12}
            placeholder="Type here..."
            className="w-full rounded-md border border-border bg-muted/40 px-3 py-1.5 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Font</label>
          <div className="flex gap-1">
            {fontOptions.map((f, i) => (
              <button
                key={f.label}
                onClick={() => setFontIdx(i)}
                className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                  fontIdx === i
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Color</label>
          <div className="flex gap-1">
            {colorOptions.map((c, i) => (
              <button
                key={c.label}
                onClick={() => setColorIdx(i)}
                className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                  colorIdx === i
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live preview */}
      <div className="terminal-card rounded-md overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
          <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
          <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
          <span className="ml-2 text-xs text-muted-foreground">zsh — playground</span>
        </div>
        <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-xs sm:text-sm overflow-x-auto min-h-[80px]">
          {input ? (
            <pre className={colorOptions[colorIdx].class} style={{ lineHeight: "1.2" }}>
              {renderAscii(input, fontOptions[fontIdx].font)}
            </pre>
          ) : (
            <span className="text-muted-foreground">Type something above...</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===== PAGE ===== */


const components = [
  {
    title: "Block Font",
    id: "block-font",
    preview: <AsciiPreview text="TERMUI" font={BLOCK_FONT} color="text-primary" />,
    code: `// Block-style ASCII art text
const BLOCK_FONT = {
  A: ["█▀█","█▀█","▀ ▀"],
  B: ["█▀▄","█▀▄","▀▀ "],
  // ... full alphabet
};

function AsciiText({ text, font }) {
  const upper = text.toUpperCase();
  const lines = [0,1,2].map(row =>
    upper.split("").map(ch => font[ch][row]).join(" ")
  );
  return <pre>{lines.join("\\n")}</pre>;
}`,
  },
  {
    title: "Shadow Font",
    id: "shadow-font",
    preview: <AsciiPreview text="SHADOW" font={SHADOW_FONT} color="text-terminal-amber" />,
    code: `// Box-drawing ASCII art (╔═╗ style)
const SHADOW_FONT = {
  A: ["╔═╗","╠═╣","╩ ╩"],
  B: ["╔╗ ","╠╩╗","╚═╝"],
  // ... full alphabet
};

<AsciiText text="SHADOW" font={SHADOW_FONT} />`,
  },
  {
    title: "Slim Font",
    id: "slim-font",
    preview: <AsciiPreview text="HELLO" font={SLIM_FONT} color="text-terminal-cyan" />,
    code: `// Slim half-block ASCII art
const SLIM_FONT = {
  A: [" ▄ ","█▀█","▀ ▀"],
  B: ["█▀▄","█▀▄","▀▀ "],
  // ... full alphabet
};

<AsciiText text="HELLO" font={SLIM_FONT} />`,
  },
  {
    title: "Glitch Effect",
    id: "glitch-effect",
    preview: <GlitchAsciiPreview />,
    code: `function GlitchAscii({ text }) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setOffset(Math.random() > 0.7 
        ? Math.floor(Math.random() * 3) - 1 : 0);
    }, 150);
    return () => clearInterval(id);
  }, []);
  const lines = renderAscii(text, BLOCK_FONT).split("\\n");
  return (
    <pre>
      {lines.map((line, i) => (
        <div style={{ transform: \`translateX(\${i===1 ? offset*4 : 0}px)\` }}>
          {line}
        </div>
      ))}
    </pre>
  );
}`,
  },
  {
    title: "Typewriter Reveal",
    id: "typewriter-reveal",
    preview: <TypewriterAsciiPreview />,
    code: `function TypewriterAscii({ text, speed = 400 }) {
  const [len, setLen] = useState(0);
  useEffect(() => {
    const id = setInterval(() => 
      setLen(p => p >= text.length ? 0 : p + 1), speed);
    return () => clearInterval(id);
  }, []);
  return <pre>{renderAscii(text.slice(0, len), BLOCK_FONT)}</pre>;
}`,
  },
];

export default function AsciiTextComponentsPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-1">ASCII Text</h1>
        <p className="text-lg text-muted-foreground mb-6">
          {components.length} ASCII art text components with multiple fonts and effects.
        </p>

        {/* Interactive Playground */}
        <div className="mb-12 rounded-lg border border-primary/20 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live Playground
          </h2>
          <AsciiPlayground />
        </div>

        <h2 className="text-lg font-semibold text-foreground mb-4">All Components</h2>
        <div className="space-y-8">
          {components.map((comp) => (
            <CodePreview key={comp.id} id={comp.id} title={comp.title} code={comp.code} preview={comp.preview} />
          ))}
        </div>
      </div>
    </DocsLayout>
  );
}
