import {Component, computed, effect, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PostComponent} from './components/post/post';
import {Messages} from './components/messages/messages';
import {ApiService, Message} from './services/api.service'
import {CustomComponentComponent} from './components/custom-component/custom-component';

interface Post {
  name:string,
  img:string,
  time:string,
  text:string
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostComponent, Messages, CustomComponentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  data:Array<Post> = [];
  lastMessage = signal<Message | null>(null);

  count = 0;
  countSignal = signal(0);
  colors = signal(['red', 'blue']);

  length = signal(40);
  breadth = signal(80);
  area = computed(() => this.length() * this.breadth() );

  constructor(private apiService: ApiService) {
    console.log(`Count Signal: `, this.countSignal());
    console.log(`Colors Signal: `, this.colors());

    effect(() => {
      console.log("Effect due to count signal triggered: ", this.countSignal());
    });
    effect(() => {
      console.log("Effect due to colors signal triggered: ", this.colors());
    });
    effect(() => {
      console.log("Effect due to area signal triggered: ", this.area());
    });
  }

  async ngOnInit(){
    // Posts laden (könnte man auch in ApiService verschieben)
    try {
      console.log('Fetching posts data...');
      const response = await fetch('./assets/data/posts.json');
      console.log('Fetch posts Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.data = await response.json();
      console.log('Posts data fetched:', this.data);
    } catch (error) {
      console.error('Error fetching posts data:', error);
    }

    // Messages laden
    this.apiService.getLastMessage().subscribe({
      next: (lastMessage) => {
        this.lastMessage.set(lastMessage);
        console.log('Last message fetched:', this.lastMessage());
      },
      error: (error) => {
        console.error('Error fetching last message:', error);
      }
    });
  }

  increase() {
    this.count++;
    //this.countSignal.set(this.countSignal() + 1); // Use for simple values
    this.countSignal.update(value => value + 1); // Use for values based on previous value
    //this.colors.mutate(values => values.push('green')); // Angular 16
    this.colors.update(values => [...values, "green"]); // Angular 17 mit Spread Operator
    console.log(`Colors Signal: `, this.colors());
    this.length.update(value => value + 10);
  }
}
