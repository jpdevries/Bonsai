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
         function getBarChart(json)

		 {
	        
			if(json !== undefined )

				$('#chart').json2html(json, transforms.barChart);

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


	//$('.bonsai').bonsai();
});  
