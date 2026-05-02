import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getKPIs().subscribe({
      next: () => {},
      error: () => {}
    });
  }
}
