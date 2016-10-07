
angular.module('services', [])
.service('sesion', function(){
  var tokken = function(date){
     localStorage.usertokken = date;
//     console.log('Tokken de usuario ' + localStorage.usertokken); 
     console.log('date ' + date); 

    }
    var showtokken = function(){
     return localStorage.usertokken;
    }
  var save = function(list){
      localStorage.userdates = JSON.stringify(list);
      console.log('Se ha Guardado');
      // console.log(localStorage.noticias);
  }
  
  var show = function(){
       var list = angular.fromJson(localStorage.userdates);
           console.log(list);
        return list;
    }
    return{
     save: save,
     show: show,
     tokken:tokken,
     showtokken: showtokken
    }
})

//        	401758614
//        	Kevis12345

//08-15 10:05:11.796 11668-11668/com.ionicframework.neopago861433 E/Web Console: TypeError: Cannot read property 'error' of null