import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DashboardKPI, WaterDataRecord, PagedResult } from '../models/water-data/water-data.model';
import { ApiSuccessResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getKPIs(): Observable<DashboardKPI> {
    return this.http
      .get<ApiSuccessResponse<DashboardKPI>>(`${this.apiUrl}/dashboard/kpis`)
      .pipe(map(res => res.data));
  }

  getHistoricalData(pageNumber = 1, pageSize = 100): Observable<PagedResult<WaterDataRecord>> {
    return this.http
      .get<ApiSuccessResponse<PagedResult<WaterDataRecord>>>(`${this.apiUrl}/DataAqua/Paginated`, {
        params: { PageNumber: pageNumber, PageSize: pageSize }
      })
      .pipe(map(res => res.data));
  }
}
