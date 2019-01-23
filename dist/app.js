angular.module('app', [])
	.controller('NationController', function($scope, $http) {
		angular.extend(this, { setChannelsCount: setChannelsCount, setDevicesCount: setDevicesCount })
		$scope.initialize = function() { //Get the data from JSON file
			$http({
				method: 'GET',
				url: '../data.json'
			}).then(function datacallGood(response) { //If GET method is successful, proceed
				$scope.nations = Object.keys(response.data).map(nat => ({
					nation: nat,
					data: response.data[nat]
				}))
				
				//Map the json data to app controller
				$scope.selectedNation = $scope.nations
				$scope.channels = setChannelsCount(response.data)
				$scope.devices = setDevicesCount(response.data)

			}), function datacallBad(response) { //If GET method is unsuccessful, throw an error
				console.log('Error a-100: data has not loaded from JSON file.')
			}
		}

		function setChannelsCount(data) { //Count the total number of channels in the nation data
			var channels = 0
			Object.values(data).map(function(cha){ //Find channels in JSON data
				channels += cha.Channels
			})
			return channels
		}

		function setDevicesCount(data) { //Count the total number of devices in the nation data
			var devices = 0
			Object.values(data).map(function(dev){ //Find devises in JSON data
				devices += dev.Devices
			})
			return devices
		}

		$scope.updateNation = function() { //Make a dropdown to select a particular nation
			$scope.selectedNation = []
			if($scope.nationSelected === null){
				$scope.selectedNation = $scope.nations //Return data about selected nation only
			} else {
				$scope.selectedNation.push($scope.nationSelected)
			}
		}
	})
