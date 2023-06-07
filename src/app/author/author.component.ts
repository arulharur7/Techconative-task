import { Component } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import { MyServiceService } from '../my-service.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {

  @ViewChild('booksData', { static: true }) booksData!: ElementRef;
  
  constructor(private route: ActivatedRoute, public myservice: MyServiceService){

  }

  searchtext: string = "OL";  
  authors: Array<any> = [];
  authorsList: Array<any> = [];
  booksList: Array<any> = [];

  showSpinner:boolean=true;
  initialSelect:boolean=false;
  noDataFound:boolean=false;
  showAlert:boolean=false;
  booksCount:number=0;

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    this.showSpinner = true;
    this.initialSelect = false;
    this.noDataFound = false;
    this.showAlert = false;
    this.myservice.getData("https://openlibrary.org/search/authors.json?q="+this.searchtext).subscribe(
      response => {
        this.authorsList = response.docs;
        this.showSpinner = false;
        if(this.authorsList.length != 0){
          this.authorsList.forEach((element) => {
            element["label"]= element.name;
            element["value"] = element.name;
          })
          this.initialSelect = true;
        }else{
          this.noDataFound = true;
        }
        
      },
      error => {
        console.error("error--->",error);
        this.showAlert = true;
      }
    );
  }

  fetchBooks(event: any) {//https://openlibrary.org/search.json?author=Forsh, Olʹga
    
    this.booksList = [];
    this.showSpinner = true;
    this.initialSelect = false;
    this.noDataFound = false;
    this.showAlert = false;
    this.myservice.getData("https://openlibrary.org/search.json?author="+event.value).subscribe(
      response => {
        this.booksList = response.docs;
        this.showSpinner = false;
        if(this.booksList.length != 0 ){
          this.booksCount = this.booksList.length;
        }else{
          this.noDataFound = true;
        }
        this.initialSelect = false;
      },
      error => {
        console.error("error--->",error);
        this.showAlert = true;
        this.initialSelect = false;
      }
    );
  
  }



}
