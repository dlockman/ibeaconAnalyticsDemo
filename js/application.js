// Some general UI pack related JS
// Extend JS String with repeat method
String.prototype.repeat = function(num) {
    return new Array(num + 1).join(this);
};
(function($) {

  // Add segments to a slider
  $.fn.addSliderSegments = function (amount) {
    return this.each(function () {
      var segmentGap = 100 / (amount - 1) + "%"
        , segment = "<div class='ui-slider-segment' style='margin-left: " + segmentGap + ";'></div>";
      $(this).prepend(segment.repeat(amount - 2));
    });
  };

  $(function() {
  
    // Todo list
    $(".todo li").click(function() {
        $(this).toggleClass("todo-done");
    });

    // Custom Selects
    $("select[name='huge']").selectpicker({style: 'btn-hg btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='herolist']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='info']").selectpicker({style: 'btn-info'});

    // Tooltips
    $("[data-toggle=tooltip]").tooltip("show");

    // Tags Input
    $(".tagsinput").tagsInput();

    // jQuery UI Sliders
    var $slider = $("#slider");
    if ($slider.length) {
      $slider.slider({
        min: 1,
        max: 5,
        value: 2,
        orientation: "horizontal",
        range: "min"
      }).addSliderSegments($slider.slider("option").max);
    }

    // Placeholders for input/textarea
    $("input, textarea").placeholder();

    // Make pagination demo work
    $(".pagination a").on('click', function() {
      $(this).parent().siblings("li").removeClass("active").end().addClass("active");
    });

    $(".btn-group a").on('click', function() {
      $(this).siblings().removeClass("active").end().addClass("active");
    });

    // Disable link clicks to prevent page scrolling
    $('a[href="#fakelink"]').on('click', function (e) {
      e.preventDefault();
    });

    // Switch
    $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();

    // Push right
    var 
        menuLeft = document.getElementById( 'cbp-spmenu-s1' ), 
        showLeftPush = document.getElementById( 'showLeftPush' ),
        body = document.body;

      showLeftPush.onclick = function() {
        classie.toggle( this, 'active' );
        classie.toggle( body, 'cbp-spmenu-push-toright' );
        classie.toggle( menuLeft, 'cbp-spmenu-open' );
        disableOther( 'showLeftPush' );
      };

      function disableOther( button ) {
        if( button !== 'showLeftPush' ) {
          classie.toggle( showLeftPush, 'disabled' );
        }
      }

    // $('#update-button').on('click', function (e) {
    //   var check1 = $("label[for='"+$('#checkbox1').attr('id')+"']").hasClass('checked');
    //   var check2 = $("label[for='"+$('#checkbox2').attr('id')+"']").hasClass('checked');
    //   var check3 = $("label[for='"+$('#checkbox3').attr('id')+"']").hasClass('checked');
    //   var timeChoice = $('input[name=group1]:checked').val();
    //   createHeatMap(check1,check2,check3,timeChoice);
    // });

    // Tooltip
    $('#example').popover()

    //$('#accordion').accordion();

    var openPanel = $('#heatmapOptions');
    var allPanels = $('#accordion > .control').hide();


    $('#accordion > h3').click(function() {
      allPanels.slideUp();
      openPanel = $(this).next();
      $(this).next().slideDown();
      $('#checkbox1').change();
      return false;
    });

    $('input').on('change', function (e) {
      
      $( '#mapArea' ).replaceWith( '<div class="map" id="mapArea"><img src="images/background.png" alt=""></div>"' );
      if(openPanel.attr('id') == "heatmapOptions")
      {
        var check1 = $("label[for='"+$('#checkbox1').attr('id')+"']").hasClass('checked');
        var check2 = $("label[for='"+$('#checkbox2').attr('id')+"']").hasClass('checked');
        var check3 = $("label[for='"+$('#checkbox3').attr('id')+"']").hasClass('checked');
        var timeChoice = $('input[name=group1]:checked').val();
        generateHeatMap(check1,check2,check3,timeChoice);
      }
      else
      {
        var conversionChoice = $('input[name=group2]:checked').val();
        if(conversionChoice == 1)
        {
          $( '#mapArea' ).replaceWith( '<div class="map" id="mapArea"><img src="images/plan-a.png" alt=""></div>"' );
        }
        else if(conversionChoice ==2)
        {
          $( '#mapArea' ).replaceWith( '<div class="map" id="mapArea"><img src="images/plan-b.png" alt=""></div>"' );
        }
        else
        {
          $( '#mapArea' ).replaceWith( '<div class="map" id="mapArea"><img src="images/compare.png" alt=""></div>"' );
        }
      }
    });

    $('.active-menu').slideDown();
    $('#heatmapOptions').slideDown();
    $('#checkbox1').change();

  });
  
})(jQuery);
