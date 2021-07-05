import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from './config';

import { HomeComponent } from './views/home/home.component';
import { ViewFinderOSComponent } from './views/view-finder-os/view-finder-os.component';

const routes: Routes = [
  { path: PATHS.HOME, component: HomeComponent },
  { path: PATHS.OS, component: ViewFinderOSComponent },
  { path: '',   redirectTo: PATHS.HOME, pathMatch: 'full' },
  { path: '**', redirectTo: PATHS.HOME, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
