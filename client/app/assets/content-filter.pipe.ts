/**
 * Created by Dmitriy Prilutsky on 27.07.2016.
 */

import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'contentfilter'
})

export class ContentFilterPipe implements PipeTransform {
    transform(value: any, args:string): any {
        if (args === "all") return value;
        return value.filter(item => {
            return item.type === args;
        });
    }
}
