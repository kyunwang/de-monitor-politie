async function createBubble() {
	var bubbleChart = d3.select('#bubble-chart');
	var bubbleInfoHead = document.querySelector(
	  '.data__info.data__info--bubble h3'
	);
	var bubbleInfoLi = document.querySelectorAll(
	  '.data__info.data__info--bubble li span'
	);

  // Getting the info: https://github.com/d3/d3-selection/issues/128
  var bubbleW = await bubbleChart.node().getBoundingClientRect().width;
  var bubbleH = await bubbleChart.node().getBoundingClientRect().height;

  var bubbleDiameter = [bubbleW, bubbleH];

  var rollupData = await d3
    .nest()
    .key(d => d.inciCat)
    .rollup(d => d.length)
    .entries(vlogData);

  var rollupInvolved = await d3
    .nest()
    .key(d => d.involvedPeople)
    .rollup(d => d.length)
    .entries(vlogData);

  var formattedData = {
    name: 'parent',
    children: rollupData
  };

  var bubbleColor = d3
    .scaleLinear()
    .domain([1, d3.max(formattedData.children, d => d.value)])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb('#8CE2F1'), d3.rgb('#1ac5e3')]);

  var packLayout = d3
    .pack()
    .size(bubbleDiameter)
    .padding(1);

  // Create hierarchy object
  var rootNode = d3.hierarchy(formattedData)
  	.sum(d => d.value);

  // Apply data to the pack layout
  packLayout(rootNode);

  var bubbleNodes = bubbleChart
    .selectAll('g')
    .data(rootNode.descendants())
    .enter()
    .append('g');

  bubbleNodes
    .append('circle')
    .attr('cx', getX)
    .attr('cy', getY)
    .attr('r', d => d.r)
    .attr('fill', d => bubbleColor(d.data.value))
    .on('mouseenter', enterBubble)
    .on('mouseleave', leaveBubble);

  bubbleNodes
    .append('text')
    //  .classed('svg-text')
    .attr('dy', d => getY(d) + 5)
    .attr('dx', d => getX(d) - 25) // trying to center the labels
    .text(d => (d.children === undefined ? d.data.key : ''));

  function enterBubble(d, i) {
	 d3.select(this)
		.transition()
		.duration(300)
		.attr("fill", "#ffa101");
    updateInfo(d);
  }

  function leaveBubble(d) {
	 d3.select(this)
	 	.transition()
		.duration(300)
		.attr('fill', bubbleColor(d.data.value));
    getInitialInfo();
  }

  function updateInfo(d) {
    if (!d.data.key || d.data.key == undefined) return;

    var filteredData = vlogData.filter(item => item.inciCat === d.data.key);

    // roll up the data of involved people
    var filteredRollup = d3
      .nest()
      .key(item => item.involvedPeople)
      .rollup(item => item.length)
      .entries(filteredData);

    // Update the number using getValue
    bubbleInfoHead.textContent = `Betrokkenen bij categorie: ${d.data.key}`;
    bubbleInfoLi[0].textContent = getValue('Verdachte', filteredRollup);
    bubbleInfoLi[1].textContent = getValue('Slachtoffer', filteredRollup);
    bubbleInfoLi[2].textContent = getValue('beide', filteredRollup);
    bubbleInfoLi[3].textContent = d3.sum(filteredRollup, item => item.value);
  }

  // Setting the initial unfiltered info
  function getInitialInfo() {
    bubbleInfoHead.textContent = 'Betrokkenen';
    bubbleInfoLi[0].textContent = getValue('Verdachte');
    bubbleInfoLi[1].textContent = getValue('Slachtoffer');
    bubbleInfoLi[2].textContent = getValue('Beide');
    bubbleInfoLi[3].textContent = d3.sum(rollupInvolved, item => item.value);
  }

  // Get the requested data and return the value if there is any
  function getValue(name, data = rollupInvolved) {
    var involvedValue = data.filter(item => item.key == name);
    if (involvedValue.length === 0) return 0;
    return involvedValue[0].value;
  }

  function getX(d) {
    return d.x;
  }

  function getY(d) {
    return d.y;
  }

  getInitialInfo();  
}
