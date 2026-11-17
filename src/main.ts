import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { from, fromEvent, of, timer } from 'rxjs';
import { map, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>RxJS Observable Basics</h1>
    <p>Open the browser console to see the emissions.</p>
    <p>Then click here and press a few keyboard keys.</p>
  `,
})
class App implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    of(2, 4, 6).subscribe({
      next: value => console.log('of:', value),
      complete: () => console.log('of: complete'),
    });

    of([2, 4, 6]).subscribe(
      {
        next: value => console.log('of(array):', value),
        complete: () => console.log('of(array): complete'),

      });

    from([20, 15, 10, 5]).subscribe({
      next: value => console.log('from:', value),
      complete: () => console.log('from: complete'),
    });

    fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      map(event => event.key),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(key => console.log('keydown:', key));

    timer(0, 1000).pipe(take(3)).subscribe(value =>
      console.log('timer:', value)
    );
  }
}

bootstrapApplication(App);