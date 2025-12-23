import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import PlaqueCard from './PlaqueCard';
import PlaqueModal from './PlaqueModal';
import { Plaque, FilterOptions } from '@/types/plaque';

interface PlaqueGridProps {
  plaques: Plaque[];
  filters: FilterOptions;
}

const PlaqueGrid = ({ plaques, filters }: PlaqueGridProps) => {
  const [selectedPlaque, setSelectedPlaque] = useState<Plaque | null>(null);

  const filteredPlaques = useMemo(() => {
    return plaques.filter((plaque) => {
      if (filters.course && plaque.course !== filters.course) return false;
      if (filters.year && plaque.year !== filters.year) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesTitle = plaque.title.toLowerCase().includes(searchLower);
        const matchesCourse = plaque.course.toLowerCase().includes(searchLower);
        if (!matchesTitle && !matchesCourse) return false;
      }
      return true;
    });
  }, [plaques, filters]);

  if (filteredPlaques.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-1 flex-col items-center justify-center py-20"
      >
        <div className="rounded-full bg-muted p-6 mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground">
          Nenhuma placa encontrada
        </h3>
        <p className="mt-2 text-muted-foreground text-center max-w-md">
          Tente ajustar os filtros ou realizar uma nova busca para encontrar o que procura.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="flex-1">
        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Exibindo{' '}
            <span className="font-medium text-foreground">{filteredPlaques.length}</span>{' '}
            {filteredPlaques.length === 1 ? 'placa' : 'placas'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredPlaques.map((plaque, index) => (
            <PlaqueCard
              key={plaque.id}
              plaque={plaque}
              index={index}
              onClick={() => setSelectedPlaque(plaque)}
            />
          ))}
        </div>
      </div>

      <PlaqueModal
        plaque={selectedPlaque}
        isOpen={!!selectedPlaque}
        onClose={() => setSelectedPlaque(null)}
      />
    </>
  );
};

export default PlaqueGrid;
