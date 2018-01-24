var vlogData;
var keys;

var width = document.body.clientWidth;
var height = document.body.clientHeight;

var herColor = {
	routeShowed: '#1ac5e3',
	recognisable: '#ffa101',
	otherRecognisable: '#919898',
	none: '#485253'

	// To get and set the correct colors and order
};var herKeys = ['routeShowed', 'recognisable', 'otherRecognisable'];
var herOrder = ['#1ac5e3', '#ffa101', '#919898', '#485253'];

// Text for the details from the herleidbaar graph
var herText = {
	route: 'Route is herkenbaar',
	recognisable: 'Betrokken(en) zijn herkenbaar',
	other: 'Overige aspecten'

	// Object for the legend - herleidbaar graph
	// Because the keys arent' the same as we want to show
	// The format comes from d3-layout-grid
};var herLegend = ['route', 'herleidbaar', 'overig', 'geen'];
// var herLegend = [
// 	{'name': 'route'},
// 	{'name': 'herleidbaar'},
// 	{'name': 'overig'},
// 	{'name': 'geen'},
// ]