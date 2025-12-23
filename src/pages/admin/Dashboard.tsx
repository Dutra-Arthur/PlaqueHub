import { motion } from 'framer-motion';
import { Image, Users, Calendar, TrendingUp } from 'lucide-react';
import { mockPlaques } from '@/data/mockPlaques';

const stats = [
  {
    title: 'Total de Placas',
    value: mockPlaques.length,
    icon: Image,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Administradores',
    value: 3,
    icon: Users,
    color: 'text-gold',
    bgColor: 'bg-gold/10',
  },
  {
    title: 'Cursos Registrados',
    value: 6,
    icon: Calendar,
    color: 'text-burgundy',
    bgColor: 'bg-burgundy/10',
  },
  {
    title: 'Visualizações',
    value: '2.4k',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
];

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Bem-vindo ao painel administrativo do Arquivo de Placas
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="rounded-xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex items-center gap-4">
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-full', stat.bgColor)}>
                  <stat.icon className={cn('h-6 w-6', stat.color)} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Placas Recentes
          </h2>
          <div className="space-y-4">
            {mockPlaques.slice(0, 5).map((plaque) => (
              <div
                key={plaque.id}
                className="flex items-center gap-4 rounded-lg border border-border p-4"
              >
                <img
                  src={plaque.imageUrl}
                  alt={plaque.title}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{plaque.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {plaque.course} • {plaque.year}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {plaque.createdAt.toLocaleDateString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default AdminDashboard;
