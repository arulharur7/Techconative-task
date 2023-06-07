import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthorComponent } from './author/author.component';
import { HttpClientModule } from '@angular/common/http';
import { MyServiceService } from './my-service.service';
import { Select2Module } from 'ng-select2-component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BookDetailsComponent } from './book-details/book-details.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    BookDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    Select2Module,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule
  ],
  providers: [
    MyServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
