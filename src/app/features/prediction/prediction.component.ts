import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { PredictionItem } from '../../core/models/water-data/water-data.model';
import { PredictionService } from '../../core/services/prediction.service';

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [NgClass],
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent {
  isGenerating = false;
  showResults = false;

  predictionData: PredictionItem[] = [
    { mes: 'Jul', prediccion: 53500, confianza: 92 },
    { mes: 'Ago', prediccion: 54200, confianza: 89 },
    { mes: 'Sep', prediccion: 52800, confianza: 87 },
    { mes: 'Oct', prediccion: 51500, confianza: 85 },
    { mes: 'Nov', prediccion: 50800, confianza: 83 },
    { mes: 'Dic', prediccion: 54000, confianza: 81 }
  ];

  constructor(private predictionService: PredictionService) {}

  handleGenerate(): void {
    this.isGenerating = true;
    this.showResults = false;

    this.predictionService.generatePrediction().subscribe({
      next: (result) => {
        this.isGenerating = false;
        this.showResults = true;
        if (result.items?.length) {
          this.predictionData = result.items;
        }
      },
      error: () => {
        this.isGenerating = false;
      }
    });
  }
}
