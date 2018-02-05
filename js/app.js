var app=angular.module("myapp",[]);

app.run(function($rootScope){
	$rootScope.title="JSON Maker";
})

app.controller("mycontroller",function($scope){
	$scope.title="JSON Maker";
	$scope.ddcount=["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];
	$scope.selecteddd=$scope.ddcount[0];
	$scope.lessonname='';
	$scope.wide=["yes","no"];
	$scope.type=["video","act"];
	$scope.markers=["no","yes"];
	$scope.audio=["yes","no"];
	$scope.dataCaptured=["true","false"];
	$scope.images=["examples","activity","introduction","info"];
	$scope.lessonId="";

	$scope.lessontype="video";

	$scope.menudata={	
		"name":{
			"lessonName":""
		},
		"dropDowns":{
			
		}
	};

	$scope.hasChanged=function(){

		Object.size = function(obj) {
			var size = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) size++;
			}
			return size;
		};

		var size = Object.size($scope.menudata.dropDowns);

		//console.log("hasChanged"+size+" "+$scope.selecteddd);
		for(var j=1;j<=size;j++){
			if(j>$scope.selecteddd){
				//console.log("deleted "+j);
				delete $scope.menudata.dropDowns[j]
			}else{
				//$scope.menudata.dropDowns[j].uri=$scope.lessonId+"_dd"+[j];
			}
		} 
	}

	$scope.ddclick=function () {
		// body...
		var arr=[];
		
		for(var i=0;i<$scope.selecteddd;i++){
			arr[i]=$scope.ddcount[i];
		}

		// $('html, body').animate({
		// 	'scrollTop' : $("#buttondiv").position().top
		// });
		$(".flex-container").fadeIn(2000);
		//console.log(arr);
		return arr;
	}

	$scope.clear=function(){
		$scope.selecteddd=$scope.ddcount[0];
		$scope.lessonId="";
		$scope.menudata={	
			"name":{
				"lessonName":""
			},
			"dropDowns":{

			}
		};
	} 

	$scope.removemarkersFn=function(data){
		var sg=data.dropDowns;

		//console.log(data.dropDowns)
		for(var i in sg){
			//console.log(sg[i])
			if(sg[i].type=="video" && sg[i].markers=="no"){
				delete sg[i].markers;
				delete sg[i].dataCaptured;
			}
			if(sg[i].type=="act" && sg[i].markers=="no"){
				delete sg[i].markers;
				delete sg[i].length;
			}
			if(sg[i].path==""){
				delete sg[i].path;
			}
		}
		return data;
	}

	$scope.jsoncreate=function(){
		var jsondata;

		jsondata=$scope.removemarkersFn($scope.menudata);
		//jsondata=$scope.menudata;

		function encode( s ) {
			var out = [];
			for ( var i = 0; i < s.length; i++ ) {
				out[i] = s.charCodeAt(i);
			}
			return new Uint8Array( out );
		}

		//alert("json created")

		var x = document.getElementById("snackbar")
		x.className = "show";
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);


		//console.log(jsondata);
		var data = encode( JSON.stringify(jsondata, null, 4) );

		var blob = new Blob( [ data ], {
			type: 'application/octet-stream'
		});

		url = URL.createObjectURL( blob );
		var link = document.createElement( 'a' );
		link.setAttribute( 'href', url );
		var sg=String($scope.lessonId);
		link.setAttribute( 'download', sg+'.json' );

		var event = document.createEvent( 'MouseEvents' );
		event.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
		link.dispatchEvent( event );
	}

})