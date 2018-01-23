var vlogData;
var keys;

var width = document.body.clientWidth;
var height = document.body.clientHeight;



var herColor = {
	routeShowed: '#1ac5e3',
	recognisable: '#ffa101',
	otherRecognisable: '#919898',
	none: '#485253',
}

// To get and set the correct colors and order
var herKeys = ['routeShowed', 'recognisable', 'otherRecognisable'];
var herOrder = ['#1ac5e3', '#ffa101', '#919898', '#485253'];

// Text for the details from the herle
var herText = {
	route: 'Route is herkenbaar',
	recognisable: 'Betrokken(en) zijn herkenbaar',
	other: 'Overige aspecten'
}