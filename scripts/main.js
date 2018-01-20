var mainElement = document.getElementsByTagName("main")[0];

var articleContainer = document.getElementById("article-container");

var articles = articleContainer.querySelectorAll("article");


// 

var articlesById = {};
for (let index = 0; index < articles.length; index++) {
	const article = articles[index];

	var id = article.id;
	if (id != undefined) {
		articlesById[id] = article;
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
		}, 1000);
		return articles[articleIndex];
	} else {
		articleIndex--;
	}
	return false;
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
		var overlayElement = article.querySelector(".overlay");
		if (overlayElement) {
			var focusPoint_svg = overlayElement.querySelector("svg");
			if (x == undefined) {
				x = 0;
			}
			if (y == undefined) {
				y = 0;
			}
			focusPoint_svg.style.transform = "translate(" + x + "px, " + y + "px) scale(2)";
			return true;
		}
	}
	return false;
}

/////////////////
//  test stuff //

for (let index = 0; index < 10; index++) {
	// goToNextArticle();	
}

setTimeout(function () {
	// goToNextArticle ();
	// goToNextArticle ();
	// goToNextArticle ();
}, 300);

setTimeout(function () {
	setFocusPoint(articles[4], 100, 100);
}, 1500);


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


function buttonExpanderFunction (e) {
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


function buttonDeExpanderFunction (e) {
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