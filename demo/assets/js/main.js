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
	    
	$("#wrapper").json2html(data,transform); 


	$('.bonsai').bonsai();
}); 
