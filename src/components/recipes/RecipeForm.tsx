import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Plus, Minus, Clock } from 'lucide-react';
import { useRecipeStore, type Recipe } from '@/store/recipeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const recipeSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  cookingTime: z.coerce
    .number()
    .min(1, { message: 'Cooking time must be at least 1 minute' }),
  image: z.string().url({ message: 'Please enter a valid image URL' }),
  ingredients: z.array(z.string().min(1, { message: 'Ingredient cannot be empty' })),
  instructions: z.array(z.string().min(1, { message: 'Instruction cannot be empty' })),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

interface RecipeFormProps {
  editMode?: boolean;
  initialData?: Recipe;
}

export function RecipeForm({ editMode = false, initialData }: RecipeFormProps) {
  const navigate = useNavigate();
  const { addRecipe, updateRecipe } = useRecipeStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = editMode && initialData
    ? {
        ...initialData,
      }
    : {
        title: '',
        cookingTime: 30,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        ingredients: [''],
        instructions: [''],
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues,
  });

  const ingredients = watch('ingredients');
  const instructions = watch('instructions');

  const addIngredient = () => {
    setValue('ingredients', [...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setValue('ingredients', newIngredients);
  };

  const addInstruction = () => {
    setValue('instructions', [...instructions, '']);
  };

  const removeInstruction = (index: number) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setValue('instructions', newInstructions);
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setValue('ingredients', newIngredients);
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setValue('instructions', newInstructions);
  };

  const onSubmit = async (data: RecipeFormValues) => {
    setIsSubmitting(true);

    try {
      if (editMode && initialData) {
        updateRecipe(initialData.id, {
          ...data,
          rating: initialData.rating, // Preserve rating when editing
        });
        toast.success('Recipe updated successfully');
      } else {
        addRecipe({
          ...data,
          rating: 0,
        });
        toast.success('Recipe created successfully');
      }

      navigate(-1);
    } catch (error) {
      toast.error(editMode ? 'Failed to update recipe' : 'Failed to create recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Recipe Title</Label>
          <Input
            id="title"
            placeholder="e.g. Chocolate Chip Cookies"
            {...register('title')}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="cookingTime">
              <Clock className="mr-1 inline-block h-4 w-4" />
              Cooking Time (minutes)
            </Label>
            <Input
              id="cookingTime"
              type="number"
              min="1"
              {...register('cookingTime')}
            />
            {errors.cookingTime && (
              <p className="text-sm text-red-500">{errors.cookingTime.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              {...register('image')}
            />
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Ingredients</h3>
              <Button
                type="button"
                className="outline"
                onClick={addIngredient}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Ingredient
              </Button>
            </div>

            {ingredients.map((ingredient, index) => (
              <div key={index} className="mb-4 flex items-start gap-2">
                <Input
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                />
                <Button
                  type="button"
                  className="ghost"
                  disabled={ingredients.length <= 1}
                  onClick={() => removeIngredient(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {errors.ingredients && (
              <p className="text-sm text-red-500">All ingredients must be filled</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Instructions</h3>
              <Button
                type="button"
                onClick={addInstruction}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Step
              </Button>
            </div>

            {instructions.map((instruction, index) => (
              <div key={index} className="mb-4">
                <div className="mb-2 flex items-center">
                  <span className="mr-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                    {index + 1}
                  </span>
                  <Button
                    type="button"
                    disabled={instructions.length <= 1}
                    onClick={() => removeInstruction(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  placeholder={`Step ${index + 1}: Describe what to do...`}
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  className="min-h-24"
                />
              </div>
            ))}
            {errors.instructions && (
              <p className="text-sm text-red-500">All instructions must be filled</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting
            ? editMode ? 'Updating Recipe...' : 'Creating Recipe...'
            : editMode ? 'Update Recipe' : 'Create Recipe'}
        </Button>
        <Button
          type="button"
          className="outline w-full"
          onClick={() => navigate(-1)}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
