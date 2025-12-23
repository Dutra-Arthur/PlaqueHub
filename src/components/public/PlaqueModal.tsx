import { X, Calendar, MapPin, GraduationCap, Building, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Plaque } from '@/types/plaque';
import { Button } from '@/components/ui/button';

interface PlaqueModalProps {
  plaque: Plaque | null;
  isOpen: boolean;
  onClose: () => void;
}

const PlaqueModal = ({ plaque, isOpen, onClose }: PlaqueModalProps) => {
  if (!plaque) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-4 z-50 m-auto flex max-h-[90vh] max-w-5xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl md:inset-8"
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
              {/* Image Section */}
              <div className="relative flex-1 bg-muted">
                <Zoom>
                  <img
                    src={plaque.imageUrl}
                    alt={`Placa de formatura: ${plaque.title}`}
                    className="h-full w-full object-contain"
                  />
                </Zoom>
              </div>

              {/* Info Section */}
              <div className="w-full overflow-y-auto border-t border-border p-6 lg:w-96 lg:border-l lg:border-t-0">
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1">
                      <span className="text-xs font-medium text-gold">
                        {plaque.semester}º Semestre de {plaque.year}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      {plaque.title}
                    </h2>
                  </div>

                  {/* Course */}
                  <div className="rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Curso</p>
                        <p className="font-medium text-foreground">{plaque.course}</p>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Ano de Formatura</p>
                        <p className="font-medium text-foreground">{plaque.year}</p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-3">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Localização Física
                    </h3>
                    <div className="rounded-lg border border-gold/20 bg-gold/5 p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-gold" />
                        <div>
                          <p className="text-xs text-muted-foreground">Prédio</p>
                          <p className="text-sm font-medium text-foreground">
                            {plaque.location.building}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Layers className="h-4 w-4 text-gold" />
                        <div>
                          <p className="text-xs text-muted-foreground">Andar</p>
                          <p className="text-sm font-medium text-foreground">
                            {plaque.location.floor}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-gold mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Detalhes</p>
                          <p className="text-sm text-foreground">
                            {plaque.location.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Catalog Date */}
                  <p className="text-xs text-muted-foreground">
                    Catalogada em{' '}
                    {plaque.createdAt.toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlaqueModal;
