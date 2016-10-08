import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the MissImage pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'missImage'
})
@Injectable()
export class MissImage {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: string, args: any[]) {
    if(value) return value;
    return 'img/avatar_fml.png';
  }
}
