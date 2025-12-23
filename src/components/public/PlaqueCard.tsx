import { motion } from 'framer-motion';
import { Calendar, MapPin, GraduationCap } from 'lucide-react';
import { Plaque } from '@/types/plaque';

interface PlaqueCardProps {
  plaque: Plaque;
  index: number;
  onClick: () => void;
}

const PlaqueCard = ({ plaque, index, onClick }: PlaqueCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all duration-300 group-hover:shadow-hover group-hover:border-gold/30">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={plaque.imageUrl}
            alt={`Placa de formatura: ${plaque.title}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 gradient-overlay opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Semester Badge */}
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-foreground">
              {plaque.semester}º Semestre
            </span>
          </div>
          
          {/* Hover overlay content */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-primary-foreground font-medium">
              Clique para ver detalhes
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-xl font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {plaque.title}
          </h3>
          
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-gold" />
              <span className="line-clamp-1">{plaque.course}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-gold" />
              <span>{plaque.year}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-gold" />
              <span className="line-clamp-1">{plaque.location.building}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default PlaqueCard;
