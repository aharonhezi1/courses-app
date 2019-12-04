import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('1000ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ]
})
export class HomePageComponent implements OnInit {
  constructor() { }
  show = false;

  get stateName() {
    return this.show ? 'show' : 'hide';
  }

  images = ['../../assets/high-images/alexis-brown-omeaHbEFlN4-unsplash.jpg',
    '../../assets/high-images/darya-tryfanava-d55fhArDES0-unsplash.jpg',
    '../../assets/high-images/ken-theimer-PoE6Q48B-5k-unsplash.jpg',
    '../../assets/high-images/mikael-kristenson-3aVlWP-7bg8-unsplash.jpg',
    '../../assets/high-images/mimi-thian-vdXMSiX-n6M-unsplash.jpg',
    '../../assets/high-images/nathan-dumlao-ewGMqs2tmJI-unsplash.jpg',
    '../../assets/high-images/vadim-sherbakov-d6ebY-faOO0-unsplash.jpg',
    '../../assets/high-images/vasily-koloda-8CqDvPuo_kI-unsplash.jpg',
    '../../assets/high-images/victoria-heath-b7CRDcwfNFU-unsplash.jpg',
    '../../assets/high-images/wes-hicks-4-EeTnaC1S4-unsplash.jpg']
  imagePath = '';

  i = 0;
  intrerval: any;
  changeImage() {

    this.imagePath = this.images[this.i % this.images.length];
    this.i++;

  }
  ngOnInit() {
    this.intrerval = setInterval(() => {
      this.show = false;
      setTimeout(() => {
        this.changeImage()
        setTimeout(() => {
          this.show = true;
        }, 100);
      }, 1000);
    }, 6000);
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.changeImage) {
      clearInterval(this.intrerval)
    }

  }

}
