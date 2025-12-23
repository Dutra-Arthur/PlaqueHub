import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-semibold text-foreground">
                Arquivo de Placas
              </span>
              <span className="text-xs text-muted-foreground">
                Preservando a memória universitária
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Galeria
            </Link>
            <Link
              to="/sobre"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Sobre
            </Link>
            <Link
              to="/admin/login"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Administração
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Universidade. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
