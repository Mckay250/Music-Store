import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSecondPipe'
})
export class MinuteSecondPipePipe implements PipeTransform {

  transform(value: number): string {
    const temp = value;
    const hours = Math.floor(temp / 3600);
    const minutes: number = Math.floor(temp / 60);
    const seconds = Math.round(temp % 60);
    return hours + ':' + minutes + ':' + seconds;
  }

}
