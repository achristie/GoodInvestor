app.directive('ipreoAnimatedText', function ($animate) {
	var trueElementArray = [];

	var controller = ['$scope', function ($scope) {
		
		//object which contains character and key
		//key is the character plus the occurence of the character in the string
		//so 'a' becomes 'a{n}' where n is the occurence # of the character
		function CreateKeys(s) {
			var o = {},
				arr = [];

			angular.forEach(s, function (v, i) {
				if (o.hasOwnProperty(v)) {
					o[v] += 1;
				} else {
					o[v] = 0;
				}

				arr.push({
					character: v,
					key: v + '{' + o[v] + '}'
				});
			});
			console.log(arr);
			return arr
		}

		$scope.$watch('t', function (n, o) {
			$scope.text = CreateKeys(n);
		});
	}];

	var link = function (scope, ele, attrs) {
		/*
		scope.$watch('t', function (n, o) {
			var leave = [],
				e,
				prevElement;

			angular.forEach(trueElementArray, function (v, i) {
				leave.push(v);
			});
			
			console.log(trueElementArray);

			angular.forEach(n, function (v, i) {
				var idx = leave.map(function (d) { return d.innerText; }).indexOf(v);

				if (idx >= 0) {
					//move
					e = leave.splice(idx,1);
					if (prevElement) {
						$animate.move(e, ele[0], prevElement);
					} else {
						$animate.move(e, ele[0]);
					}
				} else {
					//enter
					e = angular.element('<span class="ipreo-animated-text">' + v + '</span>');
					if (prevElement) {
						$animate.enter(e, ele[0], prevElement);
					} else {
						$animate.enter(e, ele[0]);
					}
				}
				trueElementArray.push(e[0]);
				prevElement = e
			});
			
			angular.forEach(leave, function (v, i) {
				$animate.leave(v);
				trueElementArray.splice(trueElementArray.indexOf(v), 1);
			});
		});
*/
	};

	return {
		restrict: 'A',
		scope: {
			t: '='
		},
		link: link,
		controller: controller,
		templateUrl: './animatedtext/templates/template.jade'
	}
});