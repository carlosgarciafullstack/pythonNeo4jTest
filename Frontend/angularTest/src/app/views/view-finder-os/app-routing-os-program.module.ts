import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATHS_OS_PROGRAMS } from '../../config';
import { AudioPlayerComponent } from './programs/audio-player/audio-player.component';
import { CalculatorComponent } from './programs/calculator/calculator.component';
import { HelpComponent } from './programs/help/help.component';


const routes: Routes = [
  { path: PATHS_OS_PROGRAMS.AUDIO, component: AudioPlayerComponent, outlet: "sidebar" },
  { path: PATHS_OS_PROGRAMS.CALCULATOR, component: CalculatorComponent, outlet: "sidebar" },
  { path: PATHS_OS_PROGRAMS.HELP, component: HelpComponent, outlet: "sidebar" },
  { path: '',   redirectTo: PATHS_OS_PROGRAMS.HELP, pathMatch: 'full' },
  { path: '**', redirectTo: PATHS_OS_PROGRAMS.HELP, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModuleOS { }
