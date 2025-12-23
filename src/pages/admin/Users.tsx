import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Trash2, UserCog, Shield } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { AdminUser } from '@/types/plaque';

const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    email: 'admin@universidade.edu.br',
    name: 'Administrador Principal',
    role: 'admin',
    addedBy: 'Sistema',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'editor@universidade.edu.br',
    name: 'Editor de Conteúdo',
    role: 'editor',
    addedBy: 'admin@universidade.edu.br',
    createdAt: new Date('2024-03-15'),
  },
  {
    id: '3',
    email: 'curador@universidade.edu.br',
    name: 'Curador do Arquivo',
    role: 'editor',
    addedBy: 'admin@universidade.edu.br',
    createdAt: new Date('2024-06-01'),
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>(mockAdminUsers);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user?.role === 'admin' && users.filter((u) => u.role === 'admin').length === 1) {
      toast({
        title: 'Operação não permitida',
        description: 'Deve existir pelo menos um administrador.',
        variant: 'destructive',
      });
      return;
    }
    setUsers(users.filter((u) => u.id !== id));
    toast({
      title: 'Usuário removido',
      description: 'O acesso foi revogado com sucesso.',
    });
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newUser: AdminUser = {
      id: Date.now().toString(),
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      role: formData.get('role') as 'admin' | 'editor',
      addedBy: 'admin@universidade.edu.br',
      createdAt: new Date(),
    };

    // Check if email already exists
    if (users.some((u) => u.email === newUser.email)) {
      toast({
        title: 'Erro',
        description: 'Este e-mail já está cadastrado.',
        variant: 'destructive',
      });
      return;
    }

    setUsers([...users, newUser]);
    toast({
      title: 'Usuário adicionado',
      description: 'Novo administrador cadastrado com sucesso.',
    });
    setIsDialogOpen(false);
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
            <h1 className="font-display text-3xl font-bold text-foreground">Usuários</h1>
            <p className="mt-1 text-muted-foreground">
              Gerencie o acesso ao painel administrativo
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="burgundy" className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Adicionar Usuário</DialogTitle>
                <DialogDescription>
                  Conceda acesso ao painel administrativo
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nome completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="usuario@universidade.edu.br"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Função</Label>
                  <Select name="role" defaultValue="editor">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="editor">
                        <div className="flex items-center gap-2">
                          <UserCog className="h-4 w-4" />
                          Editor
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Administrador
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Editores podem gerenciar placas. Administradores podem gerenciar usuários.
                  </p>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="burgundy">
                    Adicionar Usuário
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
              placeholder="Buscar usuários..."
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
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Adicionado por</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === 'admin' ? 'default' : 'secondary'}
                      className={user.role === 'admin' ? 'bg-burgundy hover:bg-burgundy/90' : ''}
                    >
                      {user.role === 'admin' ? (
                        <span className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          Admin
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <UserCog className="h-3 w-3" />
                          Editor
                        </span>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.addedBy}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.createdAt.toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(user.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Info Box */}
        <div className="mt-6 rounded-lg border border-gold/20 bg-gold/5 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Nota:</strong> Apenas usuários listados aqui
            poderão acessar o painel administrativo. Ao remover um usuário, o acesso é
            revogado imediatamente.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminUsers;
