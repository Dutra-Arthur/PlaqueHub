import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockPlaques, courses, years } from '@/data/mockPlaques';
import { Plaque } from '@/types/plaque';

const AdminPlaques = () => {
  const [plaques, setPlaques] = useState<Plaque[]>(mockPlaques);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlaque, setEditingPlaque] = useState<Plaque | null>(null);
  const { toast } = useToast();

  const filteredPlaques = plaques.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.course.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setPlaques(plaques.filter((p) => p.id !== id));
    toast({
      title: 'Placa removida',
      description: 'A placa foi removida com sucesso.',
    });
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newPlaque: Plaque = {
      id: editingPlaque?.id || Date.now().toString(),
      imageUrl: formData.get('imageUrl') as string || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
      storagePath: `plaques/${Date.now()}.jpg`,
      title: formData.get('title') as string,
      course: formData.get('course') as string,
      year: parseInt(formData.get('year') as string),
      semester: parseInt(formData.get('semester') as string) as 1 | 2,
      location: {
        building: formData.get('building') as string,
        floor: formData.get('floor') as string,
        description: formData.get('locationDesc') as string,
      },
      createdAt: editingPlaque?.createdAt || new Date(),
    };

    if (editingPlaque) {
      setPlaques(plaques.map((p) => (p.id === editingPlaque.id ? newPlaque : p)));
      toast({ title: 'Placa atualizada', description: 'As alterações foram salvas.' });
    } else {
      setPlaques([newPlaque, ...plaques]);
      toast({ title: 'Placa adicionada', description: 'Nova placa cadastrada com sucesso.' });
    }

    setIsDialogOpen(false);
    setEditingPlaque(null);
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Placas</h1>
            <p className="mt-1 text-muted-foreground">
              Gerencie o catálogo de placas de formatura
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setEditingPlaque(null); }}>
            <DialogTrigger asChild>
              <Button variant="burgundy" className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Placa
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">
                  {editingPlaque ? 'Editar Placa' : 'Adicionar Nova Placa'}
                </DialogTitle>
                <DialogDescription>
                  Preencha os dados da placa de formatura
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Nome da Turma</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingPlaque?.title}
                    placeholder="Ex: Turma Pioneiros do Saber"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Curso</Label>
                    <Select name="course" defaultValue={editingPlaque?.course}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Ano</Label>
                    <Select name="year" defaultValue={editingPlaque?.year?.toString()}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semestre</Label>
                  <Select name="semester" defaultValue={editingPlaque?.semester?.toString()}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1º Semestre</SelectItem>
                      <SelectItem value="2">2º Semestre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">URL da Imagem</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    defaultValue={editingPlaque?.imageUrl}
                    placeholder="https://..."
                  />
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-foreground mb-3">Localização Física</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="building">Prédio</Label>
                      <Input
                        id="building"
                        name="building"
                        defaultValue={editingPlaque?.location.building}
                        placeholder="Ex: Bloco A"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="floor">Andar</Label>
                      <Input
                        id="floor"
                        name="floor"
                        defaultValue={editingPlaque?.location.floor}
                        placeholder="Ex: 2º Andar"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="locationDesc">Descrição da Localização</Label>
                    <Textarea
                      id="locationDesc"
                      name="locationDesc"
                      defaultValue={editingPlaque?.location.description}
                      placeholder="Ex: Corredor principal, próximo ao laboratório"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="burgundy">
                    {editingPlaque ? 'Salvar Alterações' : 'Adicionar Placa'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar placas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Foto</TableHead>
                <TableHead>Nome da Turma</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlaques.map((plaque) => (
                <TableRow key={plaque.id}>
                  <TableCell>
                    <img
                      src={plaque.imageUrl}
                      alt={plaque.title}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{plaque.title}</TableCell>
                  <TableCell>{plaque.course}</TableCell>
                  <TableCell>{plaque.year}/{plaque.semester}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {plaque.location.building}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingPlaque(plaque);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(plaque.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPlaques;
