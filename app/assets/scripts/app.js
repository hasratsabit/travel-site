
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import $ from "jquery";

let mobileMenu = new MobileMenu();
let stickyHeader = new StickyHeader();

// We use the constructor in to dynamically reveal any part of the page we want.
// The rest of the code in the reveal file is recyclible except the offset and elements differ
// We pass the element path and offset we want the items to reveal.
new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".testimonial"), "65%");
