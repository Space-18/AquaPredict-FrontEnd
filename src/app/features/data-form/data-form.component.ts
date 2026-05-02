import { Component, OnInit } from '@angular/core';
import { NgClass, DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WaterDataForm, WaterDataRecord, RegistrarDataCommand, UpdateDataAquaCommand } from '../../core/models/water-data/water-data.model';
import * as services from '../../core/services';

@Component({
  selector: 'app-data-form',
  standalone: true,
  imports: [FormsModule, NgClass, DecimalPipe, DatePipe],
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {
  formData: WaterDataForm = this.emptyForm();
  errors: Record<string, string> = {};
  saved = false;

  records: WaterDataRecord[] = [];
  totalRecords = 0;
  pageNumber = 1;
  pageSize = 10;
  loading = false;

  showEditModal = false;
  editingRecord: WaterDataRecord | null = null;
  editFormData = { population: 0, tempMax: 0, tempMin: 0, waterConsumption: 0 };

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalRecords / this.pageSize));
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  constructor(private dataFormService: services.DataFormService,
    private readonly alertService: services.AlertService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.dataFormService.getData(this.pageNumber, this.pageSize).subscribe({
      next: (result) => {
        this.records = result.data;
        this.totalRecords = result.totalRecords;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.pageNumber = page;
    this.loadData();
  }

  onPageSizeChange(size: string): void {
    this.pageSize = +size;
    this.pageNumber = 1;
    this.loadData();
  }

  validate(): boolean {
    this.errors = {};
    const tMax = parseFloat(this.formData.tempMax);
    const tMin = parseFloat(this.formData.tempMin);

    if (!this.formData.fecha) this.errors['fecha'] = 'Campo requerido';

    if (!this.formData.tempMax) this.errors['tempMax'] = 'Campo requerido';
    else if (tMax < 0 || tMax > 50) this.errors['tempMax'] = 'Debe estar entre 0 y 50°C';

    if (!this.formData.tempMin) this.errors['tempMin'] = 'Campo requerido';
    else if (tMin < 0 || tMin > 50) this.errors['tempMin'] = 'Debe estar entre 0 y 50°C';

    if (this.formData.tempMax && this.formData.tempMin && tMin > tMax) {
      this.errors['tempMin'] = 'No puede ser mayor que la temperatura máxima';
    }

    if (!this.formData.population) this.errors['population'] = 'Campo requerido';
    else if (parseFloat(this.formData.population) < 0) this.errors['population'] = 'Debe ser un número positivo';

    if (!this.formData.waterConsumption) this.errors['waterConsumption'] = 'Campo requerido';
    else if (parseFloat(this.formData.waterConsumption) < 0) this.errors['waterConsumption'] = 'Debe ser un número positivo';

    return Object.keys(this.errors).length === 0;
  }

  onSubmit(): void {
    if (!this.validate()) return;

    const command: RegistrarDataCommand = {
      tempMax: parseFloat(this.formData.tempMax),
      tempMin: parseFloat(this.formData.tempMin),
      population: parseInt(this.formData.population, 10),
      waterConsumption: parseFloat(this.formData.waterConsumption),
      fecha: this.formData.fecha
    };

    this.dataFormService.saveData(command).subscribe({
      next: (response) => {
        this.formData = this.emptyForm();
        this.pageNumber = 1;
        this.showSaved();
        this.alertService.success('Éxito', response).then(() => this.loadData());
      },
      error: () => {}
    });
  }

  handleClear(): void {
    this.formData = this.emptyForm();
    this.errors = {};
    this.saved = false;
  }

  handleEditOpen(record: WaterDataRecord): void {
    this.editingRecord = record;
    this.editFormData = {
      population: record.population,
      tempMax: record.temp_max,
      tempMin: record.temp_min,
      waterConsumption: record.water_consumption
    };
    this.showEditModal = true;
  }

  handleEditSave(): void {
    if (!this.editingRecord) return;
    const cmd: UpdateDataAquaCommand = {
      id: this.editingRecord.id,
      population: this.editFormData.population,
      tempMax: this.editFormData.tempMax,
      tempMin: this.editFormData.tempMin,
      waterConsumption: this.editFormData.waterConsumption
    };
    this.dataFormService.updateData(cmd).subscribe({
      next: (response) => {
        this.alertService.success('Éxito', response).then(() => this.loadData());
        this.showEditModal = false;
      },
      error: () => { this.showEditModal = false; }
    });
  }

  handleDelete(id: number): void {
    if (!confirm('¿Está seguro de eliminar este registro?')) return;
    this.dataFormService.deleteData(id).subscribe({
      next: () => this.loadData(),
      error: () => {}
    });
  }

  formatMes(mes: number): string {
    return mes.toString().padStart(2, '0');
  }

  private showSaved(): void {
    this.saved = true;
    setTimeout(() => { this.saved = false; }, 3000);
  }

  private emptyForm(): WaterDataForm {
    return { tempMax: '', tempMin: '', population: '', waterConsumption: '', fecha: '' };
  }
}
