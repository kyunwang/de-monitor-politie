// Used https://www.zamzar.com/convert/xlsx-to-csv/ to convert the data

d3.csv("../data/data.csv", cleanData, getData);

function cleanData(vlogData, index) {
  // Get all the keys at the start
  if (index === 0) {
    keys = Object.keys(vlogData);
  }

  // Returning a new object with better keynaming
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

async function getData(vlogData) {
  data = await vlogData.slice(0, 40);
  console.log(data);

  await createBubble();
}

async function createBubble() {
  console.log("create", width);

  //   var width = 960,
  //     height = 500;
  //   var pack = d3
  //     .pack()
  //     .sort(d3.descending)
  //     .size([width, height]);
  //   var svg = d3
  //     .select('body')
  //     .append('svg')
  //     .attr('width', width)
  //     .attr('height', height);
  //   svg
  //     .data(data)
  //     .selectAll('.node')
  //     .data(pack.nodes)
  //     .enter()
  //     .append('circle')
  //     .attr('class', 'node')
  //     .attr('transform', function(d) {
  //       return 'translate(' + d.x + ',' + d.y + ')';
  //     })
  //     .attr('r', function(d) {
  //       return d.r;
  //     });
}
