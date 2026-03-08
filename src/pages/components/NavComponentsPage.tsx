import DocsLayout from "../../components/DocsLayout";
import CodePreview from "../../components/CodePreview";
import { ChevronRight, Search } from "lucide-react";

function MenuPreview() {
  return (
    <div className="border border-border rounded-sm w-48">
      {["File", "Edit", "View", "Terminal", "Help"].map((item, i) => (
        <div key={item} className={`flex items-center justify-between px-3 py-1.5 text-sm cursor-default ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
          <span>{i === 0 ? "▸ " : "  "}{item}</span>
          {["File", "View"].includes(item) && <ChevronRight className="h-3 w-3" />}
        </div>
      ))}
    </div>
  );
}

function BreadcrumbPreview() {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <span className="text-muted-foreground hover:text-foreground cursor-pointer">Home</span>
      <span className="text-terminal-dim">/</span>
      <span className="text-muted-foreground hover:text-foreground cursor-pointer">Components</span>
      <span className="text-terminal-dim">/</span>
      <span className="text-foreground">Menu</span>
    </div>
  );
}

function CommandMenuPreview() {
  return (
    <div className="terminal-card rounded-md overflow-hidden max-w-xs">
      <div className="px-3 py-2 border-b border-border flex items-center gap-2">
        <Search className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Search commands...</span>
        <kbd className="ml-auto text-[10px] bg-muted px-1.5 py-0.5 rounded-sm text-muted-foreground">⌘K</kbd>
      </div>
      <div className="p-1">
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider px-3 py-1">Recent</div>
        {["Open file", "Search project", "Run tests"].map((cmd, i) => (
          <div key={cmd} className={`px-3 py-1.5 rounded-sm text-sm ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
            {i === 0 ? "▸ " : "  "}{cmd}
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchBarPreview() {
  return (
    <div className="flex items-center gap-2 border border-border rounded-sm px-3 py-2">
      <Search className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Search components, docs, examples...</span>
      <kbd className="ml-auto text-[10px] bg-muted px-1.5 py-0.5 rounded-sm text-muted-foreground">/</kbd>
    </div>
  );
}

const codes: Record<string, string> = {
  menu: `import { Menu, MenuItem } from 'termui';
<Menu>
  <MenuItem label="File" submenu={fileMenu} />
  <MenuItem label="Edit" />
</Menu>`,
  breadcrumb: `import { Breadcrumb } from 'termui';
<Breadcrumb path={['Home', 'Components', 'Menu']} />`,
  commandmenu: `import { CommandMenu } from 'termui';
<CommandMenu
  trigger="ctrl+k"
  commands={commands}
  onSelect={handleCommand}
/>`,
  searchbar: `import { SearchBar } from 'termui';
<SearchBar
  placeholder="Search..."
  onSearch={handleSearch}
  shortcut="/"
/>`,
};

const components = [
  { id: "menu", title: "Menu", preview: <MenuPreview /> },
  { id: "breadcrumb", title: "Breadcrumb", preview: <BreadcrumbPreview /> },
  { id: "commandmenu", title: "CommandMenu", preview: <CommandMenuPreview /> },
  { id: "searchbar", title: "SearchBar", preview: <SearchBarPreview /> },
];

export default function NavComponentsPage() {
  return (
    <DocsLayout>
      <div className="max-w-4xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-terminal-magenta/15 text-terminal-magenta border border-terminal-magenta/30 mb-3">
            4 components
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Navigation</h1>
          <p className="text-muted-foreground">Menus, breadcrumbs, command palettes, and search for complex CLI apps.</p>
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
