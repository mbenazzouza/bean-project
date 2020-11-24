import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BeansApiService } from '../list-beans/beans-api.service';
import { Beans } from '../list-beans/list-beans.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-bean-detail',
  templateUrl: './bean-detail.component.html',
  styleUrls: ['./bean-detail.component.scss']
})
export class BeanDetailComponent implements OnInit {

  private beanName: string;
  public bean: Beans;
  public form: FormGroup;
  public initialForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private beansApi: BeansApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.beanName = params.get('name');
      this.beansApi.getBean(this.beanName).subscribe(
        (bean: Beans) => {
          this.bean = bean;
          this.form = this.formBuilder.group({
            name: new FormControl({value: this.bean.name, disabled: true}),
            description: new FormControl(this.bean.description),
          });
          this.initialForm = _.cloneDeep(this.form);
        });
    });
  }

  public save() {
    console.log(this.form);
    const description = this.form.value.description;
    const updatedBean = {
      name: this.bean.name,
      description
    };
    this.beansApi.updateBean(this.bean.id, updatedBean).subscribe(
      () => {
        this.ngOnInit();
      }
    )
  }

  public cancel() {
    this.form = _.cloneDeep(this.initialForm);

  }

}
