import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRecipeStore } from '@/store/recipeStore';

export function SearchBar() {
  const { searchTerm, setSearchTerm } = useRecipeStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="pl-9"
        placeholder="Search recipes by title or ingredient..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}
