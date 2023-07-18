import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from "src/app/services/data.service";
import { of, Observable, debounceTime } from "rxjs";
import { DataInterface } from "src/app/models/data.interface";
import { FormGroup, FormControl } from "@angular/forms";
import { FormType } from "src/app/models/form.type";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  form: FormGroup;
  data$: Observable<DataInterface[]> = of([]);
  private amountToDisplay: number = 10;

  constructor(private readonly dataService: DataService) {
    this.form = new FormGroup<FormType>({
      timerInterval: new FormControl(1000),
      arraySize: new FormControl(1000)
    });
  }

  ngOnInit(): void {
    this.getData();
    this.listenFormValueChanges();
    this.data$ = this.dataService.receiveData();
  }

  getData(): void {
    this.dataService.startDataGeneration(this.form.value.timerInterval, this.form.value.arraySize, this.amountToDisplay);
  }

  private listenFormValueChanges(): void {
    this.form.valueChanges.pipe(debounceTime(300))
      .subscribe(() => this.getData())
  }

  ngOnDestroy(): void {
    this.dataService.terminate();
  }
}
