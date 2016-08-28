
import { Home } from './home/home.component';
import { About } from './about/about.component';
import { NoContent } from './no-content/no-content';
import { Routes } from '@angular/router';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'about', component: About },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
  },
  {
    path: 'music', loadChildren: () => System.import('./music/music.module')
  },
  { path: '**',    component: NoContent },
];

