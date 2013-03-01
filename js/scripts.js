$(window).load(function(){

  var body = $('body'),
      universe = $('#universe'),
      solarsys = $('#solar-system'),
      zoomIn = false;

  function centerCamera() {
    var universeW = universe.width();
    var universeH = universe.height();
    if (!zoomIn) {
      universe.scrollLeft(universeW/2);
    } else {
      universe.scrollLeft(universeW*2);
    }
    universe.scrollTop(universeH/2);
  }

  var init = function() {
    centerCamera();
    body.removeClass('view-2D opening').addClass('view-3D').delay(2000).queue(function() {
      $(this).removeClass('hide-UI').addClass('set-speed');
      $(this).dequeue();
    });
  };

  var setView = function(view) { universe.removeClass().addClass(view); };

  $('#toggle-data').on('click', function(e) {
    body.toggleClass('data-open data-close');
    e.preventDefault();
  });

  $('#toggle-controls').on('click', function(e) {
    body.toggleClass('controls-open controls-close');
    e.preventDefault();
  });

  $('#data a').on('click', function(e) {
    var ref = $(this).attr('class');
    solarsys.removeClass().addClass(ref);
    $(this).parent().find('a').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });

  $('.set-view').on('click', function() { body.toggleClass('view-3D view-2D'); centerCamera(); });
  $('.set-zoom').on('click', function() { body.toggleClass('zoom-large zoom-close'); zoomIn = !zoomIn; centerCamera(); });
  $('.set-speed').on('click', function() { centerCamera(); setView('scale-stretched set-speed'); });
  $('.set-size').on('click', function() { centerCamera(); setView('scale-s set-size'); });
  $('.set-distance').on('click', function() { centerCamera(); setView('scale-d set-distance'); });
  $('.range-zoom').on('change', function() {
    var zoom = $(this).attr('value');
    body.css('font-size',zoom+'px');
  });

  init();

});