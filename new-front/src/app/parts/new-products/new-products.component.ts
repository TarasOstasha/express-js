import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var Quill: any;
declare var swal: any;
var log = console.log;
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
  errHandler(err) {
    console.log(err);
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
  async refreshCategoriesOnServer() {
    const fromServer: any = await this.api.setCategories(this.state.productCategories)
    console.log(fromServer)
    this.errHandler
  }

  async sendNewProduct() {
    try {
      const newProduct = {
        img: this.state.currentNewProductImg,
        imgSport: 'assets/img/nike_Logo_White.png',
        fashionLine: 'FAS',
        model: 'Hartbee',
        modelType: 'sport',
        _collection: 'Basket Ball Collection',
        size: 7,
        typeOfSize: [7, 8, 9, 10, 11],
        selectedSize: 8,
        color: 'color',
        colorProducts: ['orange', 'green', 'yellow'],
        selectedColor: 'orange',
        text: 'description',
        stars: {
          public: 50,
          privite: 35.5
        },
        productName: this.state.productName,
        checkedCategory: this.state.checkedCategory,
        price: this.state.productPrice,
        description: this.quill.container.firstChild.innerHTML


      }
      const fromServer: any = await this.api.addProduct(newProduct)
      if (fromServer.ok) alert('new product has been created');
      this.errHandler
    } catch (error) {
      console.log(error);
    }

  }

  testcode() {
    console.log('çlick');
    // function eventFire(el, etype){
    //   if (el.fireEvent) {
    //     el.fireEvent('on' + etype);
    //   } else {
    //     var evObj = document.createEvent('Events');
    //     evObj.initEvent(etype, true, false);
    //     el.dispatchEvent(evObj);
    //   }
    // }

    // const button = document.querySelector('#uploadForm');
    // eventFire(button, 'submit')


  }

  // FILE UPLOADER - BEGIN
  upload_i // counter
  max_size_req = 10000//99999
  uploaded
  onChange2() {
    this.uploaded = 0
    this.upload_i = 0
    let name = 'upload'
    var file = (<HTMLInputElement>document.getElementById(name)).files[0];  // file == {  name: "OhdIJZy8H7o.jpg", lastModified: 1467921666657,  lastModifiedDate: Date 2016-07-07T20:01:06.657Z,  size: 214450,  type: "image/jpeg"   }
    log('file', file)
    log('file size', file.size)
    let times = Math.ceil(file.size / this.max_size_req) + 1 //amount of peases 
    log('TIMES:::::: ', times)
    this.state.currentNewProductImg = 'http://localhost:3000/uploads/' + file.name;
    this.upload(file, times)
  }
  upload(file, times) {
    //  aliases
    let i = this.upload_i
    let max = this.max_size_req
    // next step
    this.upload_i++
    // set a range
    let begin = (i - 1) * max
    let end = begin + max
    // коли останній кусок тоді зрізаємо пусте
    if (end > file.size) end = file.size
    log("Upload SLICE  (begin end): ", begin, end)
    // take link to one chunk
    var slice = file.slice(begin, end) //0, file.size
    // set type of chunk
    if (this.upload_i == 1) var load_type = 'new'
    else if (this.upload_i > 1) var load_type = 'append'
    log('Upload STEP # : ', this.upload_i)
    log('Uplod CHUNK Type', load_type)
    // take access to file API
    var fileReader: any = new FileReader()
    // read chunk as binary type
    fileReader.readAsBinaryString(slice)
    // when chunk has been red
    fileReader.onload = async (e) => { // e == load { target: FileReader, isTrusted: true, lengthComputable: true, loaded: 1048576, total: 1048576, currentTarget: FileReader, eventPhase: 2, bubbles: false, cancelable: false, defaultPrevented: false, timeStamp: 1474537690010000 }
      // show in console.log  
      var array = new Int8Array(fileReader.result);
      let output = JSON.stringify(array, null, '  ');
      log('LOAD fileReader.result', output)
      // gathering part of file
      const piece = {
        load_type: load_type, // ..... new or append
        name: file.name, // .......... file name
        data: fileReader.result // ... data
      }
      // =>>>> SEND to backend
      const data = await this.api.upload(piece)

      log(data)
      if (times == this.upload_i) {
        //alert('good job');
        swal.fire({
          title: "Good job!",
          text: "File successfully added",
          icon: "success",
        })
        //refresh
        //this.get_files()
      }

      if (times > this.upload_i) {
        log('.............REPEAT !!!', times, this.upload_i)
        this.uploaded = Math.floor((100 / times) * this.upload_i)
        //setTimeout(() => { this.upload(file, times) }, 2000)
        this.upload(file, times)

        // Repeat
      }
      else {
        log('..........END !!! ', times, this.upload_i)
        this.uploaded = 100
        //setTimeout(() => this.uploaded = undefined, 1000)
        this.uploaded = undefined;

      }

      // error => {
      //   //alert('error')
      //   swal("Oops", "Something went wrong in 'upload()' !", "error")
      // })
    }
  }


}
