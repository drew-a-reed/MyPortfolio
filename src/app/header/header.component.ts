import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  toggleMenu() {
    const menu = document.querySelector('.header__links-more');
    const links = document.querySelectorAll('.header__links a')
    menu?.classList.toggle("open");

    links.forEach((link: any) => {
      link.style.display = link.style.display === 'flex' ? 'none' : 'flex';
    });
  }

}
