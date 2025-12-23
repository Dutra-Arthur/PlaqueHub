import { motion } from 'framer-motion';
import { History, Target, Users, Heart } from 'lucide-react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

const About = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
                Sobre o <span className="text-primary">Arquivo</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Conheça a história por trás deste projeto de preservação da memória universitária.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="container py-16">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="rounded-xl border border-border bg-card p-8"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <History className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Nossa História
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  O Arquivo Digital de Placas de Formatura nasceu da necessidade de preservar
                  e democratizar o acesso às memórias de gerações de formandos. Cada placa
                  representa não apenas um grupo de estudantes, mas toda uma era da nossa
                  universidade.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="rounded-xl border border-border bg-card p-8"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                  <Target className="h-6 w-6 text-gold" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Nosso Objetivo
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Catalogar, preservar e disponibilizar digitalmente todas as placas de
                  formatura da universidade, permitindo que ex-alunos, estudantes e
                  visitantes possam explorar este rico acervo histórico de qualquer lugar.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="rounded-xl border border-border bg-card p-8"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-burgundy/10">
                  <Users className="h-6 w-6 text-burgundy" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Para Quem
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Este arquivo é destinado a toda comunidade acadêmica: ex-alunos buscando
                  relembrar sua formatura, familiares pesquisando sua história, e
                  pesquisadores interessados na evolução da instituição.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="rounded-xl border border-border bg-card p-8"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Contribua
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Se você possui informações sobre placas que ainda não estão em nosso
                  acervo ou identificou alguma informação incorreta, entre em contato
                  conosco. Sua contribuição é fundamental para manter este arquivo vivo.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
