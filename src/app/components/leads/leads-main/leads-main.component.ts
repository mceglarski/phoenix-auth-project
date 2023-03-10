import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-leads-main',
  styleUrls: ['./leads-main.component.scss'],
  templateUrl: './leads-main.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsMainComponent {
}
