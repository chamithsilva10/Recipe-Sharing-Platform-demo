import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { SearchBar } from '@/components/recipes/SearchBar';
import { RecipeGrid } from '@/components/recipes/RecipeGrid';
import { useRecipeStore } from '@/store/recipeStore';

export function FavoritesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useRecipeStore();

  useEffect(() => {
    // Redirect to login page if not authenticated
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container py-8">
      <div className="mb-10 flex flex-col items-center space-y-4 text-center">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 fill-red-500 text-red-500" />
          <h1 className="text-4xl font-bold">Your Favorite Recipes</h1>
        </div>
        <p className="max-w-3xl text-muted-foreground">
          All the recipes you've saved for easy access. Try something new today!
        </p>
        <div className="w-full max-w-md pt-4">
          <SearchBar />
        </div>
      </div>

      <RecipeGrid favoritesOnly />
    </div>
  );
}
