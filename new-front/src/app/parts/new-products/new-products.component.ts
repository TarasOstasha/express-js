import { Component, OnInit } from '@angular/core';
declare var Quill: any;

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.less']
})
export class NewProductsComponent implements OnInit {

  constructor() { }
  quill: any;

  ngOnInit() {
    this.quill = new Quill('#input-desc', {
      theme: 'snow'
    })
  }

  onChange(event) {
    var preview: any = document.querySelector('img');
    //var files: any = document.querySelector('input[type=file]');
    var file = (<HTMLInputElement>document.getElementById("uploadFile")).files[0]; 
    var reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    }
    console.log(file);
    if (file) {
      console.log('if')
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
      console.log('else')
    }
  }

}
