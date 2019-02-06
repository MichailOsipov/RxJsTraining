import * as React from 'react';
import ReactDOM from 'react-dom';
import {fromEvent, Observable, timer, of} from 'rxjs';
import {throttleTime, map, scan, take, filter, mergeMap, switchMap} from 'rxjs/operators';

ReactDOM.render(
    <div>Hello RxJs<button>Rxjs</button></div>,
    document.getElementById('root')
);

const button = document.querySelector('button');

// fromEvent(button, 'click')
//     .pipe(
//         throttleTime(1000),
//         map(event => event.clientX),
//         scan((count, clientX) => count + clientX, 0)
//     )
//     .subscribe(count => console.log(`Clicked ${count} times`));

// button.addEventListener('click', () => {
//     const stream$ = Observable.create((observer) => {
//         observer.next(1);
//         setTimeout(() => {
//             observer.next(2);
//         }, 1000);
//         setTimeout(() => {
//             observer.next(3);
//         }, 2000);
//         setTimeout(() => {
//             observer.complete();
//         }, 3000);
//     });
//     stream$.subscribe((x) => {
//         console.log(x);
//     });
// });

// button.addEventListener('click', () => {
//     timer(0, 500)
//         .pipe(
//             take(12),
//             filter(() => Math.random() < 0.3)
//         )
//         .subscribe(x => console.log(x));
// });

// const handler = () => {
//     timer(0, 1500)
//         .pipe(
//             take(3),
//             map(i => 'abcdef'[i]),
//             mergeMap(letter =>
//                 timer(0, 625)
//                     .pipe(
//                         take(6),
//                         map(digit => letter + digit)
//                     )
//             )
//         )
//         .subscribe(x => console.log(x));
// };

const renderNext = x => console.log(x);

const getPromise = value => new Promise((resolve) => {
    setTimeout(() => {
        resolve(value);
    }, 1500);
});

const handler = () => {
    const streamA$ = Observable.create((observer) => {
        observer.next(1);
        setTimeout(() => {
            observer.next(2);
        }, 2000);
        setTimeout(() => {
            observer.next(3);
        }, 3000);
        setTimeout(() => {
            observer.complete();
        }, 4000);
    });
    const streamB$ = streamA$
        .pipe(switchMap(value => getPromise(value)))
        .subscribe(renderNext);
};
button.addEventListener('click', handler);
