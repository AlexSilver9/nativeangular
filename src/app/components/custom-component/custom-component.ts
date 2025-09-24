import {Component} from '@angular/core';
import {SubComponent} from '../sub-component/sub-component';

@Component({
  selector: 'custom-component',
  imports: [SubComponent],
  templateUrl: './custom-component.html',
  styleUrl: './custom-component.css',
})

export class CustomComponentComponent {
  // Component behavior here
}
