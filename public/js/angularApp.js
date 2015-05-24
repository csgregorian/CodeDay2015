var app = angular.module('CodeDay2015', []);

function fuzzyMatch(searchSet, query) {
 // STOLEN WITH LOVE FROM 
	var tokens = query.toLowerCase().split(''),
		matches = [];

	searchSet.forEach(function(string) {
		var tokenIndex = 0,
			stringIndex = 0,
			matchWithHighlights = '',
			matchedPositions = [];

		string = string.toLowerCase();

		while (stringIndex < string.length) {
			if (string[stringIndex] === tokens[tokenIndex]) {
				matchWithHighlights += highlight(string[stringIndex]);
				matchedPositions.push(stringIndex);
				tokenIndex++;

				if (tokenIndex >= tokens.length) {
					matches.push({
						match: string,
						highlighted: matchWithHighlights + string.slice(stringIndex + 1),
						positions: matchedPositions
					});

					break;
				}
			}
			else {
				matchWithHighlights += string[stringIndex];
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
		$scope.items = [];

		$http.get('http://localhost:3000/api/items').
		then(function(res) {
			$scope.items = res.data;

			console.log($scope.items);
		});
		$scope.modifiers = [];

		$scope.selected_items = [];
	}

	
]);