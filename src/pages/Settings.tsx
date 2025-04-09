
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/Badge";
import { Plus } from "@/components/Plus";

const Settings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram salvas com sucesso.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do sistema.</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="panels">Painéis Solares</TabsTrigger>
            <TabsTrigger value="calculation">Cálculos</TabsTrigger>
            <TabsTrigger value="api">Integrações</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
                <CardDescription>
                  Estas informações serão exibidas em suas propostas e documentos.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nome da Empresa</Label>
                    <Input id="company-name" placeholder="BBZ Solar" defaultValue="BBZ Solar" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-email">Email</Label>
                    <Input id="company-email" placeholder="contato@bbzsolar.com" defaultValue="contato@bbzsolar.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-phone">Telefone</Label>
                    <Input id="company-phone" placeholder="(11) 9876-5432" defaultValue="(11) 9876-5432" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-cnpj">CNPJ</Label>
                    <Input id="company-cnpj" placeholder="00.000.000/0001-00" defaultValue="12.345.678/0001-90" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Endereço</Label>
                  <Input id="company-address" placeholder="Endereço completo" defaultValue="Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
                <CardDescription>
                  Gerencie como você recebe notificações do sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email de notificação</p>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando uma proposta for aprovada
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Lembretes de propostas</p>
                    <p className="text-sm text-muted-foreground">
                      Receba lembretes de propostas prestes a expirar
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Resumo semanal</p>
                    <p className="text-sm text-muted-foreground">
                      Receba um relatório semanal das atividades
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave}>Salvar alterações</Button>
            </div>
          </TabsContent>

          <TabsContent value="panels" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Modelos de Painéis Solares</CardTitle>
                <CardDescription>
                  Configure os modelos de painéis que sua empresa trabalha.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Canadian Solar CS3N-400MS</h3>
                      <Badge variant="outline">Ativo</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Potência</p>
                        <p>400W</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dimensões</p>
                        <p>1765 x 1048 x 40mm</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Eficiência</p>
                        <p>21.6%</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm">Remover</Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Jinko Solar Tiger Neo N-type 455W</h3>
                      <Badge variant="outline">Ativo</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Potência</p>
                        <p>455W</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dimensões</p>
                        <p>1903 x 1134 x 30mm</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Eficiência</p>
                        <p>22.3%</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm">Remover</Button>
                    </div>
                  </div>
                </div>

                <Button className="mt-4" variant="outline">
                  <Plus className="h-4 w-4 mr-2" /> Adicionar modelo
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inversores</CardTitle>
                <CardDescription>
                  Configure os modelos de inversores disponíveis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Configure os modelos de inversores para usar em seus projetos.
                </p>
                <Button onClick={() => toast({ title: "Em desenvolvimento", description: "Esta funcionalidade será implementada em breve" })}>
                  Configurar inversores
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculation" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Parâmetros de Cálculo</CardTitle>
                <CardDescription>
                  Configure os parâmetros usados para calcular o potencial de geração.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="solar-irradiation">Irradiação Solar Padrão (kWh/m²/dia)</Label>
                    <Input id="solar-irradiation" type="number" defaultValue="5.5" />
                    <p className="text-xs text-muted-foreground">
                      Valor médio para ajustar cálculos regionais
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="system-efficiency">Eficiência do Sistema (%)</Label>
                    <Input id="system-efficiency" type="number" defaultValue="85" />
                    <p className="text-xs text-muted-foreground">
                      Eficiência considerando perdas e fatores externos
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price-kwh">Preço médio do kWh (R$)</Label>
                  <Input id="price-kwh" type="number" defaultValue="0.92" step="0.01" />
                  <p className="text-xs text-muted-foreground">
                    Usado para calcular economia e retorno de investimento
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave}>Salvar alterações</Button>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Integrações com APIs</CardTitle>
                <CardDescription>
                  Configure integrações com serviços externos.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Google Maps API</Label>
                  <div className="flex gap-2">
                    <Input type="password" placeholder="Chave da API" defaultValue="••••••••••••••••••••••" className="flex-1" />
                    <Button variant="outline">Verificar</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Usada para mapeamento e localização de imóveis
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>NREL PVWatts API</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Chave da API" defaultValue="" className="flex-1" />
                    <Button variant="outline">Configurar</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Para cálculos avançados de potencial de geração solar
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>NASA Power Data API</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Chave da API" defaultValue="" className="flex-1" />
                    <Button variant="outline">Configurar</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Para dados de irradiação solar por localização
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave}>Salvar alterações</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
