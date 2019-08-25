import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //console.log('this is value', value) //array of all users
    //console.log('this is args', args) //value from input ngModel user
    const _value = (value || [])
    if (args !== '' && args !== undefined) {
      const patt = new RegExp(args);
      const result = _value.filter(item => patt.test(item.firstName))
      return result
    } else return _value

    // if(!value || !args) {
    //   console.log('this is not')
    //   return value;
    // }
    // return value.filter((item)=>{
    //   return item.firstName == args; //should be use indexOf() to know what exactly symbol the same
    // })
  }

}
