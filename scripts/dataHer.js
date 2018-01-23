// Start herleidbaarheid chart
// Grid based on example from d3.layout.grid
async function createHer() {
	var width = document.getElementById('her-chart').getBoundingClientRect().width;
	console.log(width);
	console.log(width < 4000 ? 40 : 25)
	
	var delayScale = d3.scaleLinear().domain([0, 400]).range([0, 300]);

	var setData = await vlogData.map(function(d, i) {
		return {
			...d,
			index: i,
			x: random(width / 2 - 100, width / 2 + 100),
			y: random(height / 2 - 100, height / 2 + 100),
			color: getColor(d),
			shape: 'circle',
			size: width < 450 ? 30 : 25,
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
		.classed('her-node', true)
		.attr('transform', d => `translate(${d.x}, ${d.y})`)
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
		// .marginTop(0)
		.marginTop(40)
		// .marginTop(110)
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
			.attr('transform', d => `translate(${d.x}, ${d.y})`);
		// updateLabels();
	}

	// testing out labeling using d3 (made using html atm)
	function updateLabels() {
		var groups = herLegend;

		// Provide d3 a key function so that labels are animated correctly
		// http://bost.ocks.org/mike/constancy/

		var legend = herSvg.append('g')
			.selectAll('g')
			.data(groups)
			.enter()
			.append('g')
			.attr('y', 20)
			.attr("transform", (d, i) =>  `translate(${1%i ? 200 : 31.125}, ${2%i < 2 ? 60 : 20})`);
			// .attr("transform", (d, i) =>  `translate(${1%i ? 250 : 31.125}, ${1%i ? i * 40 : i * 40})`);
			// .attr("transform", (d, i) =>  `translate(${1%i ? 31.125 : 150}, ${1%i ? i * 20 : i * 20})`);
			// .attr("transform", (d, i) =>  `translate(${i * 25}, ${20})`);

		legend.append('circle')
			.attr('r', 25/2)
			.attr('fill', 'red')

		legend.append("text")
			.attr("x", 24)
			.attr("y", 9.5)
			.attr("dy", "0.32em")
			.text(d => d);
	}

	// function groupByColor() {
	// 	grid.groupBy('color');
	// 	transition();
	// }

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
	var herInfoDot = document.querySelectorAll('.data__cat--dot');
	var inciInfo = document.querySelectorAll('.data__cat--inci li');
	var involInfo = document.querySelectorAll('.data__cat--invol li');
	
	function updateInfo(d) {
		updateHerInfo(d);
		updateInciInfo(d);
		updateInvolInfo(d);
	
		highlightNode(d);
	}

	function highlightNode(d) {
		d3.selectAll('.her-node')
			.style('opacity', item => (item == d) ? 1 : .5);
	}

	function updateHerInfo(d) {
		herInfo[0].textContent = checkData(d.routeShowed) ? herText.route : '';
		herInfo[1].textContent = checkData(d.recognisable) ? herText.recognisable : '';
		herInfo[2].textContent = checkData(d.otherRecognisable) ? herText.other : '';
		
		herInfoDot[0].style.background = checkData(d.routeShowed) ? herColor.routeShowed : 'none';
		herInfoDot[1].style.background = checkData(d.recognisable) ? herColor.recognisable : 'none';
		herInfoDot[2].style.background = checkData(d.otherRecognisable) ? herColor.otherRecognisable : 'none';

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

	// Initial render of the graph
	await groupByShape();

	// Initial render detail
	await updateInfo(data[0]);
	console.log(data);
	
}