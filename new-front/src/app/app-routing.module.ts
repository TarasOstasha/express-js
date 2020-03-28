import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AuthComponent } from './pages/auth/auth.component';
import { P404Component } from './pages/p404/p404.component'
import { AdminComponent } from './pages/admin/admin.component';
import { ProductComponent } from './pages/product/product.component';
import { LinkCategoriesComponent } from './pages/link-categories/link-categories.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AdminMessagesComponent } from './pages/admin-messages/admin-messages.component';
import { AdminMessagesArchiveComponent } from './pages/admin-messages-archive/admin-messages-archive.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrdersArchiveComponent } from './pages/orders-archive/orders-archive.component';
import { ManagerPageComponent } from './pages/manager-page/manager-page.component';
import { Card2Component } from './parts/card/card2/card2.component';
import { CategoriesComponent } from './parts/categories/categories.component';
import { IsAdminGuard } from './guard/is-admin.guard';
import { FavoriteComponent } from './parts/favorite/favorite.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'p404', component: P404Component },
  //{ path: 'admin', component:  AdminComponent, canActivate: [IsAdminGuard]},
  { path: 'admin', component:  AdminComponent},
  { path: 'admin-messages', component:  AdminMessagesComponent },
  { path: 'archive-messages', component: AdminMessagesArchiveComponent },
  { path: 'product/:productId', component: ProductComponent },
  { path: 'link-category/:crumbs', component: LinkCategoriesComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'orders', component: OrdersComponent},
  { path: 'transaction-archive', component: OrdersArchiveComponent },
  { path: 'manager', component: ManagerPageComponent },
  { path: 'card2', component: Card2Component },  // just for develop, after must removed
  { path: 'categories/:category', component: CategoriesComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: '**', redirectTo: '/p404' } //should be last one

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
