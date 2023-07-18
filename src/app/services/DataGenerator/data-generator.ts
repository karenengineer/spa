import { DataInterface } from "src/app/models/data.interface";

export function generateData(size: number) {
  const data: DataInterface[] = [];
  for (let i: number = 0; i < size; i++) {
    const object = Object.create(null);
    object.id = generateRandomId();
    object. int = generateRandomInt();
    object. float = generateRandomFloat();
    object. color = generateRandomColor();
    const nested = Object.create(null);
    nested.id = generateRandomId();
    nested.color = generateRandomColor();
    object.child = nested;
    data.push(object);
  }
  return data;
}

export function generateRandomId(length = generateRandomInt(10, 15)): string {
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength: number = characters.length;

  const idParts: string[] = [];
  for (let i: number = 0; i < length; i++) {
    idParts.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }

  return idParts.join('');
}

export function generateRandomInt(min: number = 100, max: number = 9999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomFloat() {
  const precision: number = 18;
  const randomNumber: number = Math.random() * Number.MAX_SAFE_INTEGER;
  return Math.round(randomNumber * 10 ** precision) / 10 ** precision;
}

export function generateRandomColor() {
  const letters: string = '0123456789ABCDEF';
  let color: string = '#';
  for (let i: number = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
