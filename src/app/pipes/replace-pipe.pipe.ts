import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replacePipe'
})
export class ReplacePipePipe implements PipeTransform {
  constructor() {}

  transform(value: any, replace, replacement): any {
    if (value == null) {
      return '';
    }
    console.log('valor: ' + value);
    console.log('replace: ' + replace);
    console.log('replacement: ' + replacement);
    value = value.replace(new RegExp(replace, 'g'), replacement);
    console.log('out ' + value);
    return value;

  }

}
