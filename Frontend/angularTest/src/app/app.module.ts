import { HttpClientModule } from '@angular/common/http';
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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { SvgComponent } from './components/svgs/svg/svg.component';
import { ProgramIconComponent } from './components/program-icon/program-icon.component';
import { MenuBarComponent } from './views/view-finder/menu-bar/menu-bar.component';
import { WindowComponent } from './components/window/window.component';
import { DesktopProgramIconComponent } from './components/desktop-program-icon/desktop-program-icon.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SvgComponent,
    ProgramIconComponent,
    MenuBarComponent,
    WindowComponent,
    DesktopProgramIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
