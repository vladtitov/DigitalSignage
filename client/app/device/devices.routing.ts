/**
 * Created by админ on 16.09.2016.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { HeroComponent }       from './hero.component.3';
// import { HeroListComponent }   from './hero-list.component';
// import { HeroDetailComponent } from './hero-detail.component';

const routes: Routes = [
    // { path: '',
    //     component: HeroComponent,
    //     children: [
    //         { path: '',    component: HeroListComponent },
    //         { path: ':id', component: HeroDetailComponent }
    //     ]
    // }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);