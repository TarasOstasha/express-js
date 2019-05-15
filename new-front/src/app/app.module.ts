import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutofocusModule } from 'angular-autofocus-fix';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-boot/app.component';
import { TestComponent } from './parts/test/test.component';
import { MainComponent } from './pages/main/main.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HeaderComponent } from './parts/header/header.component';
import { FooterComponent } from './parts/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MainComponent,
    AboutUsComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AutofocusModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
