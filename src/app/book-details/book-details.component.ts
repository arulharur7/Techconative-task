import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  param1!:string;
  codeNotFound:boolean=false;
  bookData:any;
  author:string="";
  cover:string="";
  title:string="";
  content:string="";
  desc:string="";
  contentdisplay:string="";
  noCover:boolean=false;
  showSpinner:boolean=true;
  showAlert:boolean=false;
  loaded:boolean=false;

  constructor(private route: ActivatedRoute, public myservice: MyServiceService){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.param1 = params['param1'];
      this.getData();
    });
  }

  

  getData(){
    this.codeNotFound = false;
    if(typeof this.param1 != "undefined" && this.param1 != null && this.param1 != ""){
      let code = "ISBN:"+this.param1;
      this.myservice.getData("https://openlibrary.org/api/books?bibkeys=ISBN:"+this.param1+"&jscmd=data&format=json").subscribe(
        response => {
          this.bookData = response[code];
          this.author = this.bookData.authors ? this.bookData.authors[0].name : "Author not found";
          this.cover = this.bookData.cover ? this.bookData.cover.large : "assets/images.jpg";
          this.title = this.bookData.title;
          this.desc = this.bookData.notes ? this.bookData.notes : "No description found";
          this.content = this.bookData.table_of_contents ? this.bookData.table_of_contents : "Content not found" ;
          this.contentdisplay = "";
          if(Array.isArray(this.content)){
            for(let val of this.content){
              this.contentdisplay+=val.title;
            }
          }else{
            this.contentdisplay = this.content;
            this.noCover = true;
          }
          this.showSpinner = false;
          this.loaded = true;
        },
        error => {
          console.error("error--->",error);
          this.showSpinner = false;
          this.showAlert = true;
        }
      );
    }else{
      this.codeNotFound = true;

    }
      
  }

}
