import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home-page/home-page.html'
})
export class HomePage {
  constructor(private _navController: NavController) {
  }
}
