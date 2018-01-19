
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

function goToNextArticle () {
    articleIndex++;
    if (articles[articleIndex] != undefined) {
        articleContainer.style.left = (-100 * articleIndex) + "vw";
        return articles[articleIndex];
    } else {
        articleIndex--;
    }
    return false;
}

function goToPreviousArticle () {
    articleIndex--;
    if (articles[articleIndex] != undefined) {
        articleContainer.style.left = (-100 * articleIndex) + "vw";
        return  articles[articleIndex];
    } else {
        articleIndex++;
    }
    return false;
}




function setFocusPoint (article, x, y) {
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


setTimeout(function () {
    // goToNextArticle ();
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