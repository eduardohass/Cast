angular.module('starter.controllers', [])

.controller('TabCtrl', function($scope, Chats) {}) {

  $scope.chats = Chats.all();

}

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, $sce) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();

  $scope.setAudio = function(_id) {

    var xmlDoc;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        xmlDoc = xmlhttp.responseXML;
        var x = xmlDoc.getElementsByTagName("AUDIO");
        var i;

        for (i = 0; i < x.length; i++) {
          var id = x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
          if (id == _id) {
            var source = x[i].getElementsByTagName("FILE")[0].childNodes[0].nodeValue;
            $scope.tst = source;
            console.log($scope.tst);
          }
        }
      }
    };
    xmlhttp.open("GET", "configuracao.xml", true);
    xmlhttp.send();


  };




})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
