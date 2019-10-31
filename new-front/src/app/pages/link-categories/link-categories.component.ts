import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-link-categories',
  templateUrl: './link-categories.component.html',
  styleUrls: ['./link-categories.component.less']
})
export class LinkCategoriesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let crumbs = this.route.snapshot.paramMap.get('crumbs');
    console.log(crumbs)
    // $("#ex2").slider({});

    // // Without JQuery
    // var slider = new Slider('#ex2', {});
    // Instantiate a slider
    var mySlider = $("input.slider").slider();

    // Call a method on the slider
    var value = mySlider.slider('getValue');

    // For non-getter methods, you can chain together commands
    mySlider
      .slider('setValue', 5)
      .slider('setValue', 7);
  }

  toggleFilter = false;

  //create categories
  //create cards
  //find resolve with input range price



  // parse crumbs
  // req to server
  // view to show array of product, link of crumbs and filter block on the top


  //add html filter block

}
