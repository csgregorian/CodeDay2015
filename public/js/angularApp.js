var app = angular.module('CodeDay2015', []);

function fuzzyMatch(searchSet, query) {
 // STOLEN WITH LOVE FROM JSFIDDLE
 	if (query == undefined) {
 		query = '';
 	}
	var tokens = query.toLowerCase().split(''),
		matches = [];

	searchSet.forEach(function(string) {
		name = string.name;
		var tokenIndex = 0,
			stringIndex = 0,
			matchWithHighlights = '',
			matchedPositions = [];

		l_name = name.toLowerCase();

		while (stringIndex < l_name.length) {
			if (l_name[stringIndex] === tokens[tokenIndex]) {
				matchedPositions.push(stringIndex);
				tokenIndex++;

				if (tokenIndex >= tokens.length) {
					matches.push(string);

					break;
				}
			}
			else {
				matchWithHighlights += l_name[stringIndex];
			}

			stringIndex++;
		}
	});

	return matches;
}


app.controller('main', [
	'$scope', '$http',
	function($scope, $http) {
		$scope.commands = ["New Order", "Price Check", "Inventory Check"];

		$http.get('http://localhost:3000/api/items').
		then(function(res) {
			$scope.items = res.data;

			console.log($scope.items);
		});

		$scope.keyPress = function(keyEvent) {
			console.log(keyEvent.which);
		}

		$scope.searchItems = function(query) {
			console.log(query);
			if (query == "" || query == "*") {
				$scope.selected_items = $scope.items;
			}
			$scope.selected_items = fuzzyMatch($scope.items, query);
		}
	}


]);