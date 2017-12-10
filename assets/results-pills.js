$(function() {
  var pills = [
    {pill: $('#sentiment-pill'), div: $('#sentiment')},
    {pill: $('#positive-pill'), div: $('#positive')},
    {pill: $('#negative-pill'), div: $('#negative')},
    {pill: $('#neutral-pill'), div: $('#neutral')}
  ];
  pills.forEach(function(e) {
    e['pill'].click(function(event) {
      event.preventDefault();
      if (!e['pill'].hasClass("active")) {
        pills.forEach(function(e2) {
          if (e != e2) {
            e['pill'].addClass("active");
            e2['div'].fadeOut(function() {
              e['div'].fadeIn();
            });
            e2['pill'].removeClass("active");
          }
        });
      }
    });
  });
});
