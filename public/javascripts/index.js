$('.dropdown__content').addClass('hidden');

$('.dropdown').click(function(e) {
  $('.dropdown__content', this).toggleClass('hidden');
});
