
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            Lovable
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link to="/gigs" className="text-sm font-medium transition-colors hover:text-primary">
              Gigs
            </Link>
            <Link to="/ai-path" className="text-sm font-medium transition-colors hover:text-primary">
              AI Path
            </Link>
            {user && (
              <Link to="/projects" className="text-sm font-medium transition-colors hover:text-primary">
                Projects
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">
                {user.email}
              </span>
              <Button onClick={signOut} variant="outline" size="sm">
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
