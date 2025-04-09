
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sun, Calendar, Home } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export interface ProjectProps {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  status: "draft" | "in_progress" | "completed";
  energyPotential: number;
  roofArea: number;
  thumbnailUrl?: string;
}

const statusMap = {
  draft: { label: "Rascunho", color: "bg-yellow-100 text-yellow-800" },
  in_progress: { label: "Em andamento", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Concluído", color: "bg-green-100 text-green-800" },
};

const ProjectCard = ({ project }: { project: ProjectProps }) => {
  const { toast } = useToast();

  const handleEditProject = () => {
    toast({
      title: "Editar projeto",
      description: `Editar o projeto ${project.name}`,
    });
  };

  const handleViewProposal = () => {
    toast({
      title: "Ver proposta",
      description: `Visualizar proposta do projeto ${project.name}`,
    });
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div 
        className="h-40 bg-gray-200 relative"
        style={{ 
          backgroundImage: project.thumbnailUrl ? `url(${project.thumbnailUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {!project.thumbnailUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Home className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <Badge 
          className={`absolute top-2 right-2 ${statusMap[project.status].color}`}
        >
          {statusMap[project.status].label}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg truncate">{project.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{project.address}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{project.createdAt}</span>
          </div>
          <div className="flex items-center gap-1">
            <Sun className="w-4 h-4 text-solar-orange" />
            <span>{project.energyPotential} kWh/dia</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-xs text-muted-foreground mb-1">Potencial de geração</div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full solar-gradient"
              style={{ width: `${Math.min(project.energyPotential * 5, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" onClick={handleEditProject}>Editar</Button>
        <Button size="sm" onClick={handleViewProposal}>Ver proposta</Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
