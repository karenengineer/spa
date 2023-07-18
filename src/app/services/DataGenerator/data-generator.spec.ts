import {
  generateData,
  generateRandomId,
  generateRandomInt,
  generateRandomFloat,
  generateRandomColor
} from "./data-generator";
import { DataInterface } from "src/app/models/data.interface";
describe('generateData_function', () => {

  it('test_zero_size', () => {
    const data: DataInterface[] = generateData(0);
    expect(data).toEqual([]);
  });

  it('test_size_one', () => {
    const data: DataInterface[] = generateData(1);
    expect(data.length).toBe(1);
  });

  it('test_size_ten', () => {
    const data: DataInterface[] = generateData(10);
    expect(data.length).toBe(10);
  });

  it('test_large_size', () => {
    const data: DataInterface[] = generateData(1000000);
    expect(data.length).toBe(1000000);
  });

  it('test_unique_ids', () => {
    const data: DataInterface[] = generateData(100);
    const ids:string[] = data.map((obj: DataInterface) => obj.id);
    const uniqueIds:Set<string> = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

});

describe('generateRandomId_function', () => {

  it('test_returns_string', () => {
    const result = generateRandomId();
    expect(typeof result).toBe('string');
  });

  it('test_returns_string_of_correct_length', () => {
    const result = generateRandomId();
    expect(result.length).toBeGreaterThanOrEqual(10);
    expect(result.length).toBeLessThanOrEqual(15);
  });

  it('test_returns_alphanumeric_string', () => {
    const result: string = generateRandomId();
    const alphanumericRegex: RegExp = /^[a-zA-Z0-9]+$/;
    expect(alphanumericRegex.test(result)).toBe(true);
  });

  it('test_returns_empty_string_when_length_is_0', () => {
    const result: string = generateRandomId(0);
    expect(result.length).toBe(0);
  });

  it('test_returns_string_of_length_1_when_called_with_length_1', () => {
    const result: string = generateRandomId(1);
    expect(result.length).toBe(1);
  });

  it('test_returns_string_of_length_10_when_called_with_length_10', () => {
    const result: string = generateRandomId(10);
    expect(result.length).toBe(10);
  });

});

describe('generateRandomInt_function', () => {

  it('test_random_int_between_min_and_max', () => {
    const min: number = 100;
    const max: number = 9999;
    const randomInt: number = generateRandomInt(min, max);
    expect(randomInt).toBeGreaterThanOrEqual(min);
    expect(randomInt).toBeLessThanOrEqual(max);
    expect(Number.isInteger(randomInt)).toBe(true);
  });

  it('test_random_int_greater_than_or_equal_to_min', () => {
    const min: number = 100;
    const randomInt: number = generateRandomInt(min);
    expect(randomInt).toBeGreaterThanOrEqual(min);
    expect(Number.isInteger(randomInt)).toBe(true);
  });

  it('test_random_int_less_than_or_equal_to_max', () => {
    const max: number = 9999;
    const randomInt: number = generateRandomInt(undefined, max);
    expect(randomInt).toBeLessThanOrEqual(max);
    expect(Number.isInteger(randomInt)).toBe(true);
  });

  it('test_random_int_when_min_and_max_are_equal', () => {
    const min: number = 100;
    const max: number = 100;
    const randomInt: number = generateRandomInt(min, max);
    expect(randomInt).toBe(min);
    expect(Number.isInteger(randomInt)).toBe(true);
  });


  it('test_random_int_returns_integer', () => {
    const randomInt: number = generateRandomInt();
    expect(Number.isInteger(randomInt)).toBe(true);
  });

});

describe('generateRandomFloat_function', () => {

  it('test_returns_0_when_Math_random_returns_0', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0);
    const result: number = generateRandomFloat();
    expect(result).toEqual(0);
    jest.spyOn(Math, 'random').mockRestore();
  });

  it('test_returns_MAX_SAFE_INTEGER_when_Math_random_returns_1', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(1);
    const result: number = generateRandomFloat();
    expect(result).toEqual(Number.MAX_SAFE_INTEGER);
    jest.spyOn(Math, 'random').mockRestore();
  });

  it('test_returns_different_float_each_time_called', () => {
    const result1: number = generateRandomFloat();
    const result2: number = generateRandomFloat();
    expect(result1).not.toEqual(result2);
  });

  it('test_returns_float_between_0_and_MAX_SAFE_INTEGER', () => {
    const result: number = generateRandomFloat();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
  });

});

describe('generateRandomColor_function', () => {

  it('test_happy_path_length_7', () => {
    const color: string = generateRandomColor();
    expect(color.length).toBe(7);
  });

  it('test_happy_path_starts_with_hash', () => {
    const color: string = generateRandomColor();
    expect(color.charAt(0)).toBe('#');
  });

  it('test_happy_path_hexadecimal_characters', () => {
    const color: string = generateRandomColor();
    const regex: RegExp = new RegExp('^#[0-9A-Fa-f]{6}$');
    expect(regex.test(color)).toBe(true);
  });

});
