import { Plaque } from '@/types/plaque';

export const mockPlaques: Plaque[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    storagePath: 'plaques/1.jpg',
    title: 'Turma Pioneiros do Saber',
    course: 'Engenharia Civil',
    year: 2024,
    semester: 1,
    location: {
      building: 'Bloco A',
      floor: '2º Andar',
      description: 'Corredor principal, próximo ao laboratório de materiais',
    },
    createdAt: new Date('2024-06-15'),
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    storagePath: 'plaques/2.jpg',
    title: 'Turma Novos Horizontes',
    course: 'Direito',
    year: 2023,
    semester: 2,
    location: {
      building: 'Bloco B',
      floor: 'Térreo',
      description: 'Hall de entrada da Faculdade de Direito',
    },
    createdAt: new Date('2023-12-10'),
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?w=800&q=80',
    storagePath: 'plaques/3.jpg',
    title: 'Turma Estrelas do Amanhã',
    course: 'Medicina',
    year: 2023,
    semester: 1,
    location: {
      building: 'Hospital Universitário',
      floor: '1º Andar',
      description: 'Ala administrativa',
    },
    createdAt: new Date('2023-07-20'),
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    storagePath: 'plaques/4.jpg',
    title: 'Turma Construtores do Futuro',
    course: 'Arquitetura e Urbanismo',
    year: 2022,
    semester: 2,
    location: {
      building: 'Bloco C',
      floor: '3º Andar',
      description: 'Galeria de projetos',
    },
    createdAt: new Date('2022-12-15'),
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80',
    storagePath: 'plaques/5.jpg',
    title: 'Turma Inovação Contínua',
    course: 'Engenharia de Computação',
    year: 2024,
    semester: 1,
    location: {
      building: 'Bloco D',
      floor: '1º Andar',
      description: 'Próximo ao laboratório de informática',
    },
    createdAt: new Date('2024-06-20'),
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    storagePath: 'plaques/6.jpg',
    title: 'Turma Guardiões da Saúde',
    course: 'Enfermagem',
    year: 2022,
    semester: 1,
    location: {
      building: 'Hospital Universitário',
      floor: 'Térreo',
      description: 'Recepção principal',
    },
    createdAt: new Date('2022-07-10'),
  },
];

export const courses = [
  'Engenharia Civil',
  'Direito',
  'Medicina',
  'Arquitetura e Urbanismo',
  'Engenharia de Computação',
  'Enfermagem',
  'Administração',
  'Psicologia',
];

export const years = [2024, 2023, 2022, 2021, 2020];
