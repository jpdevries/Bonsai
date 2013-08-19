!function(){for(var a,b=function(){},c=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],d=c.length,e=window.console=window.console||{};d--;)a=c[d],e[a]||(e[a]=b)}();var json2html={transform:function(a,b,c){var d={events:[],html:""},e={events:!1};if(e=json2html._extend(e,c),void 0!==b||void 0!==a){var f="string"==typeof a?JSON.parse(a):a;d=json2html._transform(f,b,e)}return e.events?d:d.html},_extend:function(a,b){var c={};for(var d in a)c[d]=a[d];for(var d in b)c[d]=b[d];return c},_append:function(a,b){var c={html:"",event:[]};return"undefined"!=typeof a&&"undefined"!=typeof b&&(c.html=a.html+b.html,c.events=a.events.concat(b.events)),c},_transform:function(a,b,c){var d={events:[],html:""};if(Array.isArray(a))for(var e=a.length,f=0;e>f;++f)d=json2html._append(d,json2html._apply(a[f],b,f,c));else"object"==typeof a&&(d=json2html._append(d,json2html._apply(a,b,void 0,c)));return d},_apply:function(a,b,c,d){var e={events:[],html:""};if(Array.isArray(b))for(var f=b.length,g=0;f>g;++g)e=json2html._append(e,json2html._apply(a,b[g],c,d));else if("object"==typeof b&&void 0!==b.tag){e.html+="<"+b.tag;var h,i={events:[],html:""};for(var j in b)switch(j){case"tag":break;case"children":if(Array.isArray(b.children))i=json2html._append(i,json2html._apply(a,b.children,c,d));else if("function"==typeof b.children){var k=b.children.call(a,a,c);"object"==typeof k?void 0!==k.html&&void 0!==k.events&&(i=json2html._append(i,k)):"string"==typeof k&&(i.html+=k)}break;case"html":h=json2html._getValue(a,b,"html",c);break;default:var l=!1;if(j.length>2&&"on"==j.substring(0,2).toLowerCase()){if(d.events){var m={action:b[j],obj:a,data:d.eventData,index:c},n=json2html._guid();e.events[e.events.length]={id:n,type:j.substring(2),data:m},e.html+=" json2html-event-id-"+j.substring(2)+"='"+n+"'"}l=!0}if(!l){var o=json2html._getValue(a,b,j,c);if(void 0!==o){var p;p="string"==typeof o?'"'+o.replace(/"/g,"&quot;")+'"':o,e.html+=" "+j+"="+p}}}e.html+=">",h&&(e.html+=h),e=json2html._append(e,i),e.html+="</"+b.tag+">"}return e},_guid:function(){var a=function(){return(0|65536*(1+Math.random())).toString(16).substring(1)};return a()+a()+"-"+a()+a()+"-"+a()+a()},_getValue:function(a,b,c,d){var e="",f=b[c],g=typeof f;if("function"===g)return f.call(a,a,d);if("string"===g){var h=new json2html._tokenizer([/\$\{([^\}\{]+)\}/],function(b,c,d){return c?b.replace(d,function(b,c){for(var d=c.split("."),e=a,f="",g=d.length,h=0;g>h;++h)if(d[h].length>0){var i=e[d[h]];if(e=i,null===e||void 0===e)break}return null!==e&&void 0!==e&&(f=e),f}):b});e=h.parse(f).join("")}else e=f;return e},_tokenizer:function(a,b){return this instanceof json2html._tokenizer?(this.tokenizers=a.splice?a:[a],b&&(this.doBuild=b),this.parse=function(a){this.src=a,this.ended=!1,this.tokens=[];do this.next();while(!this.ended);return this.tokens},this.build=function(a,b){a&&this.tokens.push(this.doBuild?this.doBuild(a,b,this.tkn):a)},this.next=function(){var a,b=this;b.findMin(),a=b.src.slice(0,b.min),b.build(a,!1),b.src=b.src.slice(b.min).replace(b.tkn,function(a){return b.build(a,!0),""}),b.src||(b.ended=!0)},this.findMin=function(){var a,b,c=this,d=0;for(c.min=-1,c.tkn="";void 0!==(a=c.tokenizers[d++]);)b=c.src[a.test?"search":"indexOf"](a),-1!=b&&(-1==c.min||b<c.min)&&(c.tkn=a,c.min=b);-1==c.min&&(c.min=c.src.length)},void 0):new json2html._tokenizer(a,b)}};!function(a){a.fn.json2html=function(b,c,d){if("undefined"==typeof json2html)return void 0;var e={append:!0,replace:!1,prepend:!1,eventData:{}};return void 0!==d&&a.extend(e,d),e.events=!0,this.each(function(){for(var d=json2html.transform(b,c,e),f=a(document.createElement("i")).html(d.html),g=0;g<d.events.length;g++){var h=d.events[g],i=a(f).find("[json2html-event-id-"+h.type+"='"+h.id+"']");if(0===i.length)throw"jquery.json2html was unable to attach event "+h.id+" to DOM";a(i).removeAttr("json2html-event-id-"+h.type),a(i).on(h.type,h.data,function(b){b.data.event=b,b.data.action.call(a(this),b.data)})}e.replace?a.fn.replaceWith.apply(a(this),a(f).children()):e.prepend?a.fn.prepend.apply(a(this),a(f).children()):a.fn.append.apply(a(this),a(f).children())})}}(jQuery);var BonsaiLeaf=function(a,b,c){this.name=a,this.props=b,this.branches=c};$.extend(BonsaiLeaf.prototype,{getBranch:function(a){for(var b=this.branches,c=b.length,d=0;c>d;d++){var e=b[d];if(e.name==a)return e}return null},html:function(a){return $.each(this.branches,function(b,c){a+=c.html(a)}),a},toString:function(){return"name: "+this.name+" branches: "+this.branches}}),$.fn.bonsai=function(a){return $.fn.bonsai.defaults={data:[]},$.fn.bonsai.bonsaiOpts=$.extend({},$.fn.bonsai.defaults,a),$.fn.bonsai.bonsaiOpts.data,$('<ul class="section"></ul>'),this.each(function(){return $(this).find(".folder").each(function(){$(this).children("a").click(function(a){a.preventDefault(),$(this).parent().toggleClass("open"),$(this).parent().hasClass("open")?$(this).find(".icon-folder").removeClass("icon-folder-close").addClass("icon-folder-open"):$(this).find(".icon-folder").removeClass("icon-folder-open").addClass("icon-folder-close")})}),$(this)})},$(document).ready(function(){$(".bonsai").bonsai()});