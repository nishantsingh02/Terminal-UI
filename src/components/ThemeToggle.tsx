import { Monitor, Terminal } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={(e) => toggle(e)}
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      title={theme === "light" ? "Switch to terminal mode" : "Switch to light mode"}
    >
      {theme === "light" ? (
        <>
          <Terminal className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Terminal</span>
        </>
      ) : (
        <>
          <Monitor className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Light</span>
        </>
      )}
    </button>
  );
}
