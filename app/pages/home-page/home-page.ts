import {Component, OnInit} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {newProjectModal} from '../new-project-modal/new-project-modal';

import {Project} from '../../services/project/project';
import {ProjectService} from '../../services/project/project-service';


@Component({
  templateUrl: 'build/pages/home-page/home-page.html',
  providers: [ProjectService]
})
export class HomePage implements OnInit {
    projects: Project[];
    errorMessage: string;
    mode = 'Observable';

    constructor(private _navController: NavController, private _ProjectService: ProjectService) { }

    ngOnInit() {
      this.getProjects();
    }

  getProjects() {
    this._ProjectService.getProjects()
      .subscribe(
      projects => this.projects = projects,
      error => this.errorMessage = <any>error);
  }

  showModal() {
    let modal = Modal.create(newProjectModal);
    this._navController.present(modal);
  }
}
