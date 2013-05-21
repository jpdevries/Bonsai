$(document).ready(function(){
	$('.bonsai .folder').each(function(){
		$(this).children('a').click(function(e){
			e.preventDefault();  
			$(this).parent().toggleClass('open');
			if ($(this).parent().hasClass('open')) {
				$(this).find('.icon-folder').removeClass('icon-folder-close').addClass('icon-folder-open');
			} else {
				$(this).find('.icon-folder').removeClass('icon-folder-open').addClass('icon-folder-close');
			}
			
		});
	});
});
