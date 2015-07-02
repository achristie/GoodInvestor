app.controller('TestCtrl', function ($scope) {
	$scope.choices = [
		"Fidelity Management & Research Company",
		"Nuveen Asset Management",
		"PIMCO - Pacific Investment Management Company",
		"Andrew Christie",
		"Janus Capital Management",
		"aaaa Test Text"
	];
	$scope.t = $scope.choices[0];

	$scope.click = function (c) {
		$scope.t = c;
	}
});