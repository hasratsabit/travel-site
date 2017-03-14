import $ from "jquery";
import smoothScroll from "jquery-smooth-scroll";
// This library is used for scrolling the window
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";

class StickyHeader {
  constructor() {
    this.siteHeader = $('.site-header');
    this.headerTriggerElement = $('.large-hero__title');
    this.createHeaderWaypoint();
    // The bottom two highlights link on nav when scroll
    this.pageSections = $('.page-section');
    this.headerLinks = $('.primary-nav a');
    this.createPageSectionWaypoint();
    this.addSmoothScrolling();
  }

   // When clicked on the nav links, creates smooth move to that section. 
   // It is a plugin that needs to be imported.
  addSmoothScrolling() {
    this.headerLinks.smoothScroll();
  }

  createHeaderWaypoint() {
    let that = this // The pointing dest of this is stored for later.
    new Waypoint({
      element: this.headerTriggerElement[0], // The title is the trigger for stick nav to change color
      handler: function(direction) {
        // When it is scrolling down the color changes.
        if(direction == "down") {
          that.siteHeader.addClass('site-header--dark');
        }else {
          // When back to original place, removes the color change modifier
          that.siteHeader.removeClass('site-header--dark');
        }
      }
    })
  }

  createPageSectionWaypoint() {
    let that = this; // Get the this dest (main object) for removing the class bellow
    this.pageSections.each(function() {
      let currentPageSection = this; // The dest this is pointing
      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if(direction == "down") {
            let matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
            that.headerLinks.removeClass('is-current-link'); // Remove the modifier in the link when the section is passed
            $(matchingHeaderLink).addClass('is-current-link'); // Add the the modifier class to the link we are in.
          }
        },
        offset: "18%"
      });
      // When scrolling up, it should change between link at this offset.
      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if(direction == "up") {
            let matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
            that.headerLinks.removeClass('is-current-link');
            $(matchingHeaderLink).addClass('is-current-link');
          }
        },
        offset: "-40%"
      });
    })
  }
}

export default StickyHeader
