import {Component, OnInit} from '@angular/core';
import {Modal, NavController, ViewController} from 'ionic-angular';

import { Project } from '../../services/project/project';
import { ProjectService } from '../../services/project/project-service';

@Component({
  templateUrl: 'build/pages/new-project-modal/new-project-modal.html',
  providers: [ProjectService]
})
export class newProjectModal implements OnInit {
  projects: Project[];
  errorMessage: string;
  mode = 'Observable';

  constructor(private _viewCtrl: ViewController, private _ProjectService: ProjectService) { }

  ngOnInit() {
    this.projects = [];
  }

  close() {
    this._viewCtrl.dismiss();
  }

  addProduct(name: string, owner: string) {
    if (!name) { return; }
    this._ProjectService.addProject(name, owner)
      .subscribe(
      product => this.projects.push(product),
      error => this.errorMessage = <any>error);

    this.close();
  }
}