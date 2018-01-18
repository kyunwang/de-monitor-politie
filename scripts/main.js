
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