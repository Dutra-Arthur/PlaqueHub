export interface PlaqueLocation {
  building: string;
  floor: string;
  description: string;
}

export interface Plaque {
  id: string;
  imageUrl: string;
  storagePath: string;
  title: string;
  course: string;
  year: number;
  semester: 1 | 2;
  location: PlaqueLocation;
  createdAt: Date;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  addedBy: string;
  createdAt: Date;
}

export type FilterOptions = {
  course?: string;
  year?: number;
  search?: string;
};
