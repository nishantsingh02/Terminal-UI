import { Link } from "react-router-dom";
import { Terminal } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="text-6xl font-display font-bold text-primary terminal-glow">404</div>
        <div className="text-muted-foreground font-mono text-sm">
          <span className="text-terminal-red">Error:</span> Page not found
        </div>
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-4">
          <Terminal className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
