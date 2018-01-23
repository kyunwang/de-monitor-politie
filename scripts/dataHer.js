// Start herleidbaarheid chart
async function createHer() {
	function random(start, end) {
		var range = end - start;
		return start + Math.floor(Math.random() * range);
	}

	function randomPick(array) {
		var length = array.length;
		var index = random(0, array.length);
		return array[index];
	}

	function capitalize(str) {
		return str[0].toUpperCase() + str.substr(1);
	}
	// var width = document.getElementsByClassName('container')[0].clientWidth;
	// var height = 1000;
	var color = d3.scaleOrdinal(d3.schemeCategory10);
	var delayScale = d3.scaleLinear().domain([0, 400]).range([0, 300]);

	// var data = d3.range(0, 50).map(function(i) {
	// 	return {
	// 		index: i,
	// 		prop1: randomPick(['a', 'b', 'c']),
	// 		prop2: randomPick(['a', 'b', 'c', 'd', 'e']),
	// 		x: random(width / 2 - 100, width / 2 + 100),
	// 		y: random(height / 2 - 100, height / 2 + 100),
	// 		color: color(i),
	// 		// shape: randomPick(['circle', 'square', 'ellipse']),
	// 		shape: 'circle',
	// 		size: random(20, 40)
	// 	};
	// });

	var data = vlogData.map(function(d, i) {
		if(i == 1) {
			console.log(d);
		}
		
		return {
			...d,
			index: i,
			// prop1: randomPick(['a', 'b', 'c']),
			// prop2: randomPick(['a', 'b', 'c', 'd', 'e']),
			x: random(width / 2 - 100, width / 2 + 100),
			y: random(height / 2 - 100, height / 2 + 100),
			color: color(i),
			shape: 'circle',
			size: random(20, 40)
		};
	});

	console.log(data);
	

	// var svg = d3.select('svg')
	// 	.attr('width', width)
	// 	.attr('height', height);
	var svg = d3.select('#data-her svg')
		.attr('width', width)
		.attr('height', height);

	var shapes = svg.selectAll('.shape').data(data)
		.enter()
		.append('g')
		.attr('transform', function(d) {
			return 'translate(' + d.x + ',' + d.y + ')';
		})
		.attr('data-size', function(d) {
			return d.size;
		})
		.attr('data-shape', function(d) {
			return d.shape;
		});

	var circles = shapes.filter(function(d) {
			return d.shape === 'circle';
		})
		.append('circle')
		.attr('r', function(d) {
			return d.size / 2;
		})
		.attr('fill', function(d) {
			return d.color;
		});


	var grid = d3.layoutGrid()
		.width(width)
		.height(height)
		.colWidth(50)
		.rowHeight(50)
		.marginTop(75)
		.marginLeft(50)
		.sectionPadding(100)
		.data(data);

	function transition() {
		svg.attr('height', grid.height());
		shapes.transition()
			.duration(750)
			.delay(function(d) {
				return delayScale(d.groupIndex * 150 + d.index * 1);
			})
			.attr('transform', function(d) {
				return 'translate(' + d.x + ',' + d.y + ')';
			});
		updateLabels();
	}

	function updateLabels() {
		var groups = grid.groups();

		// Provide d3 a key function so that labels are animated correctly
		// http://bost.ocks.org/mike/constancy/
		var labels = svg.selectAll('text').data(groups, function(d) {
			return d.name;
		});

		labels.enter()
			.append('text')
			.attr('y', function(d) {
				return d.y - 40;
			})
			.style('opacity', 0);
		labels.exit()
			.transition()
			.style('opacity', 0)
			.remove();

		labels = svg.selectAll('text').data(groups, function(d) {
			return d.name;
		});

		labels
			.text(function(d) {
				return capitalize(d.name) + ': (' + d.data.length + ')';
			})
			.transition()
			.duration(750)
			.attr('x', 30)
			.attr('y', function(d) {
				return d.y - 40;
			})
			.style('opacity', 1);
	}

	function groupByColor() {
		grid.groupBy('color');
		transition();
	}

	function groupByShape() {
		grid.groupBy('shape');
		transition();
	}


	groupByShape();
	// groupByColor();
}