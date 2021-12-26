import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATHS_OS_PROGRAMS } from '../../config';
import { AudioPlayerComponent } from './programs/audio-player/audio-player.component';
import { CalculatorComponent } from './programs/calculator/calculator.component';
import { HelpComponent } from './programs/help/help.component';
import { ConfigMenuSystemProgramComponent } from './system-programs/config-menu-system-program/config-menu-system-program.component';



const routes: Routes = [
  { path: PATHS_OS_PROGRAMS.AUDIO, component: AudioPlayerComponent, outlet: "routerOS" },
  { path: PATHS_OS_PROGRAMS.CALCULATOR, component: CalculatorComponent, outlet: "routerOS" },
  { path: PATHS_OS_PROGRAMS.HELP, component: HelpComponent, outlet: "routerOS" },
  { path: PATHS_OS_PROGRAMS.SYSTEM_CONFIG_MENU, component: ConfigMenuSystemProgramComponent, outlet: "routerOS" },
  { path: '',   redirectTo: PATHS_OS_PROGRAMS.HELP, pathMatch: 'full' },
  { path: '**', redirectTo: PATHS_OS_PROGRAMS.HELP, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModuleOS { }
