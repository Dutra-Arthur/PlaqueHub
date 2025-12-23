import { useState } from 'react';
import Header from '@/components/public/Header';
import HeroSection from '@/components/public/HeroSection';
import FilterSidebar from '@/components/public/FilterSidebar';
import PlaqueGrid from '@/components/public/PlaqueGrid';
import Footer from '@/components/public/Footer';
import { mockPlaques } from '@/data/mockPlaques';
import { FilterOptions } from '@/types/plaque';

const Index = () => {
  const [filters, setFilters] = useState<FilterOptions>({});

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <HeroSection />
      
      <main className="flex-1">
        <section className="container py-12">
          <div className="flex flex-col gap-8 lg:flex-row">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
            <PlaqueGrid plaques={mockPlaques} filters={filters} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
