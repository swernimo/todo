import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'listdetails/:id',
        loadComponent: () => import('./pages/listdetails/listdetails.component').then(m => m.ListdetailsComponent)
    }
];
