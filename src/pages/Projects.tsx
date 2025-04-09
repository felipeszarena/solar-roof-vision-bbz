
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, FileDown, Filter, Sun, MapPin, ArrowUpDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const statusColors = {
  draft: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

const statusLabels = {
  draft: "Rascunho",
  in_progress: "Em andamento",
  completed: "Concluído",
};

// Dados de exemplo para exibição
const projectsData = [
  {
    id: "1",
    name: "Residência Silva",
    client: "João Silva",
    address: "Av. Paulista, 123 - São Paulo, SP",
    createdAt: "12/04/2025",
    status: "in_progress",
    energyPotential: 15.7,
    panels: 12,
    area: 32,
  },
  {
    id: "2",
    name: "Comércio Flores",
    client: "Maria Flores",
    address: "Rua Augusta, 456 - São Paulo, SP",
    createdAt: "10/04/2025",
    status: "completed",
    energyPotential: 22.3,
    panels: 18,
    area: 48,
  },
  {
    id: "3",
    name: "Sítio Esperança",
    client: "Pedro Almeida",
    address: "Estrada Rural, km 5 - Campinas, SP",
    createdAt: "08/04/2025",
    status: "draft",
    energyPotential: 8.9,
    panels: 6,
    area: 20,
  },
  {
    id: "4",
    name: "Fábrica Continental",
    client: "Continental Ltda",
    address: "Distrito Industrial - Jundiaí, SP",
    createdAt: "05/04/2025",
    status: "in_progress",
    energyPotential: 45.2,
    panels: 36,
    area: 120,
  },
  {
    id: "5",
    name: "Condomínio Parque Verde",
    client: "Condomínio Parque Verde",
    address: "Av. das Árvores, 1000 - Campinas, SP",
    createdAt: "02/04/2025",
    status: "draft",
    energyPotential: 120.5,
    panels: 96,
    area: 240,
  },
];

const Projects = () => {
  const { toast } = useToast();
  
  const handleCreateProject = () => {
    toast({
      title: "Novo projeto",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exportar dados",
      description: "Exportando lista de projetos para Excel",
    });
  };

  const handleRowClick = (id: string) => {
    toast({
      title: "Visualizar projeto",
      description: `Abrindo projeto #${id}`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Projetos</h1>
            <p className="text-muted-foreground">Gerencie seus projetos de instalação solar.</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button onClick={handleCreateProject}>
              <Plus className="mr-2 h-4 w-4" /> Novo projeto
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <FileDown className="mr-2 h-4 w-4" /> Exportar
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar projetos..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="in_progress">Em andamento</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="recent">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="oldest">Mais antigos</SelectItem>
                <SelectItem value="name">Nome (A-Z)</SelectItem>
                <SelectItem value="energy">Potencial energético</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <div className="flex items-center">
                    Projeto <ArrowUpDown className="ml-2 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" /> Localização
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <Sun className="mr-1 h-4 w-4 text-solar-orange" /> Potencial
                  </div>
                </TableHead>
                <TableHead className="text-center">Painéis</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectsData.map((project) => (
                <TableRow 
                  key={project.id} 
                  onClick={() => handleRowClick(project.id)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="font-medium">
                    {project.name}
                    <div className="text-xs text-muted-foreground">
                      Criado em {project.createdAt}
                    </div>
                  </TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2 max-w-xs truncate">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="truncate">{project.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>{project.energyPotential} kWh/dia</TableCell>
                  <TableCell className="text-center">
                    <div>
                      <div className="font-medium">{project.panels}</div>
                      <div className="text-xs text-muted-foreground">{project.area}m²</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                      {statusLabels[project.status as keyof typeof statusLabels]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
