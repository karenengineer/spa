import { generateData } from "src/app/services/DataGenerator/data-generator";
import { DataInterface } from "src/app/models/data.interface";

let intervalId: ReturnType<typeof setInterval>;

self.onmessage = function (event) {
  const { timerInterval, dataArraySize, amountToDisplay } = event.data;
  intervalId && clearInterval(intervalId);
  intervalId = setInterval(() => {
    const data: DataInterface[] = generateData(dataArraySize).splice(-amountToDisplay);
    postMessage(data);
  }, timerInterval);
};
