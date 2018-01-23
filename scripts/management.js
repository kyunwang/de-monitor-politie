var articleBehaviourData = {
    ["route-1"] : function () {
        setTimeout(goToNextArticle, 1500);
    },
    ["route-2"] : function () {

    }
};

var canUseNextButton = true;


function onSwitchArticle (article) {
    var id = article.id;
    
    var articleBehaviour = articleBehaviourData[id];
    if (articleBehaviour != undefined) {
        articleBehaviour();
    }
}

window.addEventListener("load", function () {
    
    // for (let index = 0; index < articles.length; index++) {
    //     const article = articles[index];
        
    // }
    /////////////////////////////
    // switch between articles //
    


    var buttonsToNextArticle = document.getElementsByClassName("button--go-to-next-article");



    for (let index = 0; index < buttonsToNextArticle.length; index++) {
        const button = buttonsToNextArticle[index];
        button.addEventListener("click", 
        function () {
            if (canUseNextButton) {
                goToNextArticle();
            }
        });
    }


    // switch between articles //
    /////////////////////////////

    

});



