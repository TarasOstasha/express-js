import { OnInit, Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {

  @Output() onChanged = new EventEmitter<any>();

  @Input() state: any
  
  constructor() {

  }

  ngOnInit() {
    console.log('state', this.state);
  }

  buyProduct(event) {
    event.stopPropagation();
    this.onChanged.emit(this.state);
  }


  public onSelectSize(size): void {
    this.state.selectedSize = size;
    console.log(size);
  }

  async full_card() {
    console.log('card')
  }

}
