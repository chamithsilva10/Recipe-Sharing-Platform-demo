import { useState } from 'react';
import { SearchBar } from '@/components/recipes/SearchBar';
import { RecipeGrid } from '@/components/recipes/RecipeGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRecipeStore } from '@/store/recipeStore';

export function HomePage() {
  const [loading] = useState(false);
  const { setActiveFilter } = useRecipeStore();

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
  };

  return (
    <div className="container py-8">
      <div className="mb-10 flex flex-col items-center space-y-4 text-center">
        <h1 className="text-4xl font-bold">Discover Delicious Recipes</h1>
        <p className="max-w-3xl text-muted-foreground">
          Explore a variety of recipes, find your favorites, and create your own culinary masterpieces.
        </p>
        <div className="w-full max-w-md pt-4">
          <SearchBar />
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={handleFilterChange} className="mb-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="all">All Recipes</TabsTrigger>
          <TabsTrigger value="vegetarian">Vegetarian</TabsTrigger>
          <TabsTrigger value="quick">Quick Meals</TabsTrigger>
          <TabsTrigger value="dessert">Desserts</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="py-4">
            <RecipeGrid loading={loading} />
          </div>
        </TabsContent>
        <TabsContent value="vegetarian">
          <div className="py-4">
            <RecipeGrid loading={loading} />
          </div>
        </TabsContent>
        <TabsContent value="quick">
          <div className="py-4">
            <RecipeGrid loading={loading} />
          </div>
        </TabsContent>
        <TabsContent value="dessert">
          <div className="py-4">
            <RecipeGrid loading={loading} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
