import { Link } from "react-router-dom";
import { ArrowRight, Star, Twitter, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../components/ThemeToggle";

function TypingText({ text, speed = 40 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span>{displayed}<span className="typing-cursor" /></span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-border"
      >
        <div className="container flex h-14 items-center">
          <button
            className="sm:hidden mr-2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/" className="font-semibold text-foreground tracking-tight">
            termui
          </Link>
          <nav className="hidden sm:flex items-center gap-6 ml-8">
            <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</Link>
            <Link to="/components" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Components</Link>
            <Link to="/examples" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Examples</Link>
          </nav>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
              className="hidden sm:inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <Search className="h-3 w-3" />
              Search...
              <kbd className="ml-2 rounded border border-border bg-muted px-1 py-0.5 text-[10px] font-mono">⌘K</kbd>
            </button>
            <ThemeToggle />
            <a
              href="https://github.com/nishantsingh02/Terminal-UI.git"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <Star className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Star on GitHub</span>
              <span className="sm:hidden">GitHub</span>
            </a>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden overflow-hidden border-t border-border bg-background"
            >
              <div className="container flex flex-col gap-1 py-3">
                <Link to="/docs" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground px-2 py-2 rounded-md hover:bg-accent transition-colors">Docs</Link>
                <Link to="/components" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground px-2 py-2 rounded-md hover:bg-accent transition-colors">Components</Link>
                <Link to="/examples" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground px-2 py-2 rounded-md hover:bg-accent transition-colors">Examples</Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="py-20 md:py-28 lg:py-36"
      >
        <div className="container max-w-[980px]">
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]"
          >
            Build terminal UIs for AI agents.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-4 max-w-[750px] text-lg text-muted-foreground sm:text-xl"
          >
            Beautifully designed components for terminal applications. Copy and paste into your apps. Open source.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex items-center gap-3 mt-8">
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/components"
              className="inline-flex items-center gap-2 border border-border text-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
            >
              Components
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Terminal */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="pb-20"
      >
        <div className="container max-w-[980px]">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-xl opacity-60 pointer-events-none" />
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-b from-primary/10 to-transparent opacity-40 pointer-events-none" />
          <div className="relative rounded-xl border border-border bg-[hsl(var(--card))] shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/60 border-b border-border">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-2">zsh — termui</span>
            </div>
            <div className="bg-[hsl(220,20%,6%)] p-6 font-mono text-sm space-y-3 min-h-[180px]">
              <div>
                <span className="text-green-400">➜</span>{" "}
                <span className="text-blue-400">~/projects</span>{" "}
                <span className="text-[hsl(0,0%,85%)]">npx termui@latest init</span>
              </div>
              <div className="text-[hsl(0,0%,55%)]">
                <TypingText text="◼ Detecting project type... React + TypeScript" speed={25} />
              </div>
              <div className="text-[hsl(0,0%,55%)]">
                <TypingText text="◼ Installing dependencies..." speed={25} />
              </div>
              <div className="text-green-400">
                <TypingText text="✔ Project initialized. Added 4 components." speed={30} />
              </div>
              <div className="mt-1">
                <span className="text-green-400">➜</span>{" "}
                <span className="text-blue-400">~/projects</span>{" "}
                <span className="typing-cursor" />
              </div>
            </div>
          </div>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
        className="border-t border-border py-20"
      >
        <div className="container max-w-[980px]">
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              { title: "75+ Components", desc: "Layout, input, data display, AI agent, streaming, dev tools, and more." },
              { title: "Agent-First", desc: "ToolCall, ToolResult, AgentChat, and streaming response components built in." },
              { title: "Copy & Paste", desc: "Not a dependency. Pick the components you need. Own the code." },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp} transition={{ duration: 0.5 }}>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Get started */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
        className="border-t border-border py-20"
      >
        <div className="container max-w-[980px]">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }} className="text-2xl font-bold tracking-tight">Get started</motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="mt-2 text-muted-foreground">
            Install termui and start building.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mt-6 inline-flex items-center rounded-md border border-border bg-muted/40 px-4 py-2 font-mono text-sm">
            npx termui@latest init
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="border-t border-border bg-muted/30 py-16"
      >
        <div className="container max-w-[980px]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 sm:col-span-1">
              <Link to="/" className="font-semibold text-foreground tracking-tight text-lg">termui</Link>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Beautiful terminal UI components for AI agents. Open source.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link to="/components" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Components</Link></li>
                <li><Link to="/examples" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Examples</Link></li>
                <li><Link to="/docs/cli" className="text-sm text-muted-foreground hover:text-foreground transition-colors">CLI</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/docs/installation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Installation</Link></li>
                <li><Link to="/docs/theming" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Theming</Link></li>
                <li><Link to="/docs/architecture" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Architecture</Link></li>
                <li><Link to="/docs/keyboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Keyboard Nav</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/nishantsingh02" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Star className="h-3.5 w-3.5" /> GitHub
                  </a>
                </li>
                <li>
                  <a href="https://x.com/nishantsingh211" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Twitter className="h-3.5 w-3.5" /> X / Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} termui. Built by{" "}
              <a href="https://nishants.me" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:underline underline-offset-4">
                Nishant Singh
              </a>
            </p>
            <p className="text-xs text-muted-foreground">Open source under MIT License.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
