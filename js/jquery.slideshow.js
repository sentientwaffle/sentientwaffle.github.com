jQuery(function($) {
  // Public: Slideshow widget.
  // 
  // Slideshow markup looks like this:
  // 
  //   .slideshow
  //     figure: img(...)
  //     figure: img(...)
  // 
  // and is transformed to this
  // 
  //   .slideshow
  //     .slideshow-wrapper
  //       .slideshow-slides
  //         figure: img(...)
  //         figure: img(...)
  //     ul.slideshow-indices
  // 
  // Returns chained element.
  $.fn.slideshow = function() {
    return this.each(function() {
      var $el      = $(this).addClass("slideshow")
        , $wrapper = $("<div class='slideshow-wrapper'>" +
                         "<div class='slideshow-slides'></div>" +
                       "</div>")
        , $slides  = $wrapper.children(".slideshow-slides").css("margin-left", 0)
        , $indices = $("<ul/>", {class: "slideshow-indices"})
        , html     = ["<li class='prev'>&larr;</li>"];
      
      $el.children().detach().appendTo($slides);
      
      
      for (var i = 0; i < slide_count(); i++) {
        html.push("<li class='num'>" + (i + 1) + "</li>");
      }
      html.push("<li class='next'>&rarr;</li>");
      $el
        .append($wrapper)
        .append($indices.html(html.join("")));
      
      $el.find("img").attr("draggable", false);
      $el.find(".num:first").addClass("current");
      
      $el.data("slideshow-slide", 0);
      
      $el.on("slideshow:prev", function() {
        slide_to($el.data("slideshow-slide") - 1);
      });
      $el.on("slideshow:next", function() {
        slide_to($el.data("slideshow-slide") + 1);
      });
      
      // Click on the slide: next slide.
      $el.on("click", ".slideshow-slides", function() {
        $(this).trigger("slideshow:next");
      });
      // Previous slide button.
      $indices.on("click", "li.prev", function() {
        $el.trigger("slideshow:prev");
      });
      // Next slide button.
      $indices.on("click", "li.next", function() {
        $el.trigger("slideshow:next");
      });
      // Slide indices
      $indices.on("click", ".num", function() {
        slide_to(+$(this).text() - 1);
      });
      
      
      // Internal: Get the current slide element.
      function $current() {
        return $slides.find(".current");
      }
      
      // Internal: Get the slide size.
      function slide_width() {
        return $slides.children(":first").width();
      }
      
      // Internal: Get the number of slides.
      function slide_count() {
        return $slides.children().length;
      }
      
      // Internal: Show the slide by index.
      function slide_to(index) {
        if ($el.data("slideshow-stop")) return;
        if (index >= slide_count()) index = 0;
        if (index < 0)              index = slide_count() - 1;
        
        var from_index = $el.data("slideshow-slide")
          , to         = -index * slide_width();
        
        if (index == from_index) return;
        
        $el.data("slideshow-slide", index)
           .data("slideshow-stop", true);
        
        $slides.animate({"margin-left": to}, 500, function() {
          $el.data("slideshow-stop", false);
        });
        // Slide numbering.
        $indices.children(".current").removeClass("current");
        $indices.children(":eq("+ (index + 1) +")").addClass("current");
      }
    });
  };
  
});
