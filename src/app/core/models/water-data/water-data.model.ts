export interface WaterDataForm {
  tempMax: string;
  tempMin: string;
  population: string;
  waterConsumption: string;
  fecha: string; // yyyy-MM
}

export interface RegistrarDataCommand {
  tempMax: number;
  tempMin: number;
  population: number;
  waterConsumption: number;
  fecha: string; // yyyy-MM
}

export interface UpdateDataAquaCommand {
  id: number;
  population: number;
  tempMax: number;
  tempMin: number;
  waterConsumption: number;
}

export interface DeleteDataAquaCommand {
  id: number;
}

export interface WaterDataRecord {
  id: number;
  anio: number;
  mes: number;
  population: number;
  temp_max: number;
  temp_min: number;
  water_consumption: number;
  created_at: string;
}

export interface PagedResult<T> {
  data: T[];
  totalRecords: number;
}

// No API endpoint — keep for UI
export interface PredictionItem {
  mes: string;
  prediccion: number;
  confianza: number;
}

export interface PredictionResult {
  consumo: number;
  mes: string;
  confianza: number;
  items: PredictionItem[];
}

export interface DashboardKPI {
  consumoActual: number;
  prediccionProxima: number;
  mes: string;
  mae: number;
  mse: number;
  r2Score: number;
}
