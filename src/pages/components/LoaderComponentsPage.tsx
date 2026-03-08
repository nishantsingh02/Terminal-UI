import { useState, useEffect } from "react";
import DocsLayout from "../../components/DocsLayout";
import CodePreview from "../../components/CodePreview";

/* ===== LOADER PREVIEWS ===== */

function SpinnerLoader() {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % frames.length), 80);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">zsh</span>
      </div>
      <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-sm space-y-2">
        <div className="text-[hsl(0,0%,85%)]">
          <span className="text-terminal-cyan">{frames[i]}</span> Installing dependencies...
        </div>
      </div>
    </div>
  );
}

function BarLoader() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 2)), 100);
    return () => clearInterval(id);
  }, []);
  const filled = Math.floor(progress / 5);
  const bar = "█".repeat(filled) + "░".repeat(20 - filled);
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">zsh</span>
      </div>
      <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-sm space-y-2">
        <div className="text-[hsl(0,0%,85%)]">Downloading packages...</div>
        <div>
          <span className="text-primary">{bar}</span>{" "}
          <span className="text-muted-foreground">{progress}%</span>
        </div>
      </div>
    </div>
  );
}

function PulseLoader() {
  const dots = ["●∘∘", "∘●∘", "∘∘●"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % dots.length), 300);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">zsh</span>
      </div>
      <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-sm">
        <span className="text-terminal-magenta">{dots[i]}</span>{" "}
        <span className="text-[hsl(0,0%,85%)]">Waiting for response...</span>
      </div>
    </div>
  );
}

function BouncingLoader() {
  const frames = ["[=   ]", "[ =  ]", "[  = ]", "[   =]", "[  = ]", "[ =  ]"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % frames.length), 150);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">zsh</span>
      </div>
      <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-sm">
        <span className="text-terminal-amber">{frames[i]}</span>{" "}
        <span className="text-[hsl(0,0%,85%)]">Compiling project...</span>
      </div>
    </div>
  );
}

function ClockLoader() {
  const clocks = ["🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % clocks.length), 200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">zsh</span>
      </div>
      <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-sm">
        <span>{clocks[i]}</span>{" "}
        <span className="text-[hsl(0,0%,85%)]">Processing tasks...</span>
      </div>
    </div>
  );
}

function MatrixLoader() {
  const chars = "01";
  const [line, setLine] = useState("0101001011010010");
  useEffect(() => {
    const id = setInterval(() => {
      setLine(Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * 2)]).join(""));
    }, 100);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">zsh</span>
      </div>
      <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-sm space-y-1">
        <div className="text-primary/60 tracking-widest">{line}</div>
        <div className="text-[hsl(0,0%,85%)]">Decrypting payload...</div>
      </div>
    </div>
  );
}

/* ===== PAGE ===== */

const components = [
  {
    title: "Spinner",
    id: "spinner",
    preview: <SpinnerLoader />,
    code: `function Spinner({ text = "Loading..." }) {
  const frames = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(p => (p+1) % frames.length), 80);
    return () => clearInterval(id);
  }, []);
  return <div>{frames[i]} {text}</div>;
}`,
  },
  {
    title: "Progress Bar",
    id: "progress-bar",
    preview: <BarLoader />,
    code: `function ProgressBar({ progress = 0 }) {
  const filled = Math.floor(progress / 5);
  const bar = "█".repeat(filled) + "░".repeat(20 - filled);
  return <div>{bar} {progress}%</div>;
}`,
  },
  {
    title: "Pulse Dots",
    id: "pulse-dots",
    preview: <PulseLoader />,
    code: `function PulseDots({ text = "Loading..." }) {
  const dots = ["●∘∘", "∘●∘", "∘∘●"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(p => (p+1) % dots.length), 300);
    return () => clearInterval(id);
  }, []);
  return <div>{dots[i]} {text}</div>;
}`,
  },
  {
    title: "Bouncing Bar",
    id: "bouncing-bar",
    preview: <BouncingLoader />,
    code: `function BouncingBar({ text = "Loading..." }) {
  const frames = ["[=   ]","[ =  ]","[  = ]","[   =]","[  = ]","[ =  ]"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(p => (p+1) % frames.length), 150);
    return () => clearInterval(id);
  }, []);
  return <div>{frames[i]} {text}</div>;
}`,
  },
  {
    title: "Clock Timer",
    id: "clock-timer",
    preview: <ClockLoader />,
    code: `function ClockTimer({ text = "Processing..." }) {
  const clocks = ["🕐","🕑","🕒","🕓","🕔","🕕","🕖","🕗","🕘","🕙","🕚","🕛"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(p => (p+1) % clocks.length), 200);
    return () => clearInterval(id);
  }, []);
  return <div>{clocks[i]} {text}</div>;
}`,
  },
  {
    title: "Matrix Stream",
    id: "matrix-stream",
    preview: <MatrixLoader />,
    code: `function MatrixStream({ text = "Decrypting..." }) {
  const [line, setLine] = useState("0101001011010010");
  useEffect(() => {
    const id = setInterval(() => {
      setLine(Array.from({length:16}, () => 
        "01"[Math.floor(Math.random()*2)]).join(""));
    }, 100);
    return () => clearInterval(id);
  }, []);
  return <div><div>{line}</div><div>{text}</div></div>;
}`,
  },
];

export default function LoaderComponentsPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Terminal Loaders</h1>
        <p className="text-lg text-muted-foreground mb-8">
          {components.length} animated loader components for terminal UIs.
        </p>
        <div className="space-y-8">
          {components.map((comp) => (
            <CodePreview key={comp.id} id={comp.id} title={comp.title} code={comp.code} preview={comp.preview} />
          ))}
        </div>
      </div>
    </DocsLayout>
  );
}
