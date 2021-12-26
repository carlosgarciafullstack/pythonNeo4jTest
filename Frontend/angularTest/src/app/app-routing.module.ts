import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapViewerComponent } from './components/map-viewer/map-viewer.component';
import { PATHS } from './config';
import { AnimationTest3Component } from './views/animation-test3/animation-test3.component';
import { AnimationTest2Component } from './views/animation-test2/animation-test2.component';

import { HomeComponent } from './views/home/home.component';
import { ViewFinderOSComponent } from './views/view-finder-os/view-finder-os.component';

const routes: Routes = [
  { path: PATHS.HOME, component: HomeComponent },
  { path: PATHS.OS, component: ViewFinderOSComponent },
  { path: PATHS.MAP, component: MapViewerComponent },
  { path: 'test1', component: AnimationTest2Component },
  { path: 'test2', component: AnimationTest3Component },
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
