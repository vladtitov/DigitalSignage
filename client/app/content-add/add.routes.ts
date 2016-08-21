/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { RouterConfig } from '@angular/router';

import { AddContent } from "./content-add";
import { FileContent }  from './content-files';
import { RssContent }  from './content-rss';
import { WebContent }  from './content-web';



export const addRoutes: RouterConfig = [
    {
        path: 'content-manager/add',
        component: AddContent,
     /*   children: [
            { path: 'files',  component: FileContent,},
            { path: 'rss',  component: RssContent },
            { path: 'web-content', component: WebContent }
        ]*/
    },
    {
        path: 'content-manager/add/:id',
        component: AddContent
    }
];