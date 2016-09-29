import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Summary pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'summary'
})
@Injectable()
export class Summary {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: string, args: any) {

    if(args) return value.substr(0, args) + '...';

    if(!args) return value.substr(0, 30) + '...';

  }
}
