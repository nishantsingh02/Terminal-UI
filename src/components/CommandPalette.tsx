import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, FileText, Layout, Code, Cpu, Zap, Terminal, BarChart3, MessageSquare, Navigation, Eye, Layers, Loader2, Type, CreditCard } from "lucide-react";

interface SearchItem {
  title: string;
  category: string;
  href: string;
  icon: React.ReactNode;
}

const allItems: SearchItem[] = [
  // Pages
  { title: "Documentation", category: "Pages", href: "/docs", icon: <FileText className="h-4 w-4" /> },
  { title: "Installation", category: "Pages", href: "/docs/installation", icon: <FileText className="h-4 w-4" /> },
  { title: "Architecture", category: "Pages", href: "/docs/architecture", icon: <FileText className="h-4 w-4" /> },
  { title: "Theming", category: "Pages", href: "/docs/theming", icon: <FileText className="h-4 w-4" /> },
  { title: "CLI", category: "Pages", href: "/docs/cli", icon: <Terminal className="h-4 w-4" /> },
  { title: "Keyboard Navigation", category: "Pages", href: "/docs/keyboard", icon: <FileText className="h-4 w-4" /> },
  { title: "Examples", category: "Pages", href: "/examples", icon: <FileText className="h-4 w-4" /> },

  // Component categories
  { title: "Terminal Loaders", category: "Components", href: "/components/loaders", icon: <Loader2 className="h-4 w-4" /> },
  { title: "ASCII Text", category: "Components", href: "/components/ascii", icon: <Type className="h-4 w-4" /> },
  { title: "Cards", category: "Components", href: "/components/cards", icon: <CreditCard className="h-4 w-4" /> },
  { title: "AI Agent", category: "Components", href: "/components/agent", icon: <Cpu className="h-4 w-4" /> },
  { title: "Streaming", category: "Components", href: "/components/streaming", icon: <Zap className="h-4 w-4" /> },
  { title: "Code & Developer", category: "Components", href: "/components/code", icon: <Code className="h-4 w-4" /> },
  { title: "Dev Tools & Logs", category: "Components", href: "/components/devtools", icon: <Terminal className="h-4 w-4" /> },
  { title: "Data Display", category: "Components", href: "/components/data", icon: <BarChart3 className="h-4 w-4" /> },
  { title: "Status & Feedback", category: "Components", href: "/components/feedback", icon: <MessageSquare className="h-4 w-4" /> },
  { title: "Input", category: "Components", href: "/components/input", icon: <Layout className="h-4 w-4" /> },
  { title: "Navigation", category: "Components", href: "/components/nav", icon: <Navigation className="h-4 w-4" /> },
  { title: "Text & Display", category: "Components", href: "/components/display", icon: <Eye className="h-4 w-4" /> },
  { title: "Layout", category: "Components", href: "/components/layout", icon: <Layers className="h-4 w-4" /> },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = query
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  // Group by category
  const grouped = filtered.reduce<Record<string, SearchItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});

  const flatFiltered = Object.values(grouped).flat();

  const toggle = useCallback(() => {
    setOpen((o) => !o);
    setQuery("");
    setSelectedIdx(0);
  }, []);

  // ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggle]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  const go = (href: string) => {
    navigate(href);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, flatFiltered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flatFiltered[selectedIdx]) {
      go(flatFiltered[selectedIdx].href);
    }
  };

  if (!open) return null;

  let flatIdx = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />

      {/* Dialog */}
      <div className="relative w-full max-w-lg mx-4 rounded-xl border border-border bg-card shadow-2xl shadow-primary/5 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search components, pages..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[300px] overflow-y-auto p-2">
          {flatFiltered.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">No results found.</div>
          )}
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{category}</div>
              {items.map((item) => {
                const idx = flatIdx++;
                return (
                  <button
                    key={item.href}
                    onClick={() => go(item.href)}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      selectedIdx === idx
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-accent/50"
                    }`}
                  >
                    <span className="text-muted-foreground">{item.icon}</span>
                    <span className="flex-1 text-left">{item.title}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100" />
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono">↑↓</kbd> Navigate</span>
          <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono">↵</kbd> Open</span>
          <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono">Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
