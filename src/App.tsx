import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/pages/HomePage';
import { RecipeDetailPage } from '@/pages/RecipeDetailPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { MyRecipesPage } from '@/pages/MyRecipesPage';
import { CreateEditRecipePage } from '@/pages/CreateEditRecipePage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/my-recipes" element={<MyRecipesPage />} />
              <Route path="/create" element={<CreateEditRecipePage />} />
              <Route path="/edit/:recipeId" element={<CreateEditRecipePage />} />
            </Routes>
          </main>
          <footer className="mt-12 border-t py-6">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Flavor Exchange. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
        <Toaster position="top-center" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
