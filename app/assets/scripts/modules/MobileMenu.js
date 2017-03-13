import $ from 'jquery';

class MobileMenu {
  // As soon as the window loads, the constructor will run.
  // That is we call the events method here.
  constructor() {
    this.siteHeader = $('.site-header');
    this.menuIcon = $('.site-header__menu-icon');
    this.menuContent = $('.site-header__menu-content');
    this.events();
  }

  events() {
    // We use the bind method on toggleTheMenu to point to the object itself
    // Otherwise the this keyword in toggleTheMenu method points to the window object --
    // Because the toggleTheMenu is called inside events method.
    this.menuIcon.click(this.toggleTheMenu.bind(this));
  }

  toggleTheMenu() {
    this.menuContent.toggleClass('site-header__menu-content--is-visible');
    // This classes is created to add bg color for header in css.
    this.siteHeader.toggleClass('site-header--is-expanded');
    this.menuIcon.toggleClass('site-header__menu-icon--close-x');
  }
}

export default MobileMenu;
