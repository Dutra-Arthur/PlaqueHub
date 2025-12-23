import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { courses, years } from '@/data/mockPlaques';
import { FilterOptions } from '@/types/plaque';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const FilterSidebar = ({ filters, onFiltersChange }: FilterSidebarProps) => {
  const hasActiveFilters = filters.course || filters.year || filters.search;

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-soft">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-semibold">Filtros</h2>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          )}
        </div>

        <div className="space-y-5">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-medium">
              Buscar
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Nome da turma..."
                value={filters.search || ''}
                onChange={(e) =>
                  onFiltersChange({ ...filters, search: e.target.value || undefined })
                }
                className="pl-10"
              />
            </div>
          </div>

          {/* Course Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Curso</Label>
            <Select
              value={filters.course || 'all'}
              onValueChange={(value) =>
                onFiltersChange({
                  ...filters,
                  course: value === 'all' ? undefined : value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os cursos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os cursos</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Ano de Conclusão</Label>
            <Select
              value={filters.year?.toString() || 'all'}
              onValueChange={(value) =>
                onFiltersChange({
                  ...filters,
                  year: value === 'all' ? undefined : parseInt(value),
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os anos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os anos</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Count */}
        {hasActiveFilters && (
          <div className="mt-6 rounded-lg bg-primary/5 p-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {[filters.course, filters.year, filters.search].filter(Boolean).length}
              </span>{' '}
              filtro(s) ativo(s)
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default FilterSidebar;
