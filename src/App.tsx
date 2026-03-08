import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PageTransition from "./components/PageTransition";
import { ThemeProvider } from "./components/ThemeProvider";
import LandingPage from "./pages/LandingPage";
import CommandPalette from "./components/CommandPalette";
import ComponentsPage from "./pages/ComponentsPage";
import DocsPage from "./pages/DocsPage";
import InstallationPage from "./pages/InstallationPage";
import ExamplesPage from "./pages/ExamplesPage";
import ThemingPage from "./pages/ThemingPage";
import CLIPage from "./pages/CLIPage";
import KeyboardNavPage from "./pages/KeyboardNavPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import LayoutComponentsPage from "./pages/components/LayoutComponentsPage";
import DisplayComponentsPage from "./pages/components/DisplayComponentsPage";
import InputComponentsPage from "./pages/components/InputComponentsPage";
import AgentComponentsPage from "./pages/components/AgentComponentsPage";
import DevToolsComponentsPage from "./pages/components/DevToolsComponentsPage";
import FeedbackComponentsPage from "./pages/components/FeedbackComponentsPage";
import DataComponentsPage from "./pages/components/DataComponentsPage";
import CodeComponentsPage from "./pages/components/CodeComponentsPage";
import NavComponentsPage from "./pages/components/NavComponentsPage";
import StreamingComponentsPage from "./pages/components/StreamingComponentsPage";
import LoaderComponentsPage from "./pages/components/LoaderComponentsPage";
import AsciiTextComponentsPage from "./pages/components/AsciiTextComponentsPage";
import CardComponentsPage from "./pages/components/CardComponentsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/docs/installation" element={<InstallationPage />} />
        <Route path="/docs/architecture" element={<ArchitecturePage />} />
        <Route path="/docs/theming" element={<ThemingPage />} />
        <Route path="/docs/cli" element={<CLIPage />} />
        <Route path="/docs/keyboard" element={<KeyboardNavPage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/components/layout" element={<LayoutComponentsPage />} />
        <Route path="/components/display" element={<DisplayComponentsPage />} />
        <Route path="/components/input" element={<InputComponentsPage />} />
        <Route path="/components/agent" element={<AgentComponentsPage />} />
        <Route path="/components/devtools" element={<DevToolsComponentsPage />} />
        <Route path="/components/feedback" element={<FeedbackComponentsPage />} />
        <Route path="/components/data" element={<DataComponentsPage />} />
        <Route path="/components/code" element={<CodeComponentsPage />} />
        <Route path="/components/nav" element={<NavComponentsPage />} />
        <Route path="/components/streaming" element={<StreamingComponentsPage />} />
        <Route path="/components/loaders" element={<LoaderComponentsPage />} />
        <Route path="/components/ascii" element={<AsciiTextComponentsPage />} />
        <Route path="/components/cards" element={<CardComponentsPage />} />
        <Route path="/examples" element={<ExamplesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CommandPalette />
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
