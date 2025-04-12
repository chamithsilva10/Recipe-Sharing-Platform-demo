import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChefHat, LogIn, LogOut, UserPlus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useRecipeStore } from '@/store/recipeStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LoginDialog } from '@/components/auth/LoginDialog';
import { SignupDialog } from '@/components/auth/SignupDialog';

export function Navigation() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useRecipeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <ChefHat className="h-6 w-6" />
          <span className="hidden sm:inline-block">Flavor Exchange</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:underline">
            Browse Recipes
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/favorites" className="text-sm font-medium hover:underline">
                Favorites
              </Link>
              <Link to="/my-recipes" className="text-sm font-medium hover:underline">
                My Recipes
              </Link>
              <Link to="/create" className="text-sm font-medium hover:underline">
                Create Recipe
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/my-recipes">My Recipes</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/favorites">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Favorites</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/create">Create Recipe</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setLoginOpen(true)}>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button size="sm" onClick={() => setSignupOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Sign up
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
          <nav className="container grid gap-6 p-6">
            <Link to="/" className="text-lg font-medium" onClick={closeMenu}>
              Browse Recipes
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/favorites" className="text-lg font-medium" onClick={closeMenu}>
                  Favorites
                </Link>
                <Link to="/my-recipes" className="text-lg font-medium" onClick={closeMenu}>
                  My Recipes
                </Link>
                <Link to="/create" className="text-lg font-medium" onClick={closeMenu}>
                  Create Recipe
                </Link>
                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <div className="grid gap-4">
                <Button onClick={() => { setLoginOpen(true); closeMenu(); }}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button variant="outline" onClick={() => { setSignupOpen(true); closeMenu(); }}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign up
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}

      <LoginDialog open={loginOpen} setOpen={setLoginOpen} />
      <SignupDialog open={signupOpen} setOpen={setSignupOpen} />
    </header>
  );
}
