angular.module('starter.controllers', [])


.controller('ParksCtrl', function($scope, $log, $http, ParkData) {


  $log.info('ParksCtrl Created');

  $http.get('data/data.json')
    .success(function(data, status, headers, config){
      ParkData.initData(data);
      $scope.parks = ParkData.getParks();

    })
    .error(function(data, status, headers, config){
      $log.info('error' + data);
    })


  })

.controller('ParkDetailCtrl', function($scope, $stateParams, $state, $log, ParkData) {
    $log.info('ParksDetailCtrl Created');
    $scope.park = ParkData.getPark($stateParams.parkId);
  })

.controller('MapCtrl', function($scope, $log, ParkData, $state) {
    $log.info('MapCtrl Created');

    $scope.mapCenter = {
      lat: 39.833,
      lng: -98.583,
      zoom: 3
    };

    var theParksData = ParkData.getParks();
    var markerArray = [];

    for (var i = 0; i < theParksData.length; i++) {
      var theParkData = theParksData[i];
      var parkMarker = {
        lat: theParkData.lat,
        lng: theParkData.long,
        icon: {
          iconUrl: 'img/nps_arrowhead.png',
          iconRetinaUrl: 'img/nps_arrowhead@2x.png',
          iconSize: [32, 42],
          iconAnchor: [16, 42]
        },
        park: theParkData
        };
      markerArray.push(parkMarker);
      console.log(markerArray);

      }
    $scope.markers = markerArray;

    $scope.$on('leafletDirectiveMarker.click', function(event, args){
      $state.go('tab.map-details', {
        'parkId': args.model.park.id
      });
    });

  });

