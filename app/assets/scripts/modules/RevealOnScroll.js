import $ from "jquery";
// This library is used for scrolling the window
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";

class RevealOnScroll {

  constructor(element, offset) {
    this.itemsToReveal = element // It gets the element string from the app.js
    this.hideInitially();
    this.offsetPercentage = offset; // This variable needs to be hoisted first before the createwaypoint method fire.
    this.createWayPoints();
  }

  hideInitially() {
    this.itemsToReveal.addClass('reveal-item');
  }

  // For this method to fire as soon as window loads, it should be called inide the constructor.
  createWayPoints() {
    let that = this; // We want the this keyword to point to the constructor itself when we use it with offset. We store the value in this level in variable so we use the varaible blow instead the keword itself. The keyword itself points to the inner object.
    this.itemsToReveal.each(function() {
      var currentItem = this; // The this points to the itemsToReveal. So it is assigned to a variable to use in method bellow. This this by itself inside the method will point to the object itself
      new Waypoint({ // This constructor is coming from the library imported above.
        element: currentItem,
        handler: function() {
          $(currentItem).addClass("reveal-item--is-visible");
        },
        offset: that.offsetPercentage // This variable is assigned to offset parameter that gets its value from the instance in the app.js
      })
    })
  }

}

export default RevealOnScroll;
