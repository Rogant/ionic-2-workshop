export class Project {
  constructor(
    public _id: string,
    public name: string,
    public favorite: boolean,
    public createdAt: any,
    public owner: string) { }
}