import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Star, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/components" },
  { label: "Examples", href: "/examples" },
];

interface SidebarSection {
  title: string;
  collapsible?: boolean;
  items: { label: string; href: string; badge?: string }[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Architecture", href: "/docs/architecture" },
      { label: "CLI", href: "/docs/cli" },
      { label: "Theming", href: "/docs/theming" },
      { label: "Keyboard Navigation", href: "/docs/keyboard" },
    ],
  },
  {
    title: "Layout",
    collapsible: true,
    items: [
      { label: "Container", href: "/components/layout#container" },
      { label: "Stack", href: "/components/layout#stack" },
      { label: "Inline", href: "/components/layout#inline" },
      { label: "Grid", href: "/components/layout#grid" },
      { label: "SplitPane", href: "/components/layout#splitpane" },
      { label: "Panel", href: "/components/layout#panel" },
      { label: "Tabs", href: "/components/layout#tabs" },
      { label: "Accordion", href: "/components/layout#accordion" },
      { label: "ScrollArea", href: "/components/layout#scrollarea" },
      { label: "Separator", href: "/components/layout#separator" },
      { label: "Center", href: "/components/layout#center" },
    ],
  },
  {
    title: "Text & Display",
    collapsible: true,
    items: [
      { label: "Heading", href: "/components/display#heading" },
      { label: "Text", href: "/components/display#text" },
      { label: "Highlight", href: "/components/display#highlight" },
      { label: "Kbd", href: "/components/display#kbd" },
      { label: "Badge", href: "/components/display#badge" },
      { label: "Timestamp", href: "/components/display#timestamp" },
      { label: "Link", href: "/components/display#link" },
      { label: "MarkdownViewer", href: "/components/display#markdown" },
      { label: "JsonViewer", href: "/components/display#json" },
      { label: "LogLine", href: "/components/display#logline" },
      { label: "AnsiText", href: "/components/display#ansi" },
    ],
  },
  {
    title: "Input",
    collapsible: true,
    items: [
      { label: "TextInput", href: "/components/input#textinput" },
      { label: "PasswordInput", href: "/components/input#password" },
      { label: "Select", href: "/components/input#select" },
      { label: "MultiSelect", href: "/components/input#multiselect" },
      { label: "Checkbox", href: "/components/input#checkbox" },
      { label: "Switch", href: "/components/input#switch" },
      { label: "CommandPalette", href: "/components/input#commandpalette" },
      { label: "PathInput", href: "/components/input#pathinput" },
    ],
  },
  {
    title: "AI Agent",
    collapsible: true,
    items: [
      { label: "AgentChat", href: "/components/agent#agentchat", badge: "new" },
      { label: "ChatBubble", href: "/components/agent#chatbubble" },
      { label: "StreamingText", href: "/components/agent#streaming" },
      { label: "ThinkingIndicator", href: "/components/agent#thinking" },
      { label: "ToolCall", href: "/components/agent#toolcall", badge: "new" },
      { label: "ToolResult", href: "/components/agent#toolresult", badge: "new" },
      { label: "AgentStatus", href: "/components/agent#agentstatus" },
      { label: "AgentTimeline", href: "/components/agent#timeline" },
      { label: "ConversationThread", href: "/components/agent#thread" },
      { label: "MessageActions", href: "/components/agent#actions" },
    ],
  },
  {
    title: "Dev Tools & Logs",
    collapsible: true,
    items: [
      { label: "LogViewer", href: "/components/devtools#logviewer" },
      { label: "TraceViewer", href: "/components/devtools#trace" },
      { label: "EventTimeline", href: "/components/devtools#eventtimeline" },
      { label: "DiffViewer", href: "/components/devtools#diffviewer" },
      { label: "StackTrace", href: "/components/devtools#stacktrace" },
      { label: "RequestViewer", href: "/components/devtools#request" },
    ],
  },
  {
    title: "Status & Feedback",
    collapsible: true,
    items: [
      { label: "Alert", href: "/components/feedback#alert" },
      { label: "Toast", href: "/components/feedback#toast" },
      { label: "Banner", href: "/components/feedback#banner" },
      { label: "EmptyState", href: "/components/feedback#emptystate" },
      { label: "Spinner", href: "/components/feedback#spinner" },
      { label: "Progress", href: "/components/feedback#progress" },
      { label: "StepProgress", href: "/components/feedback#stepprogress" },
      { label: "StatusIndicator", href: "/components/feedback#status" },
      { label: "Modal", href: "/components/feedback#modal" },
    ],
  },
  {
    title: "Data Display",
    collapsible: true,
    items: [
      { label: "Table", href: "/components/data#table" },
      { label: "List", href: "/components/data#list" },
      { label: "TreeView", href: "/components/data#treeview" },
      { label: "FileTree", href: "/components/data#filetree" },
      { label: "KeyValue", href: "/components/data#keyvalue" },
      { label: "StatCard", href: "/components/data#statcard" },
      { label: "Sparkline", href: "/components/data#sparkline" },
    ],
  },
  {
    title: "Code & Developer",
    collapsible: true,
    items: [
      { label: "CodeBlock", href: "/components/code#codeblock" },
      { label: "DiffBlock", href: "/components/code#diffblock" },
      { label: "TerminalOutput", href: "/components/code#terminaloutput" },
      { label: "SyntaxHighlight", href: "/components/code#syntax" },
      { label: "LineNumbers", href: "/components/code#linenumbers" },
    ],
  },
  {
    title: "Navigation",
    collapsible: true,
    items: [
      { label: "Menu", href: "/components/nav#menu" },
      { label: "Breadcrumb", href: "/components/nav#breadcrumb" },
      { label: "CommandMenu", href: "/components/nav#commandmenu" },
      { label: "SearchBar", href: "/components/nav#searchbar" },
    ],
  },
  {
    title: "Streaming",
    collapsible: true,
    items: [
      { label: "StreamingBlock", href: "/components/streaming#block" },
      { label: "TypingAnimation", href: "/components/streaming#typing" },
      { label: "TokenStream", href: "/components/streaming#tokenstream" },
      { label: "StreamingCode", href: "/components/streaming#code" },
      { label: "StreamingMarkdown", href: "/components/streaming#markdown" },
    ],
  },
];

function CollapsibleSection({ section, location, onLinkClick }: { section: SidebarSection; location: ReturnType<typeof useLocation>; onLinkClick: () => void }) {
  const currentPath = location.pathname + location.hash;
  const isActive = section.items.some((item) => currentPath.startsWith(item.href.split("#")[0]) && currentPath.includes(item.href));
  const [open, setOpen] = useState(isActive || !section.collapsible);

  return (
    <div>
      <button
        onClick={() => section.collapsible && setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-medium text-foreground mb-1 hover:text-foreground/80 transition-colors py-1"
      >
        <span>{section.title}</span>
        {section.collapsible && (
          <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "" : "-rotate-90"}`} />
        )}
      </button>
      {open && (
        <ul className="space-y-0.5 mb-4">
          {section.items.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                onClick={onLinkClick}
                className={`flex items-center justify-between px-2 py-1 text-sm rounded-md transition-colors ${
                  currentPath === item.href
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:underline"
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] rounded-full border border-border px-1.5 py-0.5 text-muted-foreground">{item.badge}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <button className="lg:hidden mr-3" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/" className="font-semibold text-foreground tracking-tight mr-6">
            termui
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm transition-colors ${
                  location.pathname.startsWith(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://github.com/nishantsingh02"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <Star className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Star on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <div className="container flex">
        <aside
          className={`fixed inset-y-14 left-0 z-40 w-[220px] border-r border-border bg-background overflow-y-auto transition-transform lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="py-6 pr-4 pl-4 lg:pl-0 space-y-1">
            {sidebarSections.map((section) => (
              <CollapsibleSection
                key={section.title}
                section={section}
                location={location}
                onLinkClick={() => setSidebarOpen(false)}
              />
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0 py-8 lg:pl-8">
          {children}
        </main>
      </div>
    </div>
  );
}
