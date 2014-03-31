window.Site = {
  resize: function () {
    $(".card").height($(window).height());
  }
}

$(function () {
  Site.resize();
  $(window).resize(Site.resize);
});