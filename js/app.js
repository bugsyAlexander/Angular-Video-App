var videoApp = angular.module('videoApp', []);

videoApp.controller('VideoController', ['$scope', '$window', '$interval', function($scope, $window, $interval) {
  $scope.videoDisplay = document.getElementById('videoElement');
  $scope.videoSource = $window.videoSource;
  $scope.titleDisplay = $window.titleDisplay;
  $scope.videoDescription = $window.videoDescription;
  $scope.videoPlaying = false;
  $scope.currentTime;
  $scope.totalTime;
  // Progress bar
  $scope.scrubTop = -1000;
  $scope.scrubLeft = -1000;
  $scope.vidHeightCenter = -1000;
  $scope.vidWidthCenter = -1000;

  $interval(function(){
      var t = $scope.videoDisplay.currentTime;
      var d = $scope.videoDisplay.duration;
      var w = t / d * 100;
      var p = document.getElementById('progressMeterFull').offsetLeft + document.getElementById('progressMeterFull').offsetWidth;
      $scope.scrubLeft = (t / d * p) - 7;
      $scope.updateLayout();
  },100);

  // Time duration
  $scope.initPlayer = function () {
    $scope.currentTime = 0;
    $scope.totalTime = 0;
    $scope.videoDisplay.addEventListener('timeupdate', $scope.updateTime, true);
    $scope.videoDisplay.addEventListener('loadedmetadata', $scope.updateData, true);
  };

  $scope.updateTime = function (e) {
    $scope.currentTime = e.target.currentTime;
    // stop and rewind video
    if($scope.currentTime == $scope.totalTime) {
      $scope.videoDisplay.pause();
      $scope.videoPlaying = false;
      $scope.currentTime = 0;
      $('#playBtn').children("span").toggleClass("glyphicon-play", true);
      $('#playBtn').children("span").toggleClass("glyphicon-pause", false);
    }
  };

  $scope.updateData = function (e) {
    $scope.totalTime = e.target.duration;
  };

  $scope.updateLayout = function() {
      $scope.scrubTop = document.getElementById('progressMeterFull').offsetTop - 2;
      $scope.vidHeightCenter =  $scope.videoDisplay.offsetHeight / 2 - 50;
      $scope.vidWidthCenter = $scope.videoDisplay.offsetWidth / 2 - 50;
      if(!$scope.$$phase) {
          $scope.$apply();
      }
  }

  // Playback and mute controls
  $scope.togglePlay = function () {
    if ($scope.videoDisplay.paused) {
      $scope.videoDisplay.play();
      $scope.videoPlaying = true;
      $('#playBtn').children('span').toggleClass('glyphicon-play', false);
      $('#playBtn').children('span').toggleClass('glyphicon-pause', true);
    } else {
      $scope.videoDisplay.pause();
      $scope.videoPlaying = false;
      $('#playBtn').children('span').toggleClass('glyphicon-play', true);
      $('#playBtn').children('span').toggleClass('glyphicon-pause', false);
    }
  }; // togglePlay

  $scope.toggleMute = function () {
    if ($scope.videoDisplay.volume == 0.0) {
      $scope.videoDisplay.volume = 1.0;
      $('#muteBtn').children('span').toggleClass('glyphicon-volume-up', true);
      $('#muteBtn').children('span').toggleClass('glyphicon-volume-off', false);
    } else {
      $scope.videoDisplay.volume = 0.0;
      $('#muteBtn').children('span').toggleClass('glyphicon-volume-up', false);
      $('#muteBtn').children('span').toggleClass('glyphicon-volume-off', true);
    }
  }; // toggleMute

  $scope.initPlayer();
  
}]);

videoApp.filter('time', function() {
    return function(seconds) {
        var hh = Math.floor(seconds / 3600), mm = Math.floor(seconds / 60) % 60, ss = Math.floor(seconds) % 60;
        return hh + ":" + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
    };
});