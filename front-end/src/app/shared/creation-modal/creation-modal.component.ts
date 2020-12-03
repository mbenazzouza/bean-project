import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BeansApiService } from 'src/app/list-beans/beans-api.service';
import { UploadService } from '../upload/upload.service';

@Component({
  selector: 'app-creation-modal',
  templateUrl: './creation-modal.component.html',
  styleUrls: ['./creation-modal.component.scss']
})
export class CreationModalComponent implements OnInit {
  @Input()
  public active: boolean;

  @Input()
  public title: string;

  @Input()
  public confirmButtonName;

  @Input()
  public cancelButtonName;

  @Output()
  public confirmButtonAction: EventEmitter<any> = new EventEmitter();

  @Output()
  public cancelButtonAction: EventEmitter<void> = new EventEmitter();

  public form: FormGroup;
  public formData = new FormData();

  constructor(
    private formBuilder: FormBuilder,
    private beansApi: BeansApiService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      image: new FormControl('')
    });
  }

  public confirm() {
    const emitted = {
      form: this.form,
      formData: this.formData
    }
    this.confirmButtonAction.emit(emitted);
  }

  onFileChanged(event) {
    const image = event.target.files[0];
    const name = this.form.get('name').value;
    this.formData = new FormData();
    if (!!name) {
      Object.defineProperty(image, 'name', {
        writable: true,
        value: name
      });
      this.formData.append('file', image);
    }
  }

}
