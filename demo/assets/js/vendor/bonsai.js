$.fn.bonsai = function(options) {
	$.fn.bonsai.defaults = {							// default properties
		/*cues:[],
		handleCue:function(_cue) {
		}*/
	};
	
	// merge the provided options with the default options
	$.fn.bonsai.bonsaiOpts = $.extend({}, $.fn.bonsai.defaults, options);

	return this.each(function() {
		$(this).find('.folder').each(function(){
			$(this).children('a').click(function(e){
				e.preventDefault(); // chill out 
				$(this).parent().toggleClass('open'); // toggle it
				if ($(this).parent().hasClass('open')) {
					$(this).find('.icon-folder').removeClass('icon-folder-close').addClass('icon-folder-open');
				} else {
					$(this).find('.icon-folder').removeClass('icon-folder-open').addClass('icon-folder-close');
				}
			});
		});
		return $(this);
	});
};