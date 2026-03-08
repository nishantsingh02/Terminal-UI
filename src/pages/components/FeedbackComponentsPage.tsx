import { useState, useEffect } from "react";
import DocsLayout from "../../components/DocsLayout";
import CodePreview from "../../components/CodePreview";
import { Check, X, AlertCircle, Loader2, Info } from "lucide-react";

function AlertPreview() {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 border border-primary/30 bg-primary/5 rounded-sm px-4 py-3">
        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
        <div><div className="text-sm font-medium">Success</div><div className="text-xs text-muted-foreground">All tests passed (42/42)</div></div>
      </div>
      <div className="flex items-start gap-3 border border-terminal-amber/30 bg-terminal-amber/5 rounded-sm px-4 py-3">
        <AlertCircle className="h-4 w-4 text-terminal-amber mt-0.5 flex-shrink-0" />
        <div><div className="text-sm font-medium">Warning</div><div className="text-xs text-muted-foreground">Deprecated API usage detected</div></div>
      </div>
      <div className="flex items-start gap-3 border border-terminal-red/30 bg-terminal-red/5 rounded-sm px-4 py-3">
        <X className="h-4 w-4 text-terminal-red mt-0.5 flex-shrink-0" />
        <div><div className="text-sm font-medium">Error</div><div className="text-xs text-muted-foreground">Build failed with 3 errors</div></div>
      </div>
    </div>
  );
}

function ToastPreview() {
  return (
    <div className="space-y-2">
      {[
        { icon: <Check className="h-3.5 w-3.5 text-primary" />, text: "Saved", cls: "border-primary/30" },
        { icon: <AlertCircle className="h-3.5 w-3.5 text-terminal-amber" />, text: "Rate limit", cls: "border-terminal-amber/30" },
      ].map((t, i) => (
        <div key={i} className={`flex items-center gap-2 border ${t.cls} rounded-sm px-3 py-2 text-xs`}>
          {t.icon} {t.text} <X className="h-3 w-3 text-muted-foreground ml-auto cursor-pointer" />
        </div>
      ))}
    </div>
  );
}

function BannerPreview() {
  return (
    <div className="bg-primary/10 border border-primary/30 rounded-sm px-4 py-2 flex items-center gap-3">
      <Info className="h-4 w-4 text-primary flex-shrink-0" />
      <span className="text-sm">New version available! Run <code className="text-terminal-cyan bg-muted px-1 rounded-sm">npm update</code> to upgrade.</span>
      <X className="h-3.5 w-3.5 text-muted-foreground ml-auto cursor-pointer" />
    </div>
  );
}

function EmptyStatePreview() {
  return (
    <div className="border border-border rounded-sm p-8 text-center">
      <div className="text-2xl mb-2">📭</div>
      <div className="text-sm font-medium mb-1">No conversations yet</div>
      <div className="text-xs text-muted-foreground">Start a new conversation with <code className="text-terminal-cyan">/chat</code></div>
    </div>
  );
}

function SpinnerPreview() {
  const [frame, setFrame] = useState(0);
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  useEffect(() => {
    const i = setInterval(() => setFrame((f) => (f + 1) % frames.length), 80);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm"><span className="text-primary">{frames[frame]}</span> Loading...</div>
      <div className="flex items-center gap-2 text-sm"><Loader2 className="h-4 w-4 animate-spin text-terminal-cyan" /> Compiling...</div>
      <div className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" /> <span className="text-muted-foreground">Done</span></div>
    </div>
  );
}

function ProgressPreview() {
  const [p, setP] = useState(0);
  useEffect(() => { const i = setInterval(() => setP((v) => v >= 100 ? 0 : v + 2), 100); return () => clearInterval(i); }, []);
  const filled = Math.round(p / 2.5);
  return (
    <div className="space-y-3">
      <div>
        <div className="text-xs text-muted-foreground mb-1">Installing packages...</div>
        <div className="text-primary text-sm">[{"█".repeat(filled)}{"░".repeat(40 - filled)}] {p}%</div>
      </div>
      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-100" style={{ width: `${p}%` }} />
      </div>
    </div>
  );
}

function StepProgressPreview() {
  const steps = [
    { label: "Install", status: "done" },
    { label: "Configure", status: "done" },
    { label: "Build", status: "current" },
    { label: "Deploy", status: "pending" },
  ];
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            s.status === "done" ? "bg-primary text-primary-foreground" :
            s.status === "current" ? "border-2 border-primary text-primary" :
            "border border-border text-muted-foreground"
          }`}>
            {s.status === "done" ? "✓" : i + 1}
          </div>
          <span className={`text-xs ${s.status === "current" ? "text-primary" : "text-muted-foreground"}`}>{s.label}</span>
          {i < steps.length - 1 && <span className="text-border">───</span>}
        </div>
      ))}
    </div>
  );
}

function StatusIndicatorPreview() {
  return (
    <div className="space-y-2 text-sm">
      {[
        { label: "API Server", color: "bg-primary", status: "Healthy" },
        { label: "Database", color: "bg-primary", status: "Connected" },
        { label: "Cache", color: "bg-terminal-amber", status: "Degraded" },
        { label: "Queue", color: "bg-terminal-red", status: "Down" },
      ].map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <span className={`w-2 h-2 rounded-full ${s.color} ${s.color === "bg-primary" ? "" : "animate-pulse"}`} />
          <span className="w-24 text-muted-foreground">{s.label}</span>
          <span>{s.status}</span>
        </div>
      ))}
    </div>
  );
}

function ModalPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)} className="px-3 py-1.5 text-xs bg-secondary rounded-sm hover:bg-secondary/80">Open Modal</button>
      {open && (
        <div className="mt-3 terminal-card rounded-md max-w-xs overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-border">
            <span className="text-sm font-semibold">Confirm</span>
            <button onClick={() => setOpen(false)}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
          </div>
          <div className="p-3 text-sm text-muted-foreground">Deploy to production?</div>
          <div className="flex justify-end gap-2 px-3 py-2 border-t border-border">
            <button onClick={() => setOpen(false)} className="px-2 py-1 text-xs text-muted-foreground">Cancel</button>
            <button onClick={() => setOpen(false)} className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-sm">Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}

const codes: Record<string, string> = {
  alert: `import { Alert } from 'termui';
<Alert variant="success" title="Success">All tests passed</Alert>
<Alert variant="warning">Deprecated API usage</Alert>
<Alert variant="error">Build failed</Alert>`,
  toast: `import { toast } from 'termui';
toast.success("Saved");
toast.warning("Rate limit");
toast.error("Failed");`,
  banner: `import { Banner } from 'termui';
<Banner variant="info" dismissible>
  New version available! Run npm update.
</Banner>`,
  emptystate: `import { EmptyState } from 'termui';
<EmptyState icon="📭" title="No conversations" hint="/chat to start" />`,
  spinner: `import { Spinner } from 'termui';
<Spinner type="dots" label="Loading..." />`,
  progress: `import { ProgressBar } from 'termui';
<ProgressBar value={75} label="Installing..." />`,
  stepprogress: `import { StepProgress } from 'termui';
<StepProgress
  steps={['Install', 'Configure', 'Build', 'Deploy']}
  current={2}
/>`,
  status: `import { StatusIndicator } from 'termui';
<StatusIndicator label="API" status="healthy" />
<StatusIndicator label="Cache" status="degraded" />`,
  modal: `import { Modal } from 'termui';
<Modal title="Confirm" open={open} onClose={close}>
  <Text>Deploy to production?</Text>
  <Button onClick={deploy}>Confirm</Button>
</Modal>`,
};

const components = [
  { id: "alert", title: "Alert", preview: <AlertPreview /> },
  { id: "toast", title: "Toast", preview: <ToastPreview /> },
  { id: "banner", title: "Banner", preview: <BannerPreview /> },
  { id: "emptystate", title: "EmptyState", preview: <EmptyStatePreview /> },
  { id: "spinner", title: "Spinner", preview: <SpinnerPreview /> },
  { id: "progress", title: "Progress", preview: <ProgressPreview /> },
  { id: "stepprogress", title: "StepProgress", preview: <StepProgressPreview /> },
  { id: "status", title: "StatusIndicator", preview: <StatusIndicatorPreview /> },
  { id: "modal", title: "Modal", preview: <ModalPreview /> },
];

export default function FeedbackComponentsPage() {
  return (
    <DocsLayout>
      <div className="max-w-4xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-primary/15 text-primary border border-primary/30 mb-3">
            9 components
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Status & Feedback</h1>
          <p className="text-muted-foreground">Alerts, toasts, progress indicators, and status signals for terminal apps.</p>
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
