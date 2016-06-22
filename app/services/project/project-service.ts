import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Project } from './project';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {
  constructor(private _Http: Http) {}

  private ProjectApi = 'http://192.168.60.124:9000/api/projects';  // URL to web API

  getProjects(): Observable<Project[]> {
    return this._Http.get(this.ProjectApi)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addProject(name: string, owner: string): Observable<Project> {
    let body = JSON.stringify({ name: name, owner: owner });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._Http.post(this.ProjectApi, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
