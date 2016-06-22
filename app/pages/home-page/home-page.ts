import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {newProjectModal} from '../new-project-modal/new-project-modal';


@Component({
  templateUrl: 'build/pages/home-page/home-page.html'
})
export class HomePage {
  constructor(private _navController: NavController) { }

  showModal() {
      let modal = Modal.create(newProjectModal);
      this._navController.present(modal);
  }
}
