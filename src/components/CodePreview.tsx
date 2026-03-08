import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface CodePreviewProps {
  code: string;
  preview: React.ReactNode;
  title: string;
  id?: string;
}

export default function CodePreview({ code, preview, title, id }: CodePreviewProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast("Copied to clipboard", {
      description: `${title} component code copied.`,
      icon: <Check className="h-4 w-4 text-primary" />,
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id={id} className="terminal-card rounded-md overflow-hidden scroll-mt-20">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab("preview")}
            className={`px-3 py-1 text-xs rounded-sm transition-colors ${
              tab === "preview" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setTab("code")}
            className={`px-3 py-1 text-xs rounded-sm transition-colors ${
              tab === "code" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Code
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? (
              <><Check className="h-3 w-3 text-primary" /> Copied!</>
            ) : (
              <><Copy className="h-3 w-3" /> Copy</>
            )}
          </button>
        </div>
      </div>
      <div className="p-6">
        {tab === "preview" ? (
          <div className="font-mono">{preview}</div>
        ) : (
          <pre className="text-sm text-foreground overflow-x-auto">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
