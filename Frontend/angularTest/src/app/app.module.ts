import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { SvgComponent } from './components/svgs/svg/svg.component';
import { ProgramIconComponent } from './components/program-icon/program-icon.component';
import { WindowComponent } from './components/window/window.component';
import { DesktopProgramIconComponent } from './components/desktop-program-icon/desktop-program-icon.component';
import { ViewFinderOSComponent } from './views/view-finder-os/view-finder-os.component';
import { MenuBarComponent } from './views/view-finder-os/menu-bar/menu-bar.component';
import { MenuInitComponent } from './views/view-finder-os/menu-bar/menu-init/menu-init.component';
import { ViewContentComponent } from './views/view-finder-os/view-content/view-content.component';
import { InitMenuItemsComponent } from './components/init-menu-items/init-menu-items.component';
import { StatusIconComponent } from './components/status-icon/status-icon.component';
import { WatchComponent } from './components/watch/watch.component';
import { AudioPlayerTestComponent } from './components/audio-player-test/audio-player-test.component';
import { AppRoutingModuleOS } from './views/view-finder-os/app-routing-os-program.module';
import { CalculatorComponent } from './views/view-finder-os/programs/calculator/calculator.component';
import { HelpComponent } from './views/view-finder-os/programs/help/help.component';
import { AudioPlayerComponent } from './views/view-finder-os/programs/audio-player/audio-player.component';
import { ConfigMenuSystemProgramComponent } from './views/view-finder-os/system-programs/config-menu-system-program/config-menu-system-program.component';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SvgComponent,
    ProgramIconComponent,
    MenuBarComponent,
    WindowComponent,
    DesktopProgramIconComponent,
    MenuInitComponent,
    ViewFinderOSComponent,
    ViewContentComponent,
    InitMenuItemsComponent,
    StatusIconComponent,
    WatchComponent,
    AudioPlayerTestComponent,
    CalculatorComponent,
    HelpComponent,
    AudioPlayerComponent,
    ConfigMenuSystemProgramComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModuleOS,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSliderModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}