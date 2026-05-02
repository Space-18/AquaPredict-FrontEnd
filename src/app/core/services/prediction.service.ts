import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredictionResult } from '../models/water-data/water-data.model';
import { ApiSuccessResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PredictionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  generatePrediction(): Observable<PredictionResult> {
    return this.http
      .post<ApiSuccessResponse<PredictionResult>>(`${this.apiUrl}/predictions/generate`, {})
      .pipe(map(res => res.data));
  }

  getPredictions(): Observable<PredictionResult[]> {
    return this.http
      .get<ApiSuccessResponse<PredictionResult[]>>(`${this.apiUrl}/predictions`)
      .pipe(map(res => res.data));
  }
}
