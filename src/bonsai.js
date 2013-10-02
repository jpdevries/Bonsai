//Copyright (c) 2013 Crystalline Technologies
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'),
//  to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
//  and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
//  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function($){	

	//Main method
	$.fn.json2html = function(json, transform, _options){	
		
		//Make sure we have the json2html base loaded
		if(typeof json2html === 'undefined') return(undefined);

		//Default Options
		var options = {
			'append':true,
			'replace':false,
			'prepend':false,
			'eventData':{}
		};

		//Extend the options (with defaults)
		if( _options !== undefined ) $.extend(options, _options);

		//Insure that we have the events turned (Required)
		options.events = true;
		
		//Make sure to take care of any chaining
		return this.each(function(){ 
			
			//let json2html core do it's magic
			var result = json2html.transform(json, transform, options);
			
			//Attach the html(string) result to the DOM
			var dom = $(document.createElement('i')).html(result.html);

			//Determine if we have events
			for(var i = 0; i < result.events.length; i++) {
				
				var event = result.events[i];

				//find the associated DOM object with this event
				var obj = $(dom).find("[json2html-event-id-"+event.type+"='" + event.id + "']");

				//Check to see if we found this element or not
				if(obj.length === 0) throw 'jquery.json2html was unable to attach event ' + event.id + ' to DOM';
				
				//remove the attribute
				$(obj).removeAttr('json2html-event-id-'+event.type);

				//attach the event
				$(obj).on(event.type,event.data,function(e){
					//attach the jquery event
					e.data.event = e;

					//call the appropriate method
					e.data.action.call($(this),e.data);
				});
			}

			//Append it to the appropriate element
			if (options.replace) $.fn.replaceWith.apply($(this),$(dom).children());
			else if (options.prepend) $.fn.prepend.apply($(this),$(dom).children());
			else $.fn.append.apply($(this),$(dom).children());
		});
	};
})(jQuery);

// http://stefangabos.ro/jquery/jquery-plugin-boilerplate-oop/

;(function($) {

    $.bonsai = function(el, options) {

		var defaults = {							// default properties
			data:[],
			folderClass:'folder',
			folderIconClass:'icon-folder',
			folderIconOpenClass:'icon-folder-open',
			folderIconCloseClass:'icon-folder-close'

			/*
			handleCue:function(_cue) {
			}*/
		};

		/*var BonsaiLeaf = function(_name, _props, _branches) {
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
		});*/

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
			$(this).find('.' + plugin.settings.folderClass).each(function(){ // each li.folder
				$(this).children('a').click(function(e){
					e.preventDefault(); // chill out 
					$(this).parent().toggleClass('open'); // toggle it
					if ($(this).parent().hasClass('open')) {
						$(this).find('.' + plugin.settings.folderIconClass).removeClass(plugin.settings.folderIconCloseClass).addClass(plugin.settings.folderIconOpenClass);
					} else {
						$(this).find('.' + plugin.settings.folderIconClass).removeClass(plugin.settings.folderIconOpenClass).addClass(plugin.settings.folderIconOpenClass);
					}
				});
			});
			return $(this);
		});

    }

})(jQuery);