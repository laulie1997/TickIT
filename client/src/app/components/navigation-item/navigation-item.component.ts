import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.css'],
})
export class NavigationItemComponent {
  @Input() label: string;
  @Input() icon: string;
}
