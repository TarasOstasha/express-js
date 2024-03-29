import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AutofocusModule } from 'angular-autofocus-fix';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

//import {MatButtonModule} from '@angular/material/button';
//import {MatCheckboxModule} from '@angular/material/checkbox';
//import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-boot/app.component';
import { MainComponent } from './pages/main/main.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HeaderComponent } from './parts/header/header.component';
import { FooterComponent } from './parts/footer/footer.component';
import { from } from 'rxjs';
import { CardComponent } from './parts/card/card.component';
import { CarouselComponent } from './parts/carousel/carousel.component';
import { RatingComponent } from './parts/rating/rating.component';
import { BasketPopupComponent } from './parts/basket-popup/basket-popup.component';
import { AuthComponent } from './pages/auth/auth.component';
import { P404Component } from './pages/p404/p404.component';

// services
import { ApiService } from './services/api.service';
import { StorageService } from './services/storage.service';
import { SearchService } from './services/search.service';
import { AdminComponent } from './pages/admin/admin.component';
import { NewProductsComponent } from './parts/new-products/new-products.component';
import { FormValidatorComponent } from './parts/general/form-validator/form-validator.component';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { ProductComponent } from './pages/product/product.component';
import { ProductSliderComponent } from './parts/product-slider/product-slider.component';
import { SubcategoryComponent } from './parts/subcategory/subcategory.component';
import { SubcategorySelectComponent } from './parts/subcategory-select/subcategory-select.component';
import { LinkCategoriesComponent } from './pages/link-categories/link-categories.component';
import { MegaSearchComponent } from './parts/mega-search/mega-search.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AdminMessagesComponent } from './pages/admin-messages/admin-messages.component';
import { AdminMessagesArchiveComponent } from './pages/admin-messages-archive/admin-messages-archive.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrdersArchiveComponent } from './pages/orders-archive/orders-archive.component';
import { ChatComponent } from './parts/chat/chat.component';
import { ManagerPageComponent } from './pages/manager-page/manager-page.component';
import { Card2Component } from './parts/card/card2/card2.component';
import { MegaSearch2Component } from './parts/mega-search/mega-search2/mega-search2.component';
import { CategoryBlockComponent } from './parts/category-block/category-block.component';
import { SubcategoryAccordionComponent } from './parts/subcategory-accordion/subcategory-accordion.component';
import { CategoriesComponent } from './parts/categories/categories.component';
import { IsAdminGuard } from './guard/is-admin.guard';
import { FavoriteComponent } from './parts/favorite/favorite.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutUsComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    CarouselComponent,
    RatingComponent,
    BasketPopupComponent,
    AuthComponent,
    P404Component,
    AdminComponent,
    NewProductsComponent,
    FormValidatorComponent,
    UserFilterPipe,
    ProductComponent,
    ProductSliderComponent,
    SubcategoryComponent,
    SubcategorySelectComponent,
    LinkCategoriesComponent,
    MegaSearchComponent,
    ContactsComponent,
    AdminMessagesComponent,
    AdminMessagesArchiveComponent,
    OrdersComponent,
    OrdersArchiveComponent,
    ChatComponent,
    ManagerPageComponent,
    Card2Component,
    MegaSearch2Component,
    CategoryBlockComponent,
    SubcategoryAccordionComponent,
    CategoriesComponent,
    FavoriteComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AutofocusModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule
  
    //MatButtonModule, MatCheckboxModule,
    // MatPaginator,
    // MatSort,
    // MatTableDataSource
  ],
  providers: [ApiService, StorageService, SearchService, IsAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
