import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  fetchTestData(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 1000);
    });
  }
}
