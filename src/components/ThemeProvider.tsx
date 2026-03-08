import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggle: (e?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("termui-theme") as Theme) || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("termui-theme", theme);
  }, [theme]);

  const toggle = useCallback((e?: React.MouseEvent) => {
    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;

    // Calculate max radius needed to cover the entire screen
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Use View Transitions API if available
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme((t) => (t === "light" ? "dark" : "light"));
      });

      // Set CSS custom properties for the animation origin
      document.documentElement.style.setProperty("--theme-x", `${x}px`);
      document.documentElement.style.setProperty("--theme-y", `${y}px`);
      document.documentElement.style.setProperty("--theme-r", `${maxRadius}px`);
    } else {
      // Fallback: manual clip-path animation
      const root = document.documentElement;
      const nextTheme = theme === "light" ? "dark" : "light";

      // Create overlay
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 99999;
        pointer-events: none;
        background: ${nextTheme === "dark" ? "hsl(220, 20%, 6%)" : "hsl(0, 0%, 100%)"};
        clip-path: circle(0px at ${x}px ${y}px);
        transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      `;
      document.body.appendChild(overlay);

      // Trigger animation
      requestAnimationFrame(() => {
        overlay.style.clipPath = `circle(${maxRadius}px at ${x}px ${y}px)`;
      });

      // Apply theme mid-animation and remove overlay
      setTimeout(() => {
        setTheme(nextTheme);
        setTimeout(() => {
          overlay.remove();
        }, 100);
      }, 350);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
