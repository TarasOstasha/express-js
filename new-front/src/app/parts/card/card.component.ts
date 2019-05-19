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

  buyProduct() {
    this.onChanged.emit('hello from cart');
  }
}
