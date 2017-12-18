var svg = document.querySelector('main > svg');

var snapSVG = Snap(svg);



//

var leftLeg = snapSVG.select("#leftLeg");


var bbox = leftLeg.getBBox();


var leftLegPositionX = bbox.x + bbox.width / 2,
    leftLegPositionY = bbox.y;

//

var rightLeg = snapSVG.select("#rightLeg");

var bbox = rightLeg.getBBox();
var rightLegPositionX = bbox.x + bbox.width / 2,
    rightLegPositionY = bbox.y;

//

var body = snapSVG.select("#body");

var bbox = body.getBBox();
var bodyPositionX = bbox.cx,
    bodyPositionY = bbox.cy;


//

var rightArm = snapSVG.select("#rightArm");

var bbox = rightArm.getBBox();
var rightArmPositionX = bbox.x + bbox.width,
    rightArmPositionY = bbox.y + bbox.height / 2;

//

var leftArm = snapSVG.select("#leftArm");

var bbox = snapSVG.select("#leftArm > path:not(#staf)").getBBox();
var leftArmPositionX = bbox.x,
    leftArmPositionY = bbox.y + bbox.height / 2;


//

var head = snapSVG.select("#head");

var cap = snapSVG.select("#cap");

var bbox = snapSVG.select("#head > circle").getBBox();
var headPositionX = bbox.cx,
    headPositionY = bbox.cy;



function firstAnimation () {
    leftLeg.animate( { 'transform' : "r-30," + leftLegPositionX + "," + leftLegPositionY }, 400, mina.easeout());
    rightLeg.animate( { 'transform' : "r30," + rightLegPositionX + "," + rightLegPositionY }, 400, mina.easeout(), nextAnimation);

    rightArm.animate( { 'transform' : "r50," + rightArmPositionX + "," + rightArmPositionY }, 400, mina.easeout());

    leftArm.animate( { 'transform' : "r-50," + leftArmPositionX + "," + leftArmPositionY }, 400, mina.easeout());

    body.animate( { 'transform' : "t" + 0 + "," + -100 + ", r-5," + bodyPositionX + "," + bodyPositionY}, 400);



    head.animate( { 'transform' : "r20," + headPositionX + "," + headPositionY}, 400, mina.easeout());

    cap.animate( { 'transform' : "t0,10"}, 200, mina.easein(), function () {
        cap.animate( { 'transform' : "t0,0"}, 200, mina.easein());
    });
}



firstAnimation ();


function headRollAnimation1 () {

}



function nextAnimation () {
    leftLeg.animate( { 'transform' : "r0," + leftLegPositionX + "," + leftLegPositionY }, 400, mina.easein());
    rightLeg.animate( { 'transform' : "r0," + rightLegPositionX + "," + rightLegPositionY }, 400, mina.easein());
    rightArm.animate( { 'transform' : "r-50," + rightArmPositionX + "," + rightArmPositionY }, 400, mina.easein());

    leftArm.animate( { 'transform' : "r100," + leftArmPositionX + "," + leftArmPositionY }, 400, mina.easein());

    body.animate( { 'transform' : "t" + 0 + "," + 0 + ", r5," + bodyPositionX + "," + bodyPositionY}, 400, firstAnimation, mina.easein());

    head.animate( { 'transform' : "r-20," + headPositionX + "," + headPositionY}, 400, mina.easeout());
    cap.animate( { 'transform' : "t0,-10"}, 200, mina.easein(), function () {
        cap.animate( { 'transform' : "t0,0"}, 200, mina.easein());
    });
}
