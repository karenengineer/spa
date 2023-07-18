import { Injectable } from '@angular/core';
import { Observable, fromEventPattern, map } from "rxjs";
import { DataInterface } from "src/app/models/data.interface";
import { NodeEventHandler } from "rxjs/internal/observable/fromEvent";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private worker: Worker;

  constructor() {
    this.worker = new Worker(new URL('../app.worker', import.meta.url));
  }

  startDataGeneration(timerInterval: number, dataArraySize: number, amountToDisplay: number): void {
    this.worker.postMessage({ timerInterval, dataArraySize, amountToDisplay });
  }

  receiveData(): Observable<DataInterface[]> {
    return fromEventPattern(
      (handler: NodeEventHandler) => this.worker.addEventListener('message', handler),
      (handler: NodeEventHandler) => this.worker.removeEventListener('message', handler)
    ).pipe(map((data: any) => data.data))
  }

  terminate(): void {
    this.worker.terminate();
  }
}
