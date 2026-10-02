import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  standalone: true,
})
export class MainComponent implements OnDestroy {
  name = signal('Main');
  private readonly testService = inject(TestService);
  private intervalId: number | undefined;
  x = inject(DestroyRef);

  constructor() {
    // this.runTest();
  }

  private runTest() {
    this.runInterval();
    this.applyEffect();
  }

  private runInterval() {
    this.intervalId = setInterval(() => {
      this.name.update((old) => {
        const newName = old + '!';
        console.log(`Updating the name: ${old} => ${newName}`);
        return newName;
      });
    }, 300);
  }

  private clearInterval() {
    clearInterval(this.intervalId);
  }

  private applyEffect() {
    effect(async () => {
      // console.log(`Data: ${data}, name before await: ${this.name()}`);
      // console.log('Before await: ');
      const data = await this.testService.fetchTestData();
      console.log(`Data: ${data}, name after await: ${this.name()}`);
      this.clearInterval();
    });
  }

  ngOnDestroy() {
    this.clearInterval();
  }
}
