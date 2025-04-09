
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, LayoutDashboard, FileText, MapPin, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { toast } = useToast();
  
  const navItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Projetos", path: "/projects", icon: <MapPin className="w-5 h-5" /> },
    { name: "Propostas", path: "/proposals", icon: <FileText className="w-5 h-5" /> },
    { name: "Configurações", path: "/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const handleNewProject = () => {
    toast({
      title: "Novo projeto",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-white">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <Sun className="h-8 w-8 text-solar-orange animate-spin-slow" />
            <div>
              <h1 className="font-bold text-lg">BBZ Solar</h1>
              <p className="text-xs text-muted-foreground">Solar Roof Map</p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  location.pathname === item.path ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4">
          <Button onClick={handleNewProject} className="w-full" variant="default">
            <Plus className="mr-2 h-4 w-4" /> Novo Projeto
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b bg-white p-4 flex items-center justify-between">
          <div>
            <h1 className="font-semibold">Solar Roof Map</h1>
            <p className="text-sm text-muted-foreground">Mapeamento solar para telhados</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => toast({ title: "Ajuda", description: "Abra o menu de ajuda para encontrar dicas e tutoriais." })}>
              Ajuda
            </Button>
            <div className="h-8 w-8 rounded-full bg-solar-blue flex items-center justify-center text-white font-semibold">
              BB
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
