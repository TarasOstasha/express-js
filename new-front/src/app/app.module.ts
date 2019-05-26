import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutofocusModule } from 'angular-autofocus-fix';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-boot/app.component';
import { TestComponent } from './parts/test/test.component';
import { MainComponent } from './pages/main/main.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HeaderComponent } from './parts/header/header.component';
import { FooterComponent } from './parts/footer/footer.component';
import { from } from 'rxjs';
import { ApiService } from './services/api.service';
import { CardComponent } from './parts/card/card.component';
import { CarouselComponent } from './parts/carousel/carousel.component';
import { RatingComponent } from './parts/rating/rating.component';
import { BasketPopupComponent } from './parts/basket-popup/basket-popup.component'

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MainComponent,
    AboutUsComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    CarouselComponent,
    RatingComponent,
    BasketPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AutofocusModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
