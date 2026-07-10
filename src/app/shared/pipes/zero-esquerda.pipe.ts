import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroEsquerda',
  standalone: true,
})
export class ZeroEsquerdaPipe implements PipeTransform {
  transform(value: number | string, totalLength: number): string {
    const stringValue = value.toString();
    return stringValue.padStart(totalLength, '0');
  }
}
