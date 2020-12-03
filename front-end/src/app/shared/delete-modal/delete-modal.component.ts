import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @Input()
  public active: boolean;

  @Input()
  public title: string;

  @Input()
  public message: string;

  @Input()
  public confirmButtonName = 'Confirmer';

  @Input()
  public cancelButtonName = 'Annuler';

  @Output()
  public confirmButtonAction: EventEmitter<void> = new EventEmitter();

  @Output()
  public cancelButtonAction: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
