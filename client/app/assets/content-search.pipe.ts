/**
 * Created by Dmitriy Prilutsky on 27.07.2016.
 */

import {Pipe, PipeTransform} from '@angular/core';
import {VOAsset} from "../services/models";

@Pipe({
    name: 'contentsearch'
})

export class ContentSearchPipe implements PipeTransform {
    transform(value: VOAsset[], args:string): VOAsset[] {
        if (args === "") return value;
        return value.filter((item:VOAsset) => {
            var str = " " + item.originalname + item.label;
            return str.indexOf(args) !== -1;
        });
    }
}