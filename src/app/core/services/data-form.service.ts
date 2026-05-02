import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  RegistrarDataCommand, UpdateDataAquaCommand,
  DeleteDataAquaCommand, WaterDataRecord, PagedResult
} from '../models/water-data/water-data.model';
import { ApiSuccessResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DataFormService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  saveData(data: RegistrarDataCommand): Observable<string> {
    return this.http
      .post<ApiSuccessResponse<string>>(`${this.apiUrl}/DataAqua/RegistrarData`, data)
      .pipe(map(res => res.data));
  }

  getData(pageNumber = 1, pageSize = 20): Observable<PagedResult<WaterDataRecord>> {
    return this.http
      .get<ApiSuccessResponse<PagedResult<WaterDataRecord>>>(`${this.apiUrl}/DataAqua/Paginated`, {
        params: { PageNumber: pageNumber, PageSize: pageSize }
      })
      .pipe(map(res => res.data));
  }

  updateData(data: UpdateDataAquaCommand): Observable<string> {
    return this.http
      .put<ApiSuccessResponse<string>>(`${this.apiUrl}/DataAqua/Actualizar`, data)
      .pipe(map(res => res.data));
  }

  deleteData(id: number): Observable<string> {
    return this.http
      .delete<ApiSuccessResponse<string>>(`${this.apiUrl}/DataAqua/Eliminar`, {
        body: { id } as DeleteDataAquaCommand
      })
      .pipe(map(res => res.data));
  }
}
