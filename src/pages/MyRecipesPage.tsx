import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/recipes/SearchBar';
import { RecipeGrid } from '@/components/recipes/RecipeGrid';
import { useRecipeStore } from '@/store/recipeStore';

export function MyRecipesPage() {
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
          <ChefHat className="h-6 w-6" />
          <h1 className="text-4xl font-bold">My Recipes</h1>
        </div>
        <p className="max-w-3xl text-muted-foreground">
          Manage your culinary creations. Create, edit, and share your recipes with the world.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button onClick={() => navigate('/create')} className="gap-1">
            <Plus className="h-4 w-4" />
            <span>Create Recipe</span>
          </Button>
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>
      </div>

      <RecipeGrid filterByUser />
    </div>
  );
}
