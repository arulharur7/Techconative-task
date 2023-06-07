import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { BookDetailsComponent } from './book-details/book-details.component';

const routes: Routes = [
  {
    path: '', component: AuthorComponent, pathMatch: 'full' // Ensure an exact match for the empty path
  },
  {
    path: "author", component: AuthorComponent
  },
  {
    path: "book-details/:param1", component: BookDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
