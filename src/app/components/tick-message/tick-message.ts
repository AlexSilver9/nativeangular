import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tick-message',
  imports: [],
  templateUrl: './tick-message.html',
  styleUrl: './tick-message.css'
})
export class TickMessage {
  @Input() type: string = 'default type';
  @Input() message: string = 'default tick-message';
}
