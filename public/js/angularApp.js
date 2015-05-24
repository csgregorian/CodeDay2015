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
		// Starting commands
		$scope.current_view = ["commands", "items", "subtotal"];
		$scope.commands = ["New Order", "New Item"];
		$scope.items = ["Hamburger", "Hot Dog", "French Fries"];
		$scope.subtotal = ["Quantity", "Price"];



		$scope.keyPress = function(keyEvent) {
			var k = {left:37, up:38, right:39, down:40, enter:13, escape:27};
			var code = keyEvent.which;
		}

		$scope.searchItems = function(query) {
			if (query == "" || query == "*") {
				$scope.selected_items = $scope.items;
			}
			$scope.selected_items = fuzzyMatch($scope.items, query);

			$scope.max = $scope.selected_items.length - 1;
			$scope.cursor = 0;
		}
	}


]);