import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type Recipe, useRecipeStore } from '@/store/recipeStore';
import { RecipeDetail } from '@/components/recipes/RecipeDetail';
import { Skeleton } from '@/components/ui/skeleton';

export function RecipeDetailPage() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const { recipes } = useRecipeStore();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recipeId) {
      navigate('/');
      return;
    }

    // Simulate API loading
    setLoading(true);

    const foundRecipe = recipes.find((r) => r.id === recipeId);

    setTimeout(() => {
      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        // Redirect if recipe not found
        navigate('/');
      }
      setLoading(false);
    }, 500);
  }, [recipeId, recipes, navigate]);

  if (loading) {
    return (
      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Skeleton className="mb-4 h-10 w-24" />
            <Skeleton className="h-64 w-full sm:h-80 md:h-96" />
          </div>
          <div className="mb-8">
            <Skeleton className="mb-4 h-10 w-3/4" />
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="mt-4 flex gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <Skeleton className="mb-4 h-8 w-32" />
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={`ingredient-skeleton-${i}`} className="h-6 w-full" />
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <Skeleton className="mb-4 h-8 w-32" />
              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={`instruction-skeleton-${i}`} className="flex">
                    <Skeleton className="mr-4 h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className="container py-8">
      <RecipeDetail recipe={recipe} />
    </div>
  );
}
