import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { faker } from '@faker-js/faker';

// Define types
export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  rating: number;
  image: string;
  createdBy: string;
  createdAt: Date;
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface RecipeState {
  recipes: Recipe[];
  favorites: string[];
  user: User | null;
  isAuthenticated: boolean;
  searchTerm: string;
  activeFilter: string;

  // Authentication actions
  login: (username: string, email: string, password: string) => void;
  signup: (username: string, email: string, password: string) => void;
  logout: () => void;

  // Recipe actions
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdBy' | 'createdAt'>) => void;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;

  // Favorites actions
  toggleFavorite: (recipeId: string) => void;

  // Search actions
  setSearchTerm: (term: string) => void;
  setActiveFilter: (filter: string) => void;
}

// Generate mock recipes
const generateMockRecipes = (): Recipe[] => {
  return Array.from({ length: 12 }, () => ({
    id: faker.string.uuid(),
    title: faker.word.words({ count: { min: 2, max: 5 } }),
    ingredients: Array.from(
      { length: faker.number.int({ min: 4, max: 10 }) },
      () => faker.word.words({ count: { min: 2, max: 5 } })
    ),
    instructions: Array.from(
      { length: faker.number.int({ min: 3, max: 8 }) },
      () => faker.word.words({ count: { min: 10, max: 30 } })
    ),
    cookingTime: faker.number.int({ min: 15, max: 120 }),
    rating: Number(faker.number.float({ min: 1, max: 5, fractionDigits: 1 })),
    image: faker.image.urlLoremFlickr({ category: 'food' }),
    createdBy: 'system',
    createdAt: faker.date.recent(),
  }));
};

// Create store with persistence
export const useRecipeStore = create<RecipeState>()(
  persist(
    (set, get) => ({
      recipes: generateMockRecipes(),
      favorites: [],
      user: null,
      isAuthenticated: false,
      searchTerm: '',
      activeFilter: 'all',

      // Authentication actions
      login: (username, email) => {
        set({
          user: { id: faker.string.uuid(), username, email },
          isAuthenticated: true,
        });
      },

      signup: (username, email) => {
        set({
          user: { id: faker.string.uuid(), username, email },
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      // Recipe actions
      addRecipe: (recipe) => {
        const { user } = get();
        if (!user) return;

        const newRecipe: Recipe = {
          id: faker.string.uuid(),
          ...recipe,
          createdBy: user.id,
          createdAt: new Date(),
        };

        set((state) => ({
          recipes: [newRecipe, ...state.recipes],
        }));
      },

      updateRecipe: (id, recipeUpdate) => {
        set((state) => ({
          recipes: state.recipes.map((recipe) =>
            recipe.id === id ? { ...recipe, ...recipeUpdate } : recipe
          ),
        }));
      },

      deleteRecipe: (id) => {
        set((state) => ({
          recipes: state.recipes.filter((recipe) => recipe.id !== id),
          favorites: state.favorites.filter((favId) => favId !== id),
        }));
      },

      // Favorites actions
      toggleFavorite: (recipeId) => {
        set((state) => {
          const isFavorite = state.favorites.includes(recipeId);
          return {
            favorites: isFavorite
              ? state.favorites.filter((id) => id !== recipeId)
              : [...state.favorites, recipeId],
          };
        });
      },

      // Search actions
      setSearchTerm: (term) => {
        set({ searchTerm: term });
      },

      setActiveFilter: (filter) => {
        set({ activeFilter: filter });
      },
    }),
    {
      name: 'recipe-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
