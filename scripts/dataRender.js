// @ts-check
// Used https://www.zamzar.com/convert/xlsx-to-csv/ to convert the data

d3.csv("../data/data.csv", cleanData, getData);

function cleanData(data, index) {
  // Get all the keys at the start
  if (index === 0) {
    keys = Object.keys(data);
  }

  // Returning a new object with better keynaming
  if (data[keys[0]]) {
    // Check wether there is data by checking the id/vlognumber
    return {
      number: data[keys[0]],
      vlogger: data[keys[1]],
      link: data[keys[2]],
      inci: data[keys[3]],
      inciCat: data[keys[4]],
      clipLeng: data[keys[5]],
      pubDate: data[keys[6]],
      routeShowed: data[keys[7]],
      recognisable: data[keys[8]],
      otherRecognisable: data[keys[9]],
      involvedPeople: data[keys[10]],
      vidChanges: data[keys[11]]
    };
  }
}

async function getData(data) {
	if (!vlogData) {
		vlogData = data;
	}
 	 // data = await vlogData.slice(0, 40);
  	console.log("The Data", vlogData);
  	await createHer();
	await createBubble();
}
// window.addEventListener('resize', getData);
