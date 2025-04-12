import { Link } from 'react-router-dom';
import { Clock, Star, Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRecipeStore, type Recipe } from '@/store/recipeStore';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { toggleFavorite, favorites, user } = useRecipeStore();
  const isFavorite = favorites.includes(recipe.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  const formatCookingTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours} hr ${remainingMinutes} min`
      : `${hours} hr`;
  };

  return (
    <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
      <Link to={`/recipe/${recipe.id}`} className="flex h-full flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          {user && (
            <Button
              className={`icon-size absolute right-2 top-2 rounded-full bg-background/80 backdrop-blur-sm ${
                isFavorite ? 'text-red-500' : 'text-muted-foreground'
              }`}
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          )}
        </div>

        <CardContent className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-1 font-medium text-lg">{recipe.title}</h3>

          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>{formatCookingTime(recipe.cookingTime)}</span>
          </div>
        </CardContent>

        <CardFooter className="border-t bg-muted/40 p-3">
          <div className="flex items-center text-sm">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{recipe.rating.toFixed(1)}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
