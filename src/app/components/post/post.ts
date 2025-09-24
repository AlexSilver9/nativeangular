import {Component, Input, input} from '@angular/core';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.css'
})
export class PostComponent {
  @Input() img: string = '';
  @Input() name: string = 'Default Name';
  @Input() time: string = 'Default Time';
  @Input() text: string = 'Default Text';
}
