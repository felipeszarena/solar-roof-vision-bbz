
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard, { ProjectProps } from "@/components/ProjectCard";

interface ProjectsListProps {
  projects: ProjectProps[];
}

const ProjectsList = ({ projects }: ProjectsListProps) => {
  return (
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
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="andamento">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects
            .filter((p) => p.status === "in_progress")
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </TabsContent>
      <TabsContent value="concluidos">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects
            .filter((p) => p.status === "completed")
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProjectsList;
