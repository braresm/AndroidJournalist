import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { PlannerRoutingModule } from './planner-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { PlannerComponent } from './planner.component';

@NgModule({
  declarations: [PlannerComponent],
  imports: [CommonModule, PlannerRoutingModule, SharedModule],
})
export class PlannerModule {}
