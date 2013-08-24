// BonsaiLeaf class, holds a name and one or more UPCDTO objects
// http://stefangabos.ro/jquery/jquery-plugin-boilerplate-oop/
// 
;(function($) {

    $.bonsai = function(el, options) {

	var defaults = {							// default properties
		data:[],
		folderClass:'folder',
		folderIconClass:'',
		folderIconOpenClass:'',
		folderIconCloseClass:''

		/*
		handleCue:function(_cue) {
		}*/
	};


	var BonsaiLeaf = function(_name, _props, _branches) {
		this.name = _name;
		this.props = _props;
		this.branches = _branches;
	};

	$.extend(BonsaiLeaf.prototype,{
		// provided a size, returns the associated UPC barcode
		getBranch:function(_name) {
			var _branches = this.branches;
			var l = _branches.length;
			for(var i = 0; i < l; i++) {
				var _u = _branches[i];
				if(_u.name == _name) return _u;
			}
			return null; 
		},html:function(_s){
			$.each(this.branches,function(i,v){
				_s += v.html(_s);
			});
			return _s;
		},
		toString:function() {
			return "name: " + this.name + " branches: " + this.branches;
		}
	});


	var plugin = this;

	plugin.settings = {}

	var init = function() { 
		// merge the provided options with the default options
		plugin.settings = $.extend({},defaults, options);
		plugin.el = el; 

		var _data = plugin.settings.data;
		var _html = $('<ul class="section"></ul>');
	}   

    plugin.foo_public_method = function() {
        // code goes here
    }

    var foo_private_method = function() {
        // code goes here
    }

	init();

	/*
	var l = _data.length;
	for(var i = 0; i < l; i++) {
		growBranches(_data[i]);
	}
	*/
	/*$.each(_data,function(i,v){
		growBranches(v);
	});
	
	function growBranches(_data) {
		console.log(_data.branches);
		var l = _data.branches.length;
		for(var i = 0; i < l; i++) {
			growBranches(_data.branches[i]);
		}
	}*/

	return plugin.el.each(function() {
		$(this).find('.' + plugin.settings.folderClass).each(function(){
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


    }

})(jQuery);