
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Sun } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { toast } = useToast();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <Sun className="h-16 w-16 text-solar-orange animate-spin-slow" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
        <p className="text-xl text-gray-600 mb-8">
          A página que você está procurando não foi encontrada ou foi movida.
        </p>
        <div className="space-y-3">
          <Button 
            className="w-full"
            onClick={() => {
              toast({
                title: "Redirecionando",
                description: "Voltando para o dashboard",
              });
              window.location.href = "/";
            }}
          >
            Voltar ao Dashboard
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              toast({
                title: "Suporte",
                description: "Entre em contato com nosso suporte para ajuda",
              });
            }}
          >
            Contatar Suporte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
