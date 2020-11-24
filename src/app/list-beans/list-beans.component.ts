import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BeansApiService } from './beans-api.service';

@Component({
  selector: 'app-list-beans',
  templateUrl: './list-beans.component.html',
  styleUrls: ['./list-beans.component.scss']
})
export class ListBeansComponent implements OnInit {

  public beanTypes: Array<Beans> = [];

  public nativeModal: boolean;

  private createdBean: Beans;

  constructor(
    private beansApi: BeansApiService
  ) { }

  ngOnInit() {
    this.beansApi.getAllBeans().subscribe(
      (beans: Array<Beans>) => {
        if (beans.length > 0) {
          this.beanTypes = beans;
        }
      });
  }

  public test() {
    this.nativeModal = true;
  }

  public cancelCreation() {
    this.nativeModal = false;
  }

  public confirmCreation(event: any) {
    this.nativeModal = false;
    this.createdBean = {
      name: event.value.name,
      description: event.value.description
    };

    this.beansApi.createBean(this.createdBean).subscribe(
      (created: Beans) => {
        console.log(created);
        this.ngOnInit();
      }
    );
  }

  public delete(id: number) {
    this.beansApi.deleteBean(id).subscribe(
      () => {
        this.ngOnInit();
      }
    )
  }

}

export interface Beans {
  id?: number;
  name: string;
  description: string;
}
