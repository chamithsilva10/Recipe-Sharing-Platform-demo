import { RecipeCard } from '@/components/recipes/RecipeCard';
import { useRecipeStore } from '@/store/recipeStore';
import { Skeleton } from '@/components/ui/skeleton';

interface RecipeGridProps {
  loading?: boolean;
  filterByUser?: boolean;
  favoritesOnly?: boolean;
}

export function RecipeGrid({ loading = false, filterByUser = false, favoritesOnly = false }: RecipeGridProps) {
  const { recipes, user, favorites, searchTerm, activeFilter } = useRecipeStore();

  // Filter recipes based on search term, user filter, and favorites
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesUserFilter = filterByUser ? user && recipe.createdBy === user.id : true;

    const matchesFavorites = favoritesOnly ? favorites.includes(recipe.id) : true;

    // Handle dietary filters
    const matchesDietary = activeFilter === 'all';

    return matchesSearch && matchesUserFilter && matchesFavorites && matchesDietary;
  });

  // Render loading skeletons if loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="h-full rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="border-t p-3">
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // If no recipes match the filters, show empty state
  if (filteredRecipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <h3 className="text-xl font-medium mb-2">No recipes found</h3>
        <p className="text-muted-foreground max-w-md">
          {favoritesOnly
            ? "You haven't saved any recipes as favorites yet."
            : filterByUser
              ? "You haven't created any recipes yet."
              : "No recipes match your search criteria."}
        </p>
      </div>
    );
  }

  // Render grid of recipe cards
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
