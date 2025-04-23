
import React from "react";
import { pdf } from '@react-pdf/renderer';
import { FileText, Download, Eye, Mail, File } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProposalPDF from "@/components/ProposalPDF";

const proposalsData = [
  {
    id: "1",
    projectName: "Residência Silva",
    client: "João Silva",
    createdAt: "12/04/2025",
    expiresAt: "12/05/2025",
    status: "sent",
    value: "R$ 32.500,00",
    roi: "3.2 anos",
    panels: 12,
  },
  {
    id: "2",
    projectName: "Comércio Flores",
    client: "Maria Flores",
    createdAt: "10/04/2025",
    expiresAt: "10/05/2025",
    status: "approved",
    value: "R$ 45.800,00",
    roi: "2.8 anos",
    panels: 18,
  },
  {
    id: "3",
    projectName: "Sítio Esperança",
    client: "Pedro Almeida",
    createdAt: "08/04/2025",
    expiresAt: "08/05/2025",
    status: "draft",
    value: "R$ 18.200,00",
    roi: "3.5 anos",
    panels: 6,
  },
  {
    id: "4",
    projectName: "Fábrica Continental",
    client: "Continental Ltda",
    createdAt: "05/04/2025",
    expiresAt: "05/05/2025",
    status: "sent",
    value: "R$ 96.400,00",
    roi: "2.4 anos",
    panels: 36,
  },
  {
    id: "5",
    projectName: "Condomínio Parque Verde",
    client: "Condomínio Parque Verde",
    createdAt: "02/04/2025",
    expiresAt: "02/05/2025",
    status: "expired",
    value: "R$ 240.800,00",
    roi: "3.1 anos",
    panels: 96,
  },
];

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  sent: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  expired: "bg-yellow-100 text-yellow-800",
};

const statusLabels = {
  draft: "Rascunho",
  sent: "Enviada",
  approved: "Aprovada",
  rejected: "Rejeitada",
  expired: "Expirada",
};

const ProposalCard = ({ proposal }: { proposal: typeof proposalsData[0] }) => {
  const { toast } = useToast();
  
  const handleViewProposal = () => {
    toast({
      title: "Visualizar proposta",
      description: `Visualizando proposta ${proposal.id}`,
    });
  };
  
  const handleDownload = async () => {
    try {
      toast({
        title: "Gerando PDF",
        description: "Aguarde enquanto geramos o documento...",
      });

      const blob = await pdf(<ProposalPDF proposal={proposal} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `proposta-${proposal.projectName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Download concluído",
        description: "O PDF da proposta foi gerado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar PDF",
        description: "Ocorreu um erro ao gerar o documento. Tente novamente.",
        variant: "destructive",
      });
    }
  };
  
  const handleSend = () => {
    toast({
      title: "Enviar proposta",
      description: "Enviando proposta por email",
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{proposal.projectName}</CardTitle>
            <CardDescription>{proposal.client}</CardDescription>
          </div>
          <Badge className={statusColors[proposal.status as keyof typeof statusColors]}>
            {statusLabels[proposal.status as keyof typeof statusLabels]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>
            <p className="text-muted-foreground">Criado em</p>
            <p>{proposal.createdAt}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Expira em</p>
            <p>{proposal.expiresAt}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Valor total</p>
            <p className="font-semibold">{proposal.value}</p>
          </div>
          <div>
            <p className="text-muted-foreground">ROI estimado</p>
            <p>{proposal.roi}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-solar-blue" />
          <span className="text-sm">
            {proposal.panels} painéis solares
          </span>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2">
        <Button variant="outline" size="sm" onClick={handleViewProposal}>
          <Eye className="mr-1 h-4 w-4" /> Ver
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <File className="mr-1 h-4 w-4" /> PDF
        </Button>
        <Button size="sm" onClick={handleSend} disabled={proposal.status === "draft" || proposal.status === "expired"}>
          <Mail className="mr-1 h-4 w-4" /> Enviar
        </Button>
      </CardFooter>
    </Card>
  );
};

const Proposals = () => {
  const { toast } = useToast();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Propostas</h1>
            <p className="text-muted-foreground">Gerencie e acompanhe suas propostas comerciais.</p>
          </div>
          <div className="w-full sm:w-auto">
            <Button onClick={() => toast({ title: "Nova proposta", description: "Criando nova proposta" })}>
              Nova proposta
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar propostas..." className="pl-8" />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="sent">Enviadas</TabsTrigger>
            <TabsTrigger value="approved">Aprovadas</TabsTrigger>
            <TabsTrigger value="draft">Rascunhos</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {proposalsData.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sent" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {proposalsData
                .filter((proposal) => proposal.status === "sent")
                .map((proposal) => (
                  <ProposalCard key={proposal.id} proposal={proposal} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="approved" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {proposalsData
                .filter((proposal) => proposal.status === "approved")
                .map((proposal) => (
                  <ProposalCard key={proposal.id} proposal={proposal} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="draft" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {proposalsData
                .filter((proposal) => proposal.status === "draft")
                .map((proposal) => (
                  <ProposalCard key={proposal.id} proposal={proposal} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Proposals;
