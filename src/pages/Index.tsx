
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import StatCard from "@/components/dashboard/StatCard";
import ProjectsList from "@/components/dashboard/ProjectsList";
import SolarHeatMap from "@/components/dashboard/SolarHeatMap";
import { ProjectProps } from "@/components/ProjectCard";

const Dashboard = () => {
  // Dados de exemplo para exibição
  const recentProjects: ProjectProps[] = [
    {
      id: "1",
      name: "Residência Silva",
      address: "Av. Paulista, 123 - São Paulo, SP",
      createdAt: "12/04/2025",
      status: "in_progress",
      energyPotential: 15.7,
      roofArea: 32,
    },
    {
      id: "2",
      name: "Comércio Flores",
      address: "Rua Augusta, 456 - São Paulo, SP",
      createdAt: "10/04/2025",
      status: "completed",
      energyPotential: 22.3,
      roofArea: 48,
      thumbnailUrl: "https://images.unsplash.com/photo-1592833167665-ebf29dc47a84?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: "3",
      name: "Sítio Esperança",
      address: "Estrada Rural, km 5 - Campinas, SP",
      createdAt: "08/04/2025",
      status: "draft",
      energyPotential: 8.9,
      roofArea: 20,
    },
    {
      id: "4",
      name: "Fábrica Continental",
      address: "Distrito Industrial - Jundiaí, SP",
      createdAt: "05/04/2025",
      status: "in_progress",
      energyPotential: 45.2,
      roofArea: 120,
      thumbnailUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=500"
    },
  ];

  // Estatísticas de exemplo
  const stats = [
    { title: "Projetos ativos", value: 16, change: "+2 este mês" },
    { title: "Propostas enviadas", value: 24, change: "+5 este mês" },
    { title: "Taxa de conversão", value: "42%", change: "+7% este mês" },
    { title: "Potencial médio", value: "21.3 kWh/dia", change: "por projeto" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Bem-vindo ao BBZ Solar Roof Map.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar projetos..." className="pl-8 w-full md:w-[200px] lg:w-[300px]" />
            </div>
            <Button>Novo projeto</Button>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={i} title={stat.title} value={stat.value} change={stat.change} />
          ))}
        </div>

        {/* Lista de projetos com abas */}
        <ProjectsList projects={recentProjects} />

        {/* Visualização do mapa de calor solar */}
        <SolarHeatMap 
          title="Potencial Solar por Região" 
          description="Média de potencial de geração de energia por localização"
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
