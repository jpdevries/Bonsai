// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

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

var json2html = {
	
	/* ---------------------------------------- Public Methods ------------------------------------------------ */
	'transform': function(json,transform,_options) {
		
		//create the default output
		var out = {'events':[],'html':''};
		
		//default options (by default we don't allow events)
		var options = {
			'events':false
		};
		
		//extend the options
		options = json2html._extend(options,_options);

		//Make sure we have a transform & json object
		if( transform !== undefined || json !== undefined ) {

			//Normalize strings to JSON objects if necessary
			var obj = typeof json === 'string' ? JSON.parse(json) : json;
			
			//Transform the object (using the options)
			out = json2html._transform(obj, transform, options);
		}
		
		//determine if we need the events
		// otherwise return just the html string
		if(options.events) return(out);
			else return( out.html );
	},
	
	/* ---------------------------------------- Private Methods ------------------------------------------------ */
	
	//Extend options
	'_extend':function(obj1,obj2){
		var obj3 = {};
		for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
		for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
		return obj3;
	},
	
	//Append results
	'_append':function(obj1,obj2) {
		var out = {'html':'','event':[]};
		if(typeof obj1 !== 'undefined' && typeof obj2 !== 'undefined') {
			out.html = obj1.html + obj2.html;

			out.events = obj1.events.concat(obj2.events);
		}

		return(out);
	},
	
	//Transform object
	'_transform':function(json, transform, options) {
		
		var elements = {'events':[],'html':''};
		
		//Determine the type of this object
		if(Array.isArray(json)) {
			
			//Itterrate through the array and add it to the elements array
			var len=json.length;
			for(var j=0;j<len;++j) {	
				//Apply the transform to this object and append it to the results
				elements = json2html._append(elements,json2html._apply(json[j], transform, j, options));
			}

		} else if(typeof json === 'object') {

			//Apply the transform to this object and append it to the results
			elements = json2html._append(elements,json2html._apply(json, transform, undefined, options));
		}

		//Return the resulting elements
		return(elements);		
	},

	//Apply the transform at the second level
	'_apply':function(obj, transform, index, options) {

		var element = {'events':[],'html':''};
		
		//Itterate through the transform and create html as needed
		if(Array.isArray(transform)) {
			
			var t_len = transform.length;
			for(var t=0; t < t_len; ++t) {
				//transform the object and append it to the output
				element = json2html._append(element,json2html._apply(obj, transform[t], index, options));
			}

		} else if(typeof transform === 'object') {

			//Get the tag element of this transform
			if( transform.tag !== undefined ) {

				//Create a new element
				element.html += '<' + transform.tag;
				
				//Create a new object for the children
				var children = {'events':[],'html':''};
				
				//innerHTML
				var html;

				//Look into the properties of this transform
				for (var key in transform) {

					switch(key) {
						case 'tag':
							//Do nothing as we have already created the element from the tag
						break;

						case 'children':
							//Add the children
							if(Array.isArray(transform.children)) {

								//Apply the transform to the children
								children = json2html._append(children,json2html._apply(obj, transform.children, index, options));
							} else if(typeof transform.children === 'function') {
								
								//Get the result from the function
								var temp = transform.children.call(obj, obj, index);

								//Make sure we have an object result with the props
								// html (string), events (array)
								// OR a string (then just append it to the children
								if(typeof temp === 'object') {
									//make sure this object is a valid json2html response object
									if(temp.html !== undefined && temp.events !== undefined) children = json2html._append(children,temp);
								} else if(typeof temp === 'string') {

									//append the result directly to the html of the children
									children.html += temp;
								}
							}
						break;

						case 'html':
							//Create the html attribute for this element
							html = json2html._getValue(obj,transform,'html',index);
						break;

						default:
							//Add the property as a attribute if it's not a key one
							var isEvent = false;
							
							//Check if the first two characters are 'on' then this is an event
							if( key.length > 2 )
								if(key.substring(0,2).toLowerCase() == 'on') {
									
									//Determine if we should add events
									if(options.events) {

										//if so then setup the event data
										var data = {
											'action':transform[key],
											'obj':obj,
											'data':options.eventData,
											'index':index
										};
										
										//create a new id for this event
										var id = json2html._guid();

										//append the new event to this elements events
										element.events[element.events.length] = {'id':id,'type':key.substring(2),'data':data};

										//Insert temporary event property (json2html-event-id) into the element
										element.html += " json2html-event-id-"+key.substring(2)+"='" + id + "'";
									}
									//this is an event
									isEvent = true;
								}

							//If this wasn't an event AND we actually have a value then add it as a property
							if( !isEvent){
								//Get the value
								var val = json2html._getValue(obj, transform, key, index);
								
								//Make sure we have a value
                                if(val !== undefined) {
                                    var out;
                                    
                                    //Determine the output type of this value (wrap with quotes)
                                    if(typeof val === 'string') out = '"' + val.replace(/"/g, '&quot;') + '"';
                                    else out = val;
                                    
                                    //creat the name value pair
								    element.html += ' ' + key + '=' + out;
                                }
							}
						break;
					}
				}

				//close the opening tag
				element.html += '>';
				
				//add the innerHTML (if we have any)
				if(html) element.html += html;

				//add the children (if we have any)
				element = json2html._append(element,children);

				//add the closing tag
				element.html += '</' + transform.tag + '>';
			}
		}
		
		//Return the output object
		return(element);
	},

	//Get a new GUID (used by events)
	'_guid':function() {
		var S4 = function() {
		   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4()+"-"+S4()+S4()+"-"+S4()+S4());
	},

	//Get the html value of the object
	'_getValue':function(obj, transform, key,index) {
		
		var out = '';
		
		var val = transform[key];
		var type = typeof val;
		
		if (type === 'function') {
			return(val.call(obj,obj,index));
		} else if (type === 'string') {
			var _tokenizer = new json2html._tokenizer([
				/\$\{([^\}\{]+)\}/
			],function( src, real, re ){
				return real ? src.replace(re,function(all,name){
					
					//Split the string into it's seperate components
					var components = name.split('.');

					//Set the object we use to query for this name to be the original object
					var useObj = obj;

					//Output value
					var outVal = '';
					
					//Parse the object components
					var c_len = components.length;
					for (var i=0;i<c_len;++i) {

						if( components[i].length > 0 ) {

							var newObj = useObj[components[i]];
							useObj = newObj;
							if(useObj === null || useObj === undefined) break;
						}
					}
					
					//As long as we have an object to use then set the out
					if(useObj !== null && useObj !== undefined) outVal = useObj;

					return(outVal);
				}) : src;
			});
			
			out = _tokenizer.parse(val).join('');
		} else {
			out = val;
		}

		return(out);
	},
	
	//Tokenizer
	'_tokenizer':function( tokenizers, doBuild ){

		if( !(this instanceof json2html._tokenizer ) )
			return new json2html._tokenizer( tokenizers, doBuild );
			
		this.tokenizers = tokenizers.splice ? tokenizers : [tokenizers];
		if( doBuild )
			this.doBuild = doBuild;

		this.parse = function( src ){
			this.src = src;
			this.ended = false;
			this.tokens = [ ];
			do {
				this.next();
			} while( !this.ended );
			return this.tokens;
		};
		
		this.build = function( src, real ){
			if( src )
				this.tokens.push(
					!this.doBuild ? src :
					this.doBuild(src,real,this.tkn)
				);	
		};

		this.next = function(){
			var self = this,
				plain;
				
			self.findMin();
			plain = self.src.slice(0, self.min);
			
			self.build( plain, false );
				
			self.src = self.src.slice(self.min).replace(self.tkn,function( all ){
				self.build(all, true);
				return '';
			});
			
			if( !self.src )
				self.ended = true;
		};

		this.findMin = function(){
			var self = this, i=0, tkn, idx;
			self.min = -1;
			self.tkn = '';
			
			while(( tkn = self.tokenizers[i++]) !== undefined ){
				idx = self.src[tkn.test?'search':'indexOf'](tkn);
				if( idx != -1 && (self.min == -1 || idx < self.min )){
					self.tkn = tkn;
					self.min = idx;
				}
			}
			if( self.min == -1 )
				self.min = self.src.length;
		};
	}
};

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

// BonsaiLeaf class, holds a name and one or more UPCDTO objects
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

$.fn.bonsai = function(options) {
	$.fn.bonsai.defaults = {							// default properties
		data:[],
		/*cues:[],
		handleCue:function(_cue) {
		}*/
	};
	
	// merge the provided options with the default options
	$.fn.bonsai.bonsaiOpts = $.extend({}, $.fn.bonsai.defaults, options);
	var _data = $.fn.bonsai.bonsaiOpts.data;
	
	var _html = $('<ul class="section"></ul>');
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
//@codekit-prepend "vendor/json2html.js";
//@codekit-prepend "vendor/jquery.json2html.js";
//@codekit-prepend "vendor/bonsai.js";

$(document).ready(function(){

	/*var tree = [new BonsaiLeaf('Templates',{"class":"folder","href":""},[
		new BonsaiLeaf('Navigation',{"class":"folder","href":""},[
			new BonsaiLeaf('header',{"class":"icon-columns","href":""},[])
		])
	])];*/
	
	//var transform = {'tag':'li','html':'${name} (${age})'};
var transform = {'tag':'li','html':'${name} (${age})','children':[
	{'tag':'span','html':'${name} (${age})'}
]};
    
var data = [
    {'name':'Bob','age':40,'children':[
    	{'name':'John','age':23}
    ]}
];  
	    
	//$("#wrapper").json2html(data,transform); 


	$('.bonsai').bonsai();
}); 
