
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { toast } from "@/hooks/use-toast";
import { SolarMapConfig, HeatmapData } from "@/types/map";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface SolarHeatMapProps {
  title: string;
  description: string;
}

const SolarHeatMap = ({ title, description }: SolarHeatMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);
  const [tokenError, setTokenError] = useState<string>("");

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Validar o formato do token
    if (!mapboxToken.startsWith("pk.")) {
      setTokenError("O token Mapbox deve ser um token público (começando com 'pk.')");
      return;
    }

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-46.63, -23.55], // São Paulo
        zoom: 10,
      });

      map.current.on('load', () => {
        // Simular dados de potencial solar para São Paulo
        const solarPotentialData = {
          "type": "FeatureCollection",
          "features": generateSolarData()
        };

        if (map.current) {
          map.current.addSource('solar-potential', {
            type: 'geojson',
            data: solarPotentialData
          });

          map.current.addLayer({
            id: 'solar-heat',
            type: 'heatmap',
            source: 'solar-potential',
            paint: {
              // Aumento da intensidade conforme o zoom
              'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 1,
                9, 3
              ],
              // Cores do mapa de calor do azul ao vermelho
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(0, 0, 255, 0)',
                0.2, 'rgba(0, 0, 255, 0.5)',
                0.4, 'rgba(0, 255, 255, 0.7)',
                0.6, 'rgba(0, 255, 0, 0.7)',
                0.8, 'rgba(255, 255, 0, 0.8)',
                1, 'rgba(255, 0, 0, 0.9)'
              ],
              // Raio dos pontos de calor
              'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 2,
                9, 20
              ],
              // Opacidade baseada no zoom
              'heatmap-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7, 1,
                9, 0.7
              ]
            }
          });

          toast({
            title: "Mapa de calor solar carregado",
            description: "Os dados mostram o potencial solar estimado para a região de São Paulo",
          });
        }
      });

      // Adicionar controles de navegação
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Limpar erro se tudo funcionar
      setTokenError("");

    } catch (error) {
      console.error("Erro ao inicializar o mapa:", error);
      setTokenError("Erro ao inicializar o mapa. Verifique se o token da API Mapbox é válido.");
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken]);

  // Função para gerar dados de exemplo de potencial solar
  const generateSolarData = () => {
    const features = [];
    // Centro aproximado de São Paulo
    const centerLat = -23.55;
    const centerLng = -46.63;
    
    // Gerar 1000 pontos simulando intensidade solar
    for (let i = 0; i < 1000; i++) {
      // Gerar pontos em um raio de aproximadamente 15km
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * 0.15;
      const lat = centerLat + radius * Math.cos(angle);
      const lng = centerLng + radius * Math.sin(angle);
      
      // Simular maior potencial solar em algumas regiões
      let intensity = Math.random();
      // Aumentar intensidade em regiões específicas
      if (lat > centerLat && lng < centerLng) {
        intensity *= 1.5; // Nordeste tem mais sol (exemplo)
      }
      
      features.push({
        "type": "Feature",
        "properties": {
          "intensity": Math.min(intensity, 1) // Normalizar para máximo 1
        },
        "geometry": {
          "type": "Point",
          "coordinates": [lng, lat]
        }
      });
    }
    
    return features;
  };

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('mapboxToken') as string;
    
    if (!token) {
      setTokenError("Por favor, insira um token Mapbox");
      return;
    }
    
    if (!token.startsWith("pk.")) {
      setTokenError("O token da API Mapbox deve ser um token público (começando com 'pk.')");
      return;
    }
    
    setMapboxToken(token);
    setShowTokenInput(false);
    localStorage.setItem('mapbox_token', token);
    toast({
      title: "Token aplicado",
      description: "Inicializando o mapa de calor solar",
    });
  };

  const resetToken = () => {
    localStorage.removeItem('mapbox_token');
    setMapboxToken("");
    setShowTokenInput(true);
    setTokenError("");
  };

  // Tentar recuperar token do localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
      setShowTokenInput(false);
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {tokenError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{tokenError}</AlertDescription>
          </Alert>
        )}
        
        {showTokenInput ? (
          <div className="p-4 flex flex-col gap-4">
            <div className="text-sm">
              <p>Para visualizar o mapa de calor solar, você precisa fornecer um token público de API do Mapbox.</p>
              <p className="text-xs text-muted-foreground mt-1">
                Você pode obter um token gratuito em <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mapbox.com</a>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <strong>Importante:</strong> Use apenas tokens públicos (começam com "pk."), não tokens secretos (começam com "sk.").
              </p>
            </div>
            <form onSubmit={handleTokenSubmit} className="flex flex-col gap-2">
              <input 
                type="text" 
                name="mapboxToken" 
                placeholder="Cole seu token público Mapbox aqui (pk.*)" 
                className="border p-2 rounded-md"
                required
              />
              <button 
                type="submit" 
                className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Aplicar Token
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            <div 
              ref={mapContainer} 
              className="h-[300px] w-full rounded-md border border-border/50 bg-background"
              style={{ minHeight: "300px" }}
            />
            <div className="flex justify-end">
              <button 
                onClick={resetToken}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Alterar token do Mapbox
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SolarHeatMap;
