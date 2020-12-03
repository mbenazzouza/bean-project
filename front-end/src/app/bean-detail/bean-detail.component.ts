import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BeansApiService } from '../list-beans/beans-api.service';
import { Beans } from '../list-beans/list-beans.component';
import * as _ from 'lodash';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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

  public formData = new FormData();

  public image: SafeUrl;

  constructor(
    private route: ActivatedRoute,
    private beansApi: BeansApiService,
    private formBuilder: FormBuilder,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.beanName = params.get('name');
      this.beansApi.getBean(this.beanName).subscribe(
        (bean: Beans) => {
          if (bean) {
            this.bean = bean;
            this.form = this.formBuilder.group({
              name: new FormControl({ value: this.bean.name, disabled: true }),
              description: new FormControl(this.bean.description),
              image: new FormControl(this.bean.image)
            });
            if (this.bean.image) {
              const buffer = this.bean.image as Buffer;
              // We convert the image which is a array of bytes to a json then get the value of the data key
              const array = new Uint8Array(JSON.parse(JSON.stringify(buffer)).data);
              const stringChar = array.reduce((data, byte) => {
                return data + String.fromCharCode(byte);
              }, '');
              const base64String = btoa(stringChar);
              this.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64String);
            }
          }

          this.initialForm = _.cloneDeep(this.form);
        });
    });
  }

  public save(): void {
    const updatedBean = {
      name: this.form.value.name,
      description: this.form.value.description,
      image: this.form.value.image
    };
    this.beansApi.updateBean(this.bean.id, updatedBean).subscribe(
      (bean: Array<Beans>) => {
        this.beansApi.updateBean(bean[0].id, this.formData).subscribe(
          () => {
            this.ngOnInit();
          });
      });
  }

  onFileChanged(event: any) {
    const image = event.target.files[0];
    const name = this.form.get('name').value;
    this.formData = new FormData();
    if (!!name) {
      Object.defineProperty(image, 'name', {
        writable: true,
        value: name
      });
      this.formData.append('file', image);
      this.form.get('image').setValue(this.formData);
    }
  }

  public cancel() {
    this.form = _.cloneDeep(this.initialForm);

  }

}
