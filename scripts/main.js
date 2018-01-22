//@ts-check
var mainElement = document.getElementsByTagName("main")[0];

var articleContainer = document.getElementById("article-container");

var articles = articleContainer.querySelectorAll("article");


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
	articleContainer.classList.add("animation-active");
	articleIndex++;
	if (articles[articleIndex] != undefined) {
		articleContainer.style.left = (-100 * articleIndex) + "vw";
		setTimeout(function () {
			articleContainer.classList.remove("animation-active");
			setFocusPoint(articles[articleIndex]);
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
            setTimeout(function () {
                articleContainer.classList.remove("animation-active");
                setFocusPoint(articles[articleIndex]);
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
		setTimeout(function () {
			articleContainer.classList.remove("animation-active");
		}, 1000);
		return articles[articleIndex];
	} else {
		articleIndex++;
	}
	return false;
}




function setFocusPoint(article, x, y) {
	if (article != undefined) {
		// var overlayElement = article.querySelector(".overlay");
		// if (overlayElement) {
		// 	var focusPoint_svg = overlayElement.querySelector("svg");
		// 	if (x == undefined) {
		// 		x = 0;
		// 	}
		// 	if (y == undefined) {
		// 		y = 0;
		// 	}
		// 	focusPoint_svg.style.transform = "translate(" + x + "px, " + y + "px) scale(2)";
		// 	return true;
        // }
       
        
        var overlayElement = article.querySelector(".overlay");
		if (overlayElement) {

			var overlayEffect = overlayElement.querySelector(".overlay-effect");
			if (x != undefined) {
				overlayEffect.style.left = x + "vw";
			}
			if (y != undefined) {
				overlayEffect.style.top = y + "vw";
            }
            
            overlayEffect.classList.add("overlay-effect--focus");
            
			return true;
		}
	}
	return false;
}

/////////////////
//  test stuff //

for (let index = 0; index < 16; index++) {
	// goToNextArticle();
}

setTimeout(function () {
    // goToArticleById("license-plate");
}, 300);



//  test stuff //
/////////////////


/////////////////////////////
// switch between articles //


var buttonsToNextArticle = document.getElementsByClassName("button--go-to-next-article");



for (let index = 0; index < buttonsToNextArticle.length; index++) {
	const button = buttonsToNextArticle[index];
	button.addEventListener("click", goToNextArticle);
}


// switch between articles //
/////////////////////////////

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
	return true;
}

function getBlurPoints () {
	return blurPoints;
}


function setBlurButtonStatus () {

}

function fillOverlay () {
	var currentArticle = articles[articleIndex];
	var overlayEffect = currentArticle.getElementsByClassName("overlay-effect")[0];
	if (overlayEffect != undefined) {
		overlayEffect.classList.add("overlay-effect--fill");
	}
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

	setTimeout(goToNextArticle, 1500);
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

		setTimeout(goToNextArticle, 1500);
	} else {
		// shouldn't be activated, unless developer hack.
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
