import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { state } from '@angular/animations';
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
    private api: ApiService,
  ) { }
  quill: any;
  ngOnInit() {

    console.log('sizes in product creating', this.state.sizes)
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
    this.state.productCategories.subCategories.push(
      {
        name: new_category,
        subCategories: []
      }
    );
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
  refreshCategories = () => this.refreshCategoriesOnServer(); //refresh on server side

  async sendNewProduct() {
    try {
      let imgs = [];
      for (let i = 0; i < this.files.length; i++) {
        imgs.push('http://localhost:3000/uploads/' + this.files[i].name);
      }
      const newProduct = {
        //img: this.state.currentNewProductImg,
        img: this.getNumberPhoto(),
        imgs: imgs,
        imgSport: 'assets/img/nike_Logo_White.png',
        fashionLine: 'FAS',
        model: 'Hartbee',
        modelType: 'sport',
        _collection: 'Basket Ball Collection',
        sizes: this.state.sizes,
        selectedSize: 8, // remove later!!!
        //color: this.state.color,
        colorProducts: this.state.colorProducts,
        selectedColor: 'orange',
        text: 'description',
        views: 0,
        stars: {
          public: 50,
          privite: 35.5
        },
        productName: this.state.productName,
        checkedCategory: this.state.checkedCategory,
        price: this.state.productPrice,
        description: this.quill.container.firstChild.innerHTML,
        breadCrumbs: this.state.breadCrumbs


      }
      const fromServer: any = await this.api.addProduct(newProduct)
      if (fromServer.ok) alert('new product has been created');
      this.errHandler
    } catch (error) {
      console.log(error);
    }

  }



  // FILE UPLOADER - BEGIN
  upload_i // counter
  times; //time
  max_size_req = 10000//99999
  uploaded;
  fileQuantity;
  fileCounter;
  files: any = {};

  onChange() {
    this.files = (<HTMLInputElement>document.getElementById('upload')).files;  // file == {  name: "OhdIJZy8H7o.jpg", lastModified: 1467921666657,  lastModifiedDate: Date 2016-07-07T20:01:06.657Z,  size: 214450,  type: "image/jpeg"   }
    this.uploaded = 0
    this.upload_i = 0
    console.log('this files', this.files)
    //step one - remove first example photo
    this.state.previews = this.state.previews.filter((elem) => {
      return (elem.reader.result == "assets/img/400x300.png") ? false : true;
    })

    this.fileQuantity = this.files.length;
    this.fileCounter = 1;

    const file = this.files[0];
    //log('file', file)
    //log('file size', file.size)
    //log('TIMES:::::: ', times)
    this.state.currentNewProductImg = 'http://localhost:3000/uploads/' + file.name;
    //preview
    //const preview: any = document.querySelector('img');
    for (let i = 0; i < this.files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.state.previews.push({
          reader: reader
        })
        // preview.src = reader.result;
      }
      reader.readAsDataURL(this.files[i]);
    }
    this.upload(file)


  }
  upload(file) {
    let times = Math.ceil(file.size / this.max_size_req) + 1 //amount of peases 
    this.times = times;
    log('upload begin', this.upload_i)
    let max = this.max_size_req
    // next step
    this.upload_i++
    // set a range
    let begin = (this.upload_i - 1) * max
    let end = begin + max
    // коли останній кусок тоді зрізаємо пусте
    if (end > file.size) end = file.size
    // take link to one chunk
    var slice = file.slice(begin, end) //0, file.size
    // set type of chunk
    if (this.upload_i == 1) var load_type = 'new'
    else if (this.upload_i > 1) var load_type = 'append'
    // take access to file API
    var fileReader: any = new FileReader()
    // read chunk as binary type
    fileReader.readAsBinaryString(slice)
    // when chunk has been red
    fileReader.onload = async (e) => { // e == load { target: FileReader, isTrusted: true, lengthComputable: true, loaded: 1048576, total: 1048576, currentTarget: FileReader, eventPhase: 2, bubbles: false, cancelable: false, defaultPrevented: false, timeStamp: 1474537690010000 }
      this.progressPercent();
      // gathering part of file
      const piece = {
        load_type: load_type, // ..... new or append
        name: file.name, // .......... file name
        data: fileReader.result // ... data
      }
      // =>>>> SEND to backend
      const data = await this.api.upload(piece);
      //repeat to upload first and middle chunks   
      log('i: ', this.upload_i, 'from', this.times)
      //last chunk of file
      if (times > this.upload_i) this.upload(file)
      else if (times == this.upload_i) {
        this.fileCounter++;
        //upload next file?
        log('loaded', this.fileCounter);
        // alert('good job');
        if (this.fileQuantity >= this.fileCounter) { this.uploadNextFile(); }

        swal.fire({
          title: "Good job!",
          text: "File successfully added",
          icon: "success",
        })
      }

    }
  }

  round = (x) => Math.round(x); //progress bar
  //upload next file
  uploadNextFile() {
    const file = this.files[this.fileCounter - 1]; //current upload file
    //3 0
    const times = Math.ceil(file.size / this.max_size_req) + 1 //amount of peases 
    this.upload_i = 0;
    console.log('this is upload', file, times, this.fileCounter) //undefined
    this.upload(file);
  }

  checkMainPhoto(index) {
    this.state.previews.map((el, i) => {
      this.state.previews[i].main = false;
    })
    this.state.previews[index].main = true;
  }
  //get number of main photo
  getNumberPhoto() {
    for (let i = 0; i < this.state.previews.length; i++) {
      if (this.state.previews[i].main == true) {
        return i;
      }
    }
    return 0;
  }
  progressBarPercent = 0;
  progressPercent() {
    setTimeout(() => {
      this.progressBarPercent = this.round(100 / this.times * this.upload_i);
      log(this.progressBarPercent);
    })


  }


}


