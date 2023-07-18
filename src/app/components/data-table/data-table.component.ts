import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DataInterface } from "src/app/models/data.interface";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  @Input() data: DataInterface[] | null = [];

  trackBy(index: number) {
    return index;
  }
}
