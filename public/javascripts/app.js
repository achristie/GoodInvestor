$(function () {
	var getData = function () {
		return $.ajax({
			url: 'https://davos.app.ipreo.com/rest/API/andrew/GGH2.svc?$components=InvestorFilingDates,Ownership&$format=json&$callback=?',
			dataType: 'jsonp'
		});
	}

	getData().done(function (d) {
		processData(d);
		console.log(segments);
	});

	var dateArray = [],
		segments = {};

	var processData = function (d) {
		dateArray = d.InvestorFilingDates.map(function (d) { return parseInt(d.filing_dt.substr(6), 10);
 }).sort();


		//go thru each position
		//check if segment exists (object - key is securityid, array of segments)
		//if segment has previous dateArray value then add to segment
		//if not create new segment

		d.Ownership.sort(function (a, b) {
			a = parseInt(a.quarter_end_dt.substr(6), 10);
			b = parseInt(b.quarter_end_dt.substr(6), 10);

			return a - b;
		});

		$.each(d.Ownership, function (i, v) {
			var p = new Position(v),
				priorDate = dateArray.indexOf(p.date);

				priorDate = priorDate <= 0 ? new Date(0) : dateArray[priorDate - 1];

			if (segments.hasOwnProperty(v.security_id)) {
				var segArray = segments[v.security_id];

				var arr = segArray.map(function (d) { return d.positions; }).map(function (d) { 
					return d.filter(function (d) { return d == priorDate; })}).map(function (d) { return d[0]; });

				var idx = arr.indexOf(priorDate);

				if (idx >= 0) {
					segments[v.securityId][idx].positions.push(p);
				} else {
					var s = new Segment(v);
					s.positions.push(p);
					segments[s.id].push(s);
				}
			} else {
				var s = new Segment(v);
				s.positions.push(p);
				segments[s.id] = [s];
			}
		});
	};

	console.log(segments);

	Segment = function (s) {
		var self = this;

		self.id = s.security_id;
		self.ticker = s.ticker;
		self.name = s.security_name;
		self.positions = [];

		self.positions.push(new Position({
			quarter_end_dt: "/Date(0000000000000)/", share_qty: 0, share_amount: 0, shares_held_percent:0, changed_qty: 0, share_amount_changed: 0
		}));
	}

	Position = function (p) {
		var self = this;

		self.date = parseInt(p.quarter_end_dt.substr(6), 10);
		self.shares = p.share_qty;
		self.value = p.share_amount;
		self.heldPercent = p.shares_held_percent;
		self.shareChange = p.changed_qty;
		self.valueChange = p.share_amount_changed;
	}



	var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;
});