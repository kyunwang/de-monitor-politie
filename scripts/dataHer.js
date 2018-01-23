// Start herleidbaarheid chart
// Grid based on example from d3.layout.grid
async function createHer() {
	var width = document.getElementById('her-chart').getBoundingClientRect().width;
	var delayScale = d3.scaleLinear().domain([0, 400]).range([0, 300]);

	var setData = await vlogData.map(function(d, i) {
		return {
			...d,
			index: i,
			x: random(width / 2 - 100, width / 2 + 100),
			y: random(height / 2 - 100, height / 2 + 100),
			color: getColor(d),
			shape: 'circle',
			size: 25,
		};
	});

	var data = setData.sort(function(a,b) {
		return herOrder.indexOf( a.color ) > herOrder.indexOf( b.color );
 	});

	var herSvg = d3.select('#data-her svg')
		.attr('width', width)
		.attr('height', height);

	var shapes = herSvg.selectAll('.shape').data(data)
		.enter()
		.append('g')
		.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
		.attr('data-size', d => d.size)
		.attr('data-shape', d => d.shape)
		.on('mouseenter', updateInfo);

	var circles = shapes.filter(d => d.shape === 'circle')
		.append('circle')
		.attr('r', d => d.size / 2)
		.attr('fill', d => d.color);

	var grid = d3.layoutGrid()
		.width(width)
		.height(height)
		.colWidth(50)
		.rowHeight(50)
		// .marginTop(25)
		.marginTop(75)
		.marginLeft(31.125)
		.sectionPadding(50)
		.data(data);

	function transition() {
		herSvg.attr('height', grid.height());
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
		var labels = herSvg.selectAll('text').data(groups, function(d) {
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

		labels = herSvg.selectAll('text').data(groups, function(d) {
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

	function random(start, end) {
		var range = end - start;
		return start + Math.floor(Math.random() * range);
	}

	function capitalize(str) {
		return str[0].toUpperCase() + str.substr(1);
	}

	function getColor(d) {
		var available = checkHer(d);
		// console.log(herColor[available]);
		return herColor[available];
	}

	function checkHer(d) {
		var keys = herKeys.filter(key => (d[key] != '' && d[key].length > 0));
		if (keys.length) return keys[0];
		return 'none';
	}

	var herInfo = document.querySelectorAll('.data__cat--her li');
	var inciInfo = document.querySelectorAll('.data__cat--inci li');
	var involInfo = document.querySelectorAll('.data__cat--invol li');
	
	function updateInfo(d) {
		updateHerInfo(d);
		updateInciInfo(d);
		updateInvolInfo(d);
	}

	function updateHerInfo(d) {
		herInfo[0].textContent = checkData(d.routeShowed) ? herText.route : '';
		herInfo[1].textContent = checkData(d.recognisable) ? herText.recognisable : '';
		herInfo[2].textContent = checkData(d.otherRecognisable) ? herText.other : '';
	}

	function updateInciInfo(d) {
		inciInfo[0].textContent = checkData(d.inciCat);
		inciInfo[1].textContent = checkData(d.inci);
	}

	function updateInvolInfo(d) {
		involInfo[0].textContent = checkData(d.involvedPeople);
	}

	function checkData(d) {		
		if (d == 'X') return true;
		if (d.length > 0 && d != '') return d;
		return;
	}

	
	await groupByShape();
	await updateInfo(data[0]);
	// groupByColor();
}