import DocsLayout from "../../components/DocsLayout";
import CodePreview from "../../components/CodePreview";
import { Star, ArrowRight, Zap, Shield, Globe, CheckCircle2, Clock, TrendingUp } from "lucide-react";

/* ===== CARD PREVIEWS ===== */

function BasicCard() {
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">zsh</span>
      </div>
      <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-sm">
        <div className="border border-[hsl(0,0%,20%)] rounded-md p-4 max-w-xs">
          <div className="text-primary font-bold text-base mb-1">Project Alpha</div>
          <div className="text-[hsl(0,0%,55%)] text-xs mb-3">A next-gen terminal framework for building CLI tools with style.</div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-terminal-amber"><Star className="h-3 w-3" /> 2.4k</span>
            <span className="text-[hsl(0,0%,40%)]">TypeScript</span>
            <span className="text-[hsl(0,0%,40%)]">MIT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard() {
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">zsh</span>
      </div>
      <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-sm">
        <div className="flex gap-3">
          {[
            { label: "Requests", value: "12.4K", change: "+14%", icon: <TrendingUp className="h-3.5 w-3.5" />, color: "text-primary" },
            { label: "Latency", value: "42ms", change: "-8%", icon: <Clock className="h-3.5 w-3.5" />, color: "text-terminal-cyan" },
            { label: "Uptime", value: "99.9%", change: "+0.1%", icon: <CheckCircle2 className="h-3.5 w-3.5" />, color: "text-terminal-amber" },
          ].map((s) => (
            <div key={s.label} className="border border-[hsl(0,0%,20%)] rounded-md p-3 flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[hsl(0,0%,50%)] text-[10px] mb-1">
                <span className={s.color}>{s.icon}</span> {s.label}
              </div>
              <div className="text-[hsl(0,0%,90%)] font-bold text-lg leading-none">{s.value}</div>
              <div className="text-primary text-[10px] mt-1">{s.change}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">zsh</span>
      </div>
      <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-sm">
        <div className="border border-[hsl(0,0%,20%)] rounded-md p-4 max-w-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-terminal-cyan flex items-center justify-center text-[hsl(220,20%,6%)] font-bold text-sm">NS</div>
            <div>
              <div className="text-[hsl(0,0%,90%)] font-bold">Nishant Singh</div>
              <div className="text-[hsl(0,0%,50%)] text-xs">@nishantsingh02</div>
            </div>
          </div>
          <div className="text-[hsl(0,0%,55%)] text-xs mb-3">Building termui — terminal UI components for AI agents.</div>
          <div className="flex gap-4 text-xs text-[hsl(0,0%,50%)]">
            <span><span className="text-[hsl(0,0%,85%)] font-bold">128</span> repos</span>
            <span><span className="text-[hsl(0,0%,85%)] font-bold">2.4k</span> followers</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard() {
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">zsh</span>
      </div>
      <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-sm">
        <div className="grid grid-cols-2 gap-3 max-w-sm">
          {[
            { icon: <Zap className="h-4 w-4" />, title: "Blazing Fast", desc: "< 50ms render", color: "text-terminal-amber" },
            { icon: <Shield className="h-4 w-4" />, title: "Type Safe", desc: "Full TS support", color: "text-primary" },
            { icon: <Globe className="h-4 w-4" />, title: "Cross-Platform", desc: "Works everywhere", color: "text-terminal-cyan" },
            { icon: <Star className="h-4 w-4" />, title: "Open Source", desc: "MIT Licensed", color: "text-terminal-magenta" },
          ].map((f) => (
            <div key={f.title} className="border border-[hsl(0,0%,20%)] rounded-md p-3 hover:border-[hsl(0,0%,30%)] transition-colors">
              <div className={`${f.color} mb-2`}>{f.icon}</div>
              <div className="text-[hsl(0,0%,85%)] text-xs font-bold mb-0.5">{f.title}</div>
              <div className="text-[hsl(0,0%,50%)] text-[10px]">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationCard() {
  return (
    <div className="terminal-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-red opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-80" />
        <span className="ml-2 text-xs text-muted-foreground">zsh</span>
      </div>
      <div className="bg-[hsl(220,20%,6%)] p-5 font-mono text-sm space-y-2 max-w-xs">
        {[
          { type: "success", icon: <CheckCircle2 className="h-3.5 w-3.5" />, msg: "Build completed successfully", time: "2s ago", border: "border-primary/40", text: "text-primary" },
          { type: "warning", icon: <Clock className="h-3.5 w-3.5" />, msg: "Rate limit approaching (85%)", time: "1m ago", border: "border-terminal-amber/40", text: "text-terminal-amber" },
          { type: "info", icon: <ArrowRight className="h-3.5 w-3.5" />, msg: "Deployment started → prod", time: "5m ago", border: "border-terminal-cyan/40", text: "text-terminal-cyan" },
        ].map((n) => (
          <div key={n.msg} className={`border ${n.border} rounded-md px-3 py-2 flex items-start gap-2`}>
            <span className={`${n.text} mt-0.5 flex-shrink-0`}>{n.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="text-[hsl(0,0%,85%)] text-xs">{n.msg}</div>
              <div className="text-[hsl(0,0%,40%)] text-[10px] mt-0.5">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== PAGE ===== */

const components = [
  {
    title: "Project Card",
    id: "project-card",
    preview: <BasicCard />,
    code: `function ProjectCard({ name, desc, stars, lang, license }) {
  return (
    <div className="border rounded-md p-4">
      <div className="font-bold text-base mb-1">{name}</div>
      <div className="text-muted text-xs mb-3">{desc}</div>
      <div className="flex gap-3 text-xs">
        <span>⭐ {stars}</span>
        <span>{lang}</span>
        <span>{license}</span>
      </div>
    </div>
  );
}`,
  },
  {
    title: "Stat Cards",
    id: "stat-cards",
    preview: <StatCard />,
    code: `function StatCard({ label, value, change, icon }) {
  return (
    <div className="border rounded-md p-3">
      <div className="flex items-center gap-1.5 text-xs">
        {icon} {label}
      </div>
      <div className="font-bold text-lg">{value}</div>
      <div className="text-xs text-green-400">{change}</div>
    </div>
  );
}`,
  },
  {
    title: "Profile Card",
    id: "profile-card",
    preview: <ProfileCard />,
    code: `function ProfileCard({ name, handle, bio, repos, followers }) {
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br 
          from-green-400 to-cyan-400 flex items-center justify-center 
          font-bold">{name[0]}</div>
        <div>
          <div className="font-bold">{name}</div>
          <div className="text-xs text-muted">@{handle}</div>
        </div>
      </div>
      <div className="text-xs text-muted mb-3">{bio}</div>
      <div className="flex gap-4 text-xs">
        <span><b>{repos}</b> repos</span>
        <span><b>{followers}</b> followers</span>
      </div>
    </div>
  );
}`,
  },
  {
    title: "Feature Grid",
    id: "feature-grid",
    preview: <FeatureCard />,
    code: `function FeatureGrid({ features }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {features.map(f => (
        <div key={f.title} className="border rounded-md p-3">
          <div className="mb-2">{f.icon}</div>
          <div className="text-xs font-bold mb-0.5">{f.title}</div>
          <div className="text-[10px] text-muted">{f.desc}</div>
        </div>
      ))}
    </div>
  );
}`,
  },
  {
    title: "Notification Stack",
    id: "notification-stack",
    preview: <NotificationCard />,
    code: `function NotificationStack({ notifications }) {
  return (
    <div className="space-y-2">
      {notifications.map(n => (
        <div key={n.msg} className="border rounded-md px-3 py-2 
          flex items-start gap-2">
          <span>{n.icon}</span>
          <div>
            <div className="text-xs">{n.msg}</div>
            <div className="text-[10px] text-muted">{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}`,
  },
];

export default function CardComponentsPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Cards</h1>
        <p className="text-lg text-muted-foreground mb-8">
          {components.length} card components for terminal UIs.
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
