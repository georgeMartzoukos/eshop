import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() type: 'primary' | 'succes' | 'info' | 'warning' | 'danger' = 'info';
  @Input() heading: string | undefined;
  @Input() text = 'This is the alert text'
  @Input() sinner: boolean | undefined;
  @Output() dismiss = new EventEmitter();

  onDismiss() {
    this.dismiss.emit();
  }
}
