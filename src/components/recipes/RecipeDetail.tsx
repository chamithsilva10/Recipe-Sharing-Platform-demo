import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Heart, Star, Edit, Trash2, Share2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { type Recipe, useRecipeStore } from '@/store/recipeStore';
import { CookingTimer } from '@/components/recipes/CookingTimer';

interface RecipeDetailProps {
  recipe: Recipe;
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const navigate = useNavigate();
  const { toggleFavorite, favorites, user, deleteRecipe } = useRecipeStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const isFavorite = favorites.includes(recipe.id);
  const isOwner = user && recipe.createdBy === user.id;

  const handleDelete = () => {
    deleteRecipe(recipe.id);
    navigate('/');
  };

  const handleToggleFavorite = () => {
    toggleFavorite(recipe.id);
  };

  const handleShare = () => {
    // This would be a real share implementation in a real app
    // For now, just show a toast message
    alert('Share functionality would open native share dialog or copy link to clipboard');
  };

  const formatCookingTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`
      : `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <Button
          className="btn-ghost mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 md:h-96">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">{recipe.title}</h1>

          <div className="flex items-center gap-2">
            {user && (
              <Button
                className={`btn-outline ${isFavorite ? 'bg-red-500 hover:bg-red-600 text-white' : ''}`}
                onClick={handleToggleFavorite}
              >
                <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Saved' : 'Save'}
              </Button>
            )}

            <Button onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>

            {isOwner && (
              <>
                <Button asChild>
                  <Link to={`/edit/${recipe.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button
                  className="btn-outline text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {formatCookingTime(recipe.cookingTime)}
            {recipe.cookingTime > 0 && (
              <Button
              className="ml-2 h-7 px-2 bg-white hover:bg-gray-100 text-sm text-black"
              onClick={() => setShowTimer(true)}
              >
                Start Timer
              </Button>
            )}
          </div>

          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{recipe.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <h2 className="mb-4 text-2xl font-semibold">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={`ingredient-${index}`} className="flex items-baseline">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="mb-4 text-2xl font-semibold">Instructions</h2>
          <ol className="space-y-6">
            {recipe.instructions.map((instruction, index) => (
              <li key={`instruction-${index}`} className="flex">
                <span className="mr-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                  {index + 1}
                </span>
                <p>{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Recipe</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this recipe? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="btn-outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button className="btn-destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cooking Timer Dialog */}
      {showTimer && (
        <CookingTimer
          time={recipe.cookingTime}
          onClose={() => setShowTimer(false)}
        />
      )}
    </div>
  );
}
