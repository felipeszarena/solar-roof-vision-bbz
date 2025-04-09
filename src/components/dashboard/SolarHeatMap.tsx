import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SolarHeatMapProps {
  title: string;
  description: string;
}

// Token público do Mapbox fornecido
const MAPBOX_TOKEN = "pk.eyJ1IjoiZmVsaXBlc3phcmVuYSIsImEiOiJjbTlhNjFsZmkwMjFlMndwdmRyZTNkZmEwIn0.-m7Aa9oLnLgygqSHrV6HRg";

const SolarHeatMap = ({ title, description }: SolarHeatMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string>("");
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
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

          setIsMapLoaded(true);
          toast({
            title: "Mapa de calor solar carregado",
            description: "Os dados mostram o potencial solar estimado para a região de São Paulo",
          });
        }
      });

      // Adicionar controles de navegação
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Limpar erro se tudo funcionar
      setMapError("");

    } catch (error) {
      console.error("Erro ao inicializar o mapa:", error);
      setMapError("Erro ao inicializar o mapa. Por favor, atualize a página ou contate o suporte.");
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

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

  const handleReloadMap = () => {
    if (map.current) {
      map.current.remove();
    }
    
    setMapError("");
    setIsMapLoaded(false);
    
    // Reinicializar o mapa no próximo tick
    setTimeout(() => {
      if (!mapContainer.current) return;
      
      try {
        mapboxgl.accessToken = MAPBOX_TOKEN;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/light-v11",
          center: [-46.63, -23.55], // São Paulo
          zoom: 10,
        });
        
        map.current.on('load', () => {
          // Recriar o mapa de calor
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
            
            setIsMapLoaded(true);
            toast({
              title: "Mapa recarregado com sucesso",
              description: "Os dados de potencial solar foram atualizados",
            });
          }
        });
        
        // Adicionar controles de navegação
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
      } catch (error) {
        console.error("Erro ao reinicializar o mapa:", error);
        setMapError("Erro ao recarregar o mapa. Por favor, tente novamente mais tarde.");
      }
    }, 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {mapError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{mapError}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          <div 
            ref={mapContainer} 
            className="h-[300px] w-full rounded-md border border-border/50 bg-background"
            style={{ minHeight: "300px" }}
          />
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={handleReloadMap}
              disabled={!isMapLoaded}
              className="text-sm"
            >
              Recarregar mapa
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolarHeatMap;
