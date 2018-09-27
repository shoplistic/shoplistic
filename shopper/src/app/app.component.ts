import { Component, AfterViewInit } from '@angular/core';
import * as Quagga from 'quagga';

declare global {
  interface Array<T> {
    common(): any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {

  values: any[] = [];
  err: string;
  barcodeValue: string;

  ngAfterViewInit() {

    Quagga.init({
      numOfWorkers: navigator.hardwareConcurrency,
      locate: true,
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        facingMode: 'environment',
        target: document.querySelector('#scanner')    // Or '#yourElement' (optional)
      },
      // photoSettings: {
      //   fillLightMode: 'flash', /* or "flash" */
      //   focusMode: 'continuous'
      // },
      locator: {
        patchSize: 'large', // 'medium'?
        halfSample: true
      },
      decoder: {
        readers: ['ean_reader', 'upc_reader'],
        debug: {
          showCanvas: true,
          showPatches: true,
          showFoundPatches: true,
          showSkeleton: true,
          showLabels: true,
          showPatchLabels: true,
          showRemainingPatchLabels: true,
          boxFromPatches: {
            showTransformed: true,
            showTransformedBox: true,
            showBB: true
          }
        }
      }
    }, err => {
      if (err) {
        console.log(err);
        this.err = err;
        return;
      }
      console.log('Initialization finished. Ready to start');
      Quagga.start();
    });

    Quagga.onDetected(data => {
      if (data) {
        this.values.push(data.codeResult.code);

        if (this.values.length > 50) {
          // this.barcodeValue = foo(this.values);
          this.barcodeValue = this.values.common();
          navigator.vibrate(75);
          this.values = [];
        }

        // console.log(data.codeResult.code);
      }
    });

    Quagga.onProcessed(result => {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width'), 10), parseInt(drawingCanvas.getAttribute('height'), 10));
          result.boxes.filter(function (box) {
            return box !== result.box;
          }).forEach(function (box) {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 2 });
          });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
        }
      }
    });


  }

}

// function foo(arr) {

//   const a = {};

//   for (const i of arr) {

//     if (a[i] === undefined) {
//       a[i] = 1;
//     } else {
//       a[i]++;
//     }

//   }

//   let highest = 0;
//   let value: any = null;

//   for (const i in a) {

//     if (i) {

//       if (a[i] > highest) {
//         highest = a[i];
//         value = i;
//       }

//     }

//   }

//   console.log(a);

//   return value;

// }

// function foo(arr) {
//   return arr.sort((a, b) =>
//     arr.filter(v => v === a).length
//     - arr.filter(v => v === b).length
//   ).pop();
// }

Array.prototype['common'] = function () {
  return this.sort((a, b) =>
    this.filter(v => v === a).length - this.filter(v => v === b).length
  ).pop();
};

