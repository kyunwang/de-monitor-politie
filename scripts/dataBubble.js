// @ts-check
// Used https://www.zamzar.com/convert/xlsx-to-csv/ to convert the data

d3.csv('../data/data.csv', cleanData, getData);

function cleanData(vlogData, index) {
  // Get all the keys at the start
  if (index === 0) {
    keys = Object.keys(vlogData);
  }

  // Returning a new object with better keynaming
  if (vlogData[keys[0]]) {
    // Check wether there is data by checking the id/vlognumber
    return {
      number: vlogData[keys[0]],
      vlogger: vlogData[keys[1]],
      link: vlogData[keys[2]],
      inci: vlogData[keys[3]],
      inciCat: vlogData[keys[4]],
      clipLeng: vlogData[keys[5]],
      pubDate: vlogData[keys[6]],
      routeShowed: vlogData[keys[7]],
      recognisable: vlogData[keys[8]],
      otherRecognisable: vlogData[keys[9]],
      involvedPeople: vlogData[keys[10]],
      vidChanges: vlogData[keys[11]]
    };
  }
}

async function getData(vlogData) {
  data = vlogData;
  // data = await vlogData.slice(0, 40);
  console.log('The Data', data);
  await createBubble();
}

// Start bubblechart
var bubbleChart = d3.select('#bubble-chart');

async function createBubble() {
  console.log('create', width);

  // Getting the info: https://github.com/d3/d3-selection/issues/128
  var bubbleW = await bubbleChart.node().getBoundingClientRect().width;
  var bubbleH = await bubbleChart.node().getBoundingClientRect().height;
  console.log(bubbleW);
  

  var bubbleDiameter = [bubbleW, bubbleH];

  var rollupData = await d3
    .nest()
    .key(function(d) {
      return d.inciCat;
    })
    .rollup(function(d) {
      return d.length;
    })
    .entries(data);

  var formattedData = {
    name: 'parent',
    children: rollupData
  };

  var bubbleColor = d3.scaleLinear()
    .domain([1,d3.max(formattedData.children, d => d.value)])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb("#8CE2F1"), d3.rgb('#1ac5e3')]);

  var packLayout = d3
    .pack()
    .size(bubbleDiameter)
    .padding(1);

  // Create hierarchy object
  var rootNode = d3.hierarchy(formattedData).sum(function(d) {
    return d.value;
  });

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
    .attr('dy', d => getY(d) + 5)
    .attr('dx', d => getX(d) - 20) // trying to center the labels
    .text(d => (d.children === undefined ? d.data.key : ''));

  function enterBubble(d) {
		console.log(this, d);
		d3.select(this).attr('fill', '#ffa101');
  }

  function leaveBubble(d) {
	 console.log('exit');
	 d3.select(this).attr('fill', bubbleColor(d.data.value));
  }

  function getX(d) {
    return d.x;
  }

  function getY(d) {
    return d.y;
  }
}
