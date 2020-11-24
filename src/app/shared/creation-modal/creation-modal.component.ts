import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }

  public confirm() {
    this.confirmButtonAction.emit(this.form);
    console.warn(this.form);
  }


}
