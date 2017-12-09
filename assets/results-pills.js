$(function() {
  var pills = [
    {pill: $('#sentiment-pill'), div: $('#sentiment')},
    {pill: $('#geography-pill'), div: $('#geography')}
  ];
  pills.forEach(function(e) {
    e['pill'].click(function(event) {
      event.preventDefault();
      if (!e['pill'].hasClass("active")) {
        pills.forEach(function(e2) {
          if (e != e2) {
            e2['div'].fadeOut();
            e2['pill'].removeClass("active");
          }
        });
        e['pill'].addClass("active");
        e['div'].fadeIn();
      }
    });
  });
});
