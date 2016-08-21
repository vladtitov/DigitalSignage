/**
 * Created by Vlad on 7/19/2016.
 */
/// <reference path="../../typings/moment/moment.d.ts" />
import {Component, Input} from "@angular/core";
import * as moment from 'moment';


@Component({
    selector:`time-cell`,
    template:`
            <div class="mycell">
                <div class="mytime"> {{timecell.time}}</div> 
                <div class="dashline">
                    <svg height="1" width="128">
                          <g fill="none" stroke="black" stroke-width="2">                       
                            <path stroke-dasharray="10,10" d="M5 0 128 0" />                        
                          </g>
                     </svg>
                </div>
            </div>
`,
    styles:[`
      .mycell{
            width: 128px;
            background-color: #4b7caa;
            color: white;              
      }
      .mytime{
            transform:translateX(-15px);
      }
      .dashline{
      transform:translate(-64px,64px) rotate(90deg);
       
      }
    


`]
})
export class TimeCellCompnent{
    @Input()timecell:TimeCellVO = new TimeCellVO(0);

}




export class TimeCellVO{
    time:string='';
    id:number;
    constructor(private num:number){
        this.id=num;
        this.time =  moment.unix(num*10).format('mm:ss');
    }
}
