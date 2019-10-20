import { OnInit, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {

  @Output() onChanged = new EventEmitter<any>();

  @Input() state: any
  @Input() userId: string;

  constructor() {

  }

  ngOnInit() {
    //console.log('state', this.state);
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

  //code dublicate !!!! (product component and card component)
  starPrivate() {
    try {
      const myVoute = this.state.stars.voutes.filter((voute) => { // product removed
        return voute.id == this.userId; // other path for user id
      })
      //console.log('myvoute', myVoute)
      return myVoute[0].voute * 20 || 0
    } catch (error) {
      return 0;
    }
  };

}
