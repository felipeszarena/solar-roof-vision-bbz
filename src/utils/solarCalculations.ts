
/**
 * Calcula o potencial estimado de energia solar com base na localização e características do telhado
 * @param latitude Latitude da localização
 * @param longitude Longitude da localização
 * @param roofAreaInSqM Área do telhado em metros quadrados
 * @param roofTiltDegrees Inclinação do telhado em graus
 * @param roofOrientation Orientação do telhado em graus (0 = Norte, 90 = Leste, 180 = Sul, 270 = Oeste)
 * @param efficiencyFactor Fator de eficiência dos painéis (padrão: 0.17 ou 17%)
 * @returns Estimativa de produção em kWh/dia
 */
export function calculateSolarPotential(
  latitude: number,
  longitude: number,
  roofAreaInSqM: number,
  roofTiltDegrees: number = 20,
  roofOrientation: number = 180,
  efficiencyFactor: number = 0.17
): number {
  // Valores médios de irradiação solar para diferentes regiões do Brasil (kWh/m²/dia)
  const regionIrradianceMap: Record<string, number> = {
    "norte": 5.2,
    "nordeste": 5.9,
    "centro-oeste": 5.7,
    "sudeste": 5.4,
    "sul": 5.0
  };

  // Determinação simplificada da região com base na latitude e longitude
  let region = "sudeste"; // Padrão
  
  if (latitude < -10) {
    if (longitude < -50) {
      region = "norte";
    } else {
      region = "nordeste";
    }
  } else if (latitude < -20) {
    if (longitude < -52) {
      region = "centro-oeste";
    } else {
      region = "sudeste";
    }
  } else {
    region = "sul";
  }
  
  // Média diária de irradiação solar para a região
  const baseIrradiance = regionIrradianceMap[region];
  
  // Fator de correção para orientação do telhado
  // Telhados voltados para o Norte no hemisfério sul têm o melhor desempenho
  let orientationFactor = 1.0;
  const northernOrientation = 0;
  const orientationDifference = Math.abs(northernOrientation - roofOrientation);
  
  if (orientationDifference > 45 && orientationDifference < 135) {
    orientationFactor = 0.85; // Leste ou Oeste: 15% a menos de eficiência
  } else if (orientationDifference >= 135) {
    orientationFactor = 0.7; // Sul: 30% a menos de eficiência
  }
  
  // Fator de correção para inclinação do telhado
  // A inclinação ideal é aproximadamente igual à latitude
  let tiltFactor = 1.0;
  const idealTilt = Math.abs(latitude);
  const tiltDifference = Math.abs(idealTilt - roofTiltDegrees);
  
  if (tiltDifference > 15) {
    tiltFactor = 0.9; // 10% de perda para inclinações muito diferentes da ideal
  }
  
  // Cálculo final do potencial de geração
  // Ajuste para os fatores ambientais (sombreamento, poeira, etc)
  const environmentalFactor = 0.85;
  
  // Área utilizável do telhado (geralmente 70% da área total pode ser usada para painéis)
  const usableRoofArea = roofAreaInSqM * 0.7;
  
  // Potencial diário em kWh
  const dailyPotential = baseIrradiance * usableRoofArea * efficiencyFactor * 
                         orientationFactor * tiltFactor * environmentalFactor;
  
  return Math.round(dailyPotential * 10) / 10; // Arredonda para 1 casa decimal
}

/**
 * Estima o número de painéis que podem ser instalados em uma determinada área
 * @param areaInSqM Área disponível em metros quadrados
 * @param panelWidthMm Largura do painel em milímetros (padrão: 1000mm)
 * @param panelHeightMm Altura do painel em milímetros (padrão: 1700mm)
 * @returns Número estimado de painéis
 */
export function estimatePanelCount(
  areaInSqM: number,
  panelWidthMm: number = 1000,
  panelHeightMm: number = 1700
): number {
  // Converter dimensões do painel para metros quadrados
  const panelAreaSqM = (panelWidthMm / 1000) * (panelHeightMm / 1000);
  
  // Adicionar espaço para montagem e manutenção (20% extra)
  const panelWithClearanceSqM = panelAreaSqM * 1.2;
  
  // Calcular número máximo de painéis
  // Usando 70% da área total como disponível para painéis
  const usableAreaSqM = areaInSqM * 0.7;
  const panelCount = Math.floor(usableAreaSqM / panelWithClearanceSqM);
  
  return panelCount;
}

/**
 * Calcula o retorno sobre investimento estimado
 * @param dailyProductionKWh Produção diária em kWh
 * @param installationCost Custo total da instalação
 * @param electricityRatePerKWh Taxa de energia elétrica por kWh
 * @returns Tempo de retorno em anos
 */
export function calculateROI(
  dailyProductionKWh: number,
  installationCost: number,
  electricityRatePerKWh: number = 0.85
): number {
  const annualProductionKWh = dailyProductionKWh * 365;
  const annualSavings = annualProductionKWh * electricityRatePerKWh;
  
  const paybackYears = installationCost / annualSavings;
  
  return Math.round(paybackYears * 10) / 10; // Arredonda para 1 casa decimal
}
