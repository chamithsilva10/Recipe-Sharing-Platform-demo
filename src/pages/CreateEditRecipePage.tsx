import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore, type Recipe } from '@/store/recipeStore';
import { RecipeForm } from '@/components/recipes/RecipeForm';
import { Skeleton } from '@/components/ui/skeleton';

export function CreateEditRecipePage() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const { recipes, isAuthenticated, user } = useRecipeStore();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const isEditMode = Boolean(recipeId);

  useEffect(() => {
    // Redirect to login page if not authenticated
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    if (isEditMode) {
      setLoading(true);

      const foundRecipe = recipes.find((r) => r.id === recipeId);

      setTimeout(() => {
        if (foundRecipe) {
          // Check if user owns the recipe
          if (foundRecipe.createdBy !== user?.id) {
            navigate('/');
            return;
          }

          setRecipe(foundRecipe);
        } else {
          navigate('/');
        }

        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [recipeId, recipes, navigate, isAuthenticated, isEditMode, user]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">
          {isEditMode ? 'Edit Recipe' : 'Create Recipe'}
        </h1>

        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-10 w-full" />
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ) : (
          <RecipeForm
            editMode={isEditMode}
            initialData={recipe ?? undefined}
          />
        )}
      </div>
    </div>
  );
}
