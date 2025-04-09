
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProjectCard, { ProjectProps } from "@/components/ProjectCard";

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

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs + Projects */}
        <Tabs defaultValue="recentes">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="recentes">Projetos recentes</TabsTrigger>
              <TabsTrigger value="andamento">Em andamento</TabsTrigger>
              <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
            </TabsList>
            <Button variant="ghost" size="sm">
              Ver todos
            </Button>
          </div>
          <TabsContent value="recentes" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="andamento">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentProjects
                .filter((p) => p.status === "in_progress")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="concluidos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentProjects
                .filter((p) => p.status === "completed")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Visualização solar */}
        <Card>
          <CardHeader>
            <CardTitle>Potencial Solar por Região</CardTitle>
            <CardDescription>
              Média de potencial de geração de energia por localização
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Mapa de calor solar será exibido aqui</p>
                <p className="text-xs text-muted-foreground mt-2">Integrações com APIs de mapeamento em desenvolvimento</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
