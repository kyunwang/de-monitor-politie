//@ts-check
var mainElement = document.getElementsByTagName("main")[0];

var articleContainer = document.getElementById("article-container");

var articles = articleContainer.querySelectorAll("#article-container > article");

var mainFooter = document.querySelector("main footer");

// 

var articlesById = {};
var indexByArticleId = {};

for (let index = 0; index < articles.length; index++) {
	const article = articles[index];

	var id = article.id;
	if (id != undefined) {
		articlesById[id] = article;
        indexByArticleId[id] = index;
	}
}

// 

var articleIndex = 0;


function goToNextArticle() {
	setSelectionPanelStatus(false);
	articleContainer.classList.add("animation-active");
	articleIndex++;
	if (articles[articleIndex] != undefined) {
		articleContainer.style.left = (-100 * articleIndex) + "vw";
		checkAndSetBlurButtonStatus();
		onSwitchArticle(articles[articleIndex]);
		var testArticle = articles[articleIndex];
		setTimeout(function () {
			
			articleContainer.classList.remove("animation-active");
			// if (setFocusPoint(articles[articleIndex]) ) {

			// }
		}, 1000);
		return articles[articleIndex];
	} else {
		articleIndex--;
	}
	return false;
}


function goToArticleById (id) {
    var index = indexByArticleId[id];
    if (index != undefined) {
        articleIndex = index;
        if (articles[articleIndex] != undefined) {
			articleContainer.style.left = (-100 * articleIndex) + "vw";
			checkAndSetBlurButtonStatus();
			onSwitchArticle(articles[articleIndex]);
            setTimeout(function () {
                articleContainer.classList.remove("animation-active");
				if (setFocusPoint(articles[articleIndex]) ) {

				}
            }, 1000);

            
            return articles[articleIndex];
        } else {
            articleIndex--;
        }
        return false;
    }
}

function goToPreviousArticle() {
	articleContainer.classList.add("animation-active");
	articleIndex--;
	if (articles[articleIndex] != undefined) {
		articleContainer.style.left = (-100 * articleIndex) + "vw";
		checkAndSetBlurButtonStatus();
		onSwitchArticle(articles[articleIndex]);
		setTimeout(function () {
			articleContainer.classList.remove("animation-active");
			if (setFocusPoint(articles[articleIndex]) ) {
				
			}
		}, 1000);
		return articles[articleIndex];
	} else {
		articleIndex++;
	}
	return false;
}




function setFocusPoint(article, x, y) {

	if (article != undefined) {
        
        var overlayElement = article.querySelector(".overlay");
		if (overlayElement) {

			var overlayEffect = overlayElement.querySelector(".overlay-effect");
			if (x != undefined) {
				overlayEffect.style.left = x + "vw";
			}
			if (y != undefined) {
				overlayEffect.style.top = y + "vw";
			}
			
			
			
            // setTimeout(function (){
				overlayEffect.classList.add("overlay-effect--focus");
				setSelectionPanelStatus(true);
			// }, 2000);
           
            
			return true;
		}
	}
	return false;
}




function setSelectionPanelStatus (status) {
	if (status) {
		mainFooter.classList.remove("disabled");
	} else {
		mainFooter.classList.add("disabled");
	}
}




/////////////////////////////
// show more and less text //

function buttonExpanderFunction(e) {
	var source = e.target;
	var parent = source.parentElement;
	if (parent.classList.contains("wrapper")) {
		parent.classList.remove("wrapper--not-expand")
	}
	// source.removeEventListener("click", buttonExpanderFunction);
}

var buttonExpanders = document.getElementsByClassName("button--expander");
for (let index = 0; index < buttonExpanders.length; index++) {
	const buttonExpander = buttonExpanders[index];
	buttonExpander.addEventListener("click", buttonExpanderFunction);
}


function buttonDeExpanderFunction(e) {
	
	var source = e.target;
	var parent = source.parentElement;

	if (parent.classList.contains("wrapper")) {
		parent.classList.add("wrapper--not-expand")
	}
}


var buttonDeExpanders = document.getElementsByClassName("button--de-expander");
for (let index = 0; index < buttonDeExpanders.length; index++) {
	const buttonDeExpander = buttonDeExpanders[index];
	buttonDeExpander.addEventListener("click", buttonDeExpanderFunction);
}

// show more and less text //
/////////////////////////////


/////////////
// overlay //





var items = []; // order of the items.
var itemsById = {}; // item by id.
var itemsByElement = {};

var blurPoints = 4;
var maxBlurPoints = blurPoints;




var recognizableButtons = document.getElementsByClassName("recognizable");
var unrecognizableButtons = document.getElementsByClassName("unrecognizable");
var itemMenuForm = document.getElementById("item-menu__form");


/////////////////////////
// set the legend text //
var legendSpans = itemMenuForm.querySelectorAll("legend span");

legendSpans[0].textContent = maxBlurPoints;
legendSpans[1].textContent = maxBlurPoints;
/////////////////////////

function setBlurPoints (points) {
	var currentArticle = articles[articleIndex];
	blurPoints = points;
	legendSpans[0].textContent = points;
	checkAndSetBlurButtonStatus ();
	return true;
}

function getBlurPoints () {
	return blurPoints;
}


function checkAndSetBlurButtonStatus () {
	var currentArticle = articles[articleIndex];
	var unrecognizableButton = currentArticle.querySelector(".overlay .unrecognizable");
	if (unrecognizableButton) {
		if (getBlurPoints() > 0) {
			unrecognizableButton.removeAttribute("disabled");
		} else {
			unrecognizableButton.setAttribute("disabled", true);
		}
	}
}

function fillOverlay () {
	var currentArticle = articles[articleIndex];
	var overlayEffect = currentArticle.getElementsByClassName("overlay-effect")[0];
	if (overlayEffect != undefined) {
		overlayEffect.classList.add("overlay-effect--fill");
	}
}

function showFeedback (article, unrecognizable) {
	var infoBalloonWrapper = article.getElementsByClassName("wrapper--info-balloon")[0];
	if (infoBalloonWrapper != undefined) {
		var instruction = infoBalloonWrapper.getElementsByClassName("instruction")[0];
		if (instruction) {
			instruction.classList.add("disabled");
		}
		var feedback = infoBalloonWrapper.getElementsByClassName("feedback")[0];
		if (feedback) {
			feedback.classList.remove("disabled");
			if (unrecognizable) {
				feedback.classList.add("unrecognizable");
			} else {
				feedback.classList.remove("unrecognizable");
			}
		}
	}
	var goToNextStep = document.getElementById("go-to-next-step");
        
	goToNextStep.classList.remove("hidden");
	var nextArticle
	nextArticle = function (e) {

		// reset
		var infoBalloonWrapper = article.getElementsByClassName("wrapper--info-balloon")[0];
		if (infoBalloonWrapper != undefined) {
			var feedback = infoBalloonWrapper.getElementsByClassName("feedback")[0];
			if (feedback) {
				feedback.classList.add("disabled");
			}
		}

		goToNextStep.classList.add("hidden");
		e.target.removeEventListener("click", nextArticle);
		
		//

		

		goToNextArticle();
	};
	goToNextStep.addEventListener("click", nextArticle);
}

function makeRecognizable () {
	var currentArticle = articles[articleIndex];
	var id = currentArticle.id;
	
	fillOverlay ();

	var newItem = { // propertisch
		// unrecognizable : false
	};

	var newIndex = items.length;
	items[newIndex] = newItem;
	itemsById[id] = newItem;
	// console.log("items", items);

	var itemSlots = itemMenuForm.querySelectorAll("input");
	var itemSlot = itemSlots[newIndex];
	itemSlot.setAttribute("value", id);
	itemSlot.removeAttribute("disabled");

	showFeedback (currentArticle, false);
}

function makeUnrecognizable () {

	var blurPoints = getBlurPoints();
	if (blurPoints > 0) {

		var currentArticle = articles[articleIndex];
		var id = currentArticle.id;
		
		fillOverlay ();

		var newItem = { // propertisch
			// unrecognizable : true
		};

		var newIndex = items.length;
		items[newIndex] = newItem;
		itemsById[id] = newItem;
		// console.log("items", items);


		var itemSlots = itemMenuForm.querySelectorAll("input");
		var itemSlot = itemSlots[newIndex];
		itemSlot.setAttribute("value", id);
		itemSlot.removeAttribute("disabled");
		itemSlot.classList.add("blur");

		setBlurPoints(blurPoints - 1);

	//} else {
		// shouldn't be activated, unless developer hack.
		showFeedback (currentArticle, true);
	}
}


for (let index = 0; index < recognizableButtons.length; index++) {
	const recognizableButton = recognizableButtons[index];
	recognizableButton.addEventListener("click", makeRecognizable);
}

for (let index = 0; index < unrecognizableButtons.length; index++) {
	const unrecognizableButton = unrecognizableButtons[index];
	unrecognizableButton.addEventListener("click", makeUnrecognizable);
}


var itemMenuButton = document.getElementById("item-menu__button");
var itemMenu = document.getElementById("item-menu");
// var itemMenuOverlay = document.getElementById("item-menu__overlay");


itemMenuButton.addEventListener("click", function () {
	itemMenu.classList.toggle("closed");
});


itemMenuForm.addEventListener("change", function (e) {
	var source = e.target;
	if (!source.classList.contains("blur")) {
		var blurPoints = getBlurPoints();
		if (blurPoints > 0) {
			source.classList.add("blur");
			setBlurPoints(blurPoints - 1);
		} else {
			// feedback! Can't add blur!
		}
	} else {
		source.classList.remove("blur");
		setBlurPoints(getBlurPoints() + 1);
	}
});

// overlay //
/////////////
