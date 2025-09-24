import {Component, computed, effect, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PostComponent} from './components/post/post';
import {TickMessage} from './components/tick-message/tick-message';
import {ApiService, ApiMessage} from './services/api.service'
import {CustomComponentComponent} from './components/custom-component/custom-component';
import {Subscription} from 'rxjs';

interface Post {
  name:string,
  img:string,
  time:string,
  text:string
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostComponent, TickMessage, CustomComponentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  data:Array<Post> = [];
  lastMessage = signal<ApiMessage | null>(null);
  private messageSubscription?: Subscription;

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

    // TickMessage laden
    /*this.apiService.getLastMessage().subscribe({
      next: (lastMessage) => {
        this.lastMessage.set(lastMessage);
        console.log('Last tick-message fetched:', this.lastMessage());
      },
      error: (error) => {
        console.error('Error fetching last tick-message:', error);
      }
    });*/
    this.startMessagePolling();
  }

  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe();
  }

  private startMessagePolling() {
    this.messageSubscription = this.apiService.getLastMessagePolling(1000).subscribe({
      next: (message) => {
        this.lastMessage.set(message);
        console.log('Last tick-message updated:', this.lastMessage());
      },
      error: (error) => {
        console.error('Error fetching last tick-message:', error);
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
