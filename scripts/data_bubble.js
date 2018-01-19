// Used https://www.zamzar.com/convert/xlsx-to-csv/ to convert the data

d3.csv("../data/data.csv", cleanData, getData);

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
  console.log("The Data", data);

  await createBubble();
}

// Start bubblechart
var bubbleChart = d3.select("#bubble-chart");

async function createBubble() {
  console.log("create", width);

  // Getting the info: https://github.com/d3/d3-selection/issues/128
  var bubbleW = bubbleChart.node().getBoundingClientRect().width;
  var bubbleH = bubbleChart.node().getBoundingClientRect().height;
  var bubbleDiameter = [bubbleW, bubbleH];

  var rollupData = d3
    .nest()
    .key(function(d) {
      return d.inciCat;
    })
    .rollup(function(d) {
      return d.length;
    })
    .entries(data);

  var formattedData = {
    name: "parent",
    children: rollupData
  };

  var packLayout = d3
    .pack()
    .size(bubbleDiameter)
    .padding(1.5);

  // Create hierarchy object
  var rootNode = d3.hierarchy(formattedData).sum(function(d) {
    return d.value;
  });

  // Apply data to the pack layout
  packLayout(rootNode);

  var bubbleNodes = bubbleChart
    .selectAll("g")
    .data(rootNode.descendants())
    .enter()
    .append("g");

  bubbleNodes
    .append("circle")
    .attr("cx", getX)
    .attr("cy", getY)
    .attr("r", d => d.r);

  bubbleNodes
    .append("text")
    .attr("dy", d => 4)
    .attr("dx", getX)
    // .attr("dx", function(d) {
    //   return d.x;
    // })
    .text(function(d) {
      console.log(d);

      // return d.children === undefined ? d.data.name : "";
      return d.children === undefined ? d.data.key : "";
    });

  function getX(d) {
    return d.x;
  }

  function getY(d) {
    return d.y;
  }
}
