var videoApp = angular.module('videoApp', []);

videoApp.controller('VideoController', ['$scope', '$window', function($scope, $window) {
  $scope.videoDisplay = document.getElementById("videoElement");
  $scope.videoSource = $window.videoSource;
  $scope.titleDisplay = $window.titleDisplay;
  $scope.videoDescription = $window.videoDescription;
}]);