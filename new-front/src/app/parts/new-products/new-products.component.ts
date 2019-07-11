import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var Quill: any;

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.less']
})
export class NewProductsComponent implements OnInit {
  @Input() state: any;
  constructor(
    private api: ApiService
  ) { }
  quill: any;

  ngOnInit() {
    let toolBarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],
      ['link', 'image']
    ]
    this.quill = new Quill('#input-desc', {
      modules: {
        toolbar: toolBarOptions
      },
      theme: 'snow',

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

  

  productTest() {
    var text = this.quill.getText(); // work
    //var editor_content = this.quill.container.firstChild.firstChild.innerHTML // work
    //var editor_content_p= this.quill.textarea.firstChild.innerHTML // work
    this.quill.container.firstChild.innerHTML += this.quill.container.firstChild.innerHTML
    console.log(this.state);

  }
  new_category: any;
  categories: any = []
  addCategory(new_category): void {
    //this.state.productCategories // array in state admin
    this.state.productCategories.push(new_category);
    this.new_category = "";
    console.log(new_category);
    this.refreshCategoriesOnServer()
  }

  delCategory(): any {
    this.state.productCategories.shift();
    this.refreshCategoriesOnServer()
  }
  refreshCategoriesOnServer() {
    this.api.setCategories(this.state.productCategories).subscribe((fromServer: any)=>{
      console.log(fromServer)
    },(err)=> {
      console.log(err)
    });
    
  }
}
