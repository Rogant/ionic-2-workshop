import {Component} from '@angular/core';
import {Modal, NavController, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/new-project-modal/new-project-modal.html'
})
export class newProjectModal {
  constructor(private _viewCtrl: ViewController) { }

  close() {
    this._viewCtrl.dismiss();
  }
}