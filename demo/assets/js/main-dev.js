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



 

		//Transforms

        var transforms = { 
	         
			'barChart': [
		        
					{"tag":"ul","class":"barChart", "children":function() {return(json2html.transform(this.groups,transforms.barChartNode));}}

	        ],
			'barChartNode': [
		       
					{"tag":"li","class":"group","children":[
						{"tag":"a","class":"bar","html":"${value}"},
						{"tag":"ul","class":"barChart", "children":function() {return(json2html.transform(this.groups,transforms.barChartNode));}}
					]}
	       
			]};
    	

    	 //Callback Function
        function getBarChart(json) {  
			console.log(json);  
				//$('#chart').json2html(json);
		}

		getBarChart({'groups':[
			{'value':10,'label':'Day 1',
				'groups':[
					{'value':12,'label':'Day 1',
						'groups':[
							{'value':12,'label':'Day 1'},{'value':7,'label':'Day 2'},{'value':4,'label':'Day 3'},{'value':2,'label':'Day 4'},{'value':0,'label':'Day 5'}
						]
					},{'value':7,'label':'Day 2'},{'value':4,'label':'Day 3'},{'value':2,'label':'Day 4'},{'value':0,'label':'Day 5'}
				]
			},
			{'value':5,'label':'Day 2'},
			{'value':15,'label':'Day 3'},
			{'value':4,'label':'Day 4'},
			{'value':5,'label':'Day 5'}
		]});


    // create a new bonsai
    var mytree = new $.bonsai($('.bonsai'));

    // call a public method
    //myplugin.foo_public_method();

    // get the value of a public property
    //myplugin.settings.property;
});  
