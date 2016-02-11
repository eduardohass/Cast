angular.module('starter.services', [])

.factory('Chats', function($sce) {
  // Might use a resource here that returns a JSON array

  var chats = [];
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var xmlDoc = xmlhttp.responseXML;
      var x = xmlDoc.getElementsByTagName("AUDIO");
      var i;

      for (i = 0; i < x.length; i++) {
        var newElement = {};
        newElement['id'] = getNode(x, "ID", i);
        newElement['name'] = getNode(x, "TITLE", i);
        newElement['lastText'] = getNode(x, "EPISODE", i);
        newElement['face'] = getNode(x, "URL", i);
        newElement['source'] = $sce.trustAsResourceUrl(getNode(x, "FILE", i));
        chats.push(newElement);
      }
    }
  };
  xmlhttp.open("GET", "configuracao.xml", true);
  xmlhttp.send();

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

function getNode(root, name, index) {
  return root[index].getElementsByTagName(name)[0].childNodes[0].nodeValue;
}
