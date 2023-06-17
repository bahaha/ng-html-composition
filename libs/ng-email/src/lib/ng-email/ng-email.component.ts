import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cc-ng-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-email.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgEmailComponent {}
