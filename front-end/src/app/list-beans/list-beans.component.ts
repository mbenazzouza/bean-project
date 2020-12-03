import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { pick } from 'lodash';
import { BeansApiService } from './beans-api.service';

@Component({
  selector: 'app-list-beans',
  templateUrl: './list-beans.component.html',
  styleUrls: ['./list-beans.component.scss']
})
export class ListBeansComponent implements OnInit {

  public beanTypes: Array<Beans> = [];

  public createModal: boolean;
  public deleteModal: boolean;

  private createdBean: Beans;

  private idToDelete: number;

  constructor(
    private beansApi: BeansApiService
  ) { }

  ngOnInit() {
    this.beansApi.getAllBeans().subscribe(
      (beans: Array<Beans>) => {
        if (beans.length > 0) {
          this.beanTypes = _.orderBy(beans, ['name'], ['asc']);
        }
      },
      (error) => {
        console.error(error);
      });
  }

  public createBean() {
    this.createModal = true;
  }

  public cancelCreation() {
    this.createModal = false;
  }

  public confirmCreation(event: any) {
    this.createModal = false;
    this.createdBean = {
      name: event.form.value.name,
      description: event.form.value.description,
      image: event.formData
    };
    this.beansApi.createBean(this.createdBean).subscribe(/* first we create a bean item with just the name and description,
      * then update the same object to add the corresponding image*/
      (beans: Array<Beans>) => {
        console.log(beans)
        console.log(beans[0].id);
        this.beansApi.updateBean(beans[0].id, this.createdBean.image).subscribe(
          () => {
            this.ngOnInit();
          });
      });
  }

  public delete(id: number) {
    this.idToDelete = id;
    this.deleteModal = true;
  }

  public confirmDeletion() {
    this.beansApi.deleteBean(this.idToDelete).subscribe(
      () => {
        this.ngOnInit();
      });
    this.deleteModal = false;
  }

  public cancelDeletion() {
    this.deleteModal = false;
  }

}

export interface Beans {
  id?: number;
  name: string;
  description: string;
  image?: Buffer;
}
