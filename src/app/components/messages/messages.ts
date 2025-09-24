import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages {
  @Input() type: string = 'default type';
  @Input() message: string = 'default message';
}
