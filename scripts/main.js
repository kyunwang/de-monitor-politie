
var mainElement = document.getElementsByTagName("main")[0];

var articleContainer = document.getElementById("article-container");

var allArticles = articleContainer.querySelectorAll("article");
var articleIndex = 0;

function goToNextArticle () {
    articleIndex++;
    articleContainer.style.left = (-100 * articleIndex) + "vw";
}

goToNextArticle ();
goToNextArticle ();
goToNextArticle ();
goToNextArticle ();



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
            
        }
    }
}

setTimeout(function () {
    setFocusPoint(allArticles[4], 100, 100);
}, 500);
