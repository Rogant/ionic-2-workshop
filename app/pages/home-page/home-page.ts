import {Component, OnInit} from '@angular/core';
import {NavController, Modal, ActionSheet} from 'ionic-angular';
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

  presentActionSheet(i) {
    let actionSheet = ActionSheet.create({
      title: 'Modify project',
      buttons: [
        {
          text: 'Favorite',
          handler: () => {
            let project = this.projects[i]
            let favorite = project.favorite ? false : true;
            this.favProject(project._id, favorite)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    this._navController.present(actionSheet);
  }

  favProject(id, favorite) {
    this._ProjectService.favProject(id, favorite)
      .subscribe(
      projects => this.getProjects(),
      error => this.errorMessage = <any>error);
  }

  orderByDate() {
    this.projects = this.projects.sort((a, b) => {
      let date1 = new Date(a.createdAt);
      let date2 = new Date(b.createdAt);

      if (date1 > date2) return -1;
      if (date1 < date2) return 1;
      return 0;
    });
  }

  orderByFavorite() {
    this.projects = this.projects.sort((a, b) => {
      return (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1;
    });
  }
}
