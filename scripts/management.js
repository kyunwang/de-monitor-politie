var articleBehaviourData = {
    ["route-1"] : function (article) {
        setTimeout(goToNextArticle, 1500);
    },
    ["route-2"] : function (article) {
        setFocusPoint(article);

        var infoBalloonWrapper = article.getElementsByClassName("wrapper--info-balloon")[0];

        var foreword = infoBalloonWrapper.getElementsByClassName("foreword")[0];
        foreword.classList.remove("disabled");

        var instruction = infoBalloonWrapper.getElementsByClassName("instruction")[0];

        // var feedback = infoBalloonWrapper.getElementsByClassName("feedback")[0];
        

        
        
        var goToNextStep = document.getElementById("go-to-next-step");
        
        goToNextStep.classList.remove("hidden");
        
        goToNextStep.textContent = "Doorgaan";

        var showInstruction;
        showInstruction = function (e) {
            var source = e.target;
            source.removeEventListener("click", showInstruction); // just in case
            
            // remove foreword and show instruction
            foreword.classList.add("disabled");
            instruction.classList.remove("disabled");

            goToNextStep.classList.add("hidden");

            // Show buttons "herkenbaar" and "onherkenbaar"
            setRecognizAbleButtonsStatus(article, true);
        };

        
        goToNextStep.addEventListener("click", showInstruction);
    },
    ["house"] : function (article) {
        setFocusPoint(article);

        var infoBalloonWrapper = article.getElementsByClassName("wrapper--info-balloon")[0];

        var instruction = infoBalloonWrapper.getElementsByClassName("instruction")[0];
        
        instruction.classList.remove("disabled");

        // Show buttons "herkenbaar" and "onherkenbaar"
        setRecognizAbleButtonsStatus(article, true);
    }, 
    ["house-num"] : function (article) {
        setFocusPoint(article);

        var infoBalloonWrapper = article.getElementsByClassName("wrapper--info-balloon")[0];
        console.log(infoBalloonWrapper);
        
        var instruction = infoBalloonWrapper.getElementsByClassName("instruction")[0];
        
        instruction.classList.remove("disabled");

        // Show buttons "herkenbaar" and "onherkenbaar"
        setRecognizAbleButtonsStatus(article, true);
    },
    ["open-door"] : function (article) {
        setTimeout(goToNextArticle, 1500);
    },
    ["throw-beer"] : function (article) {
        setFocusPoint(article);

        var infoBalloonWrapper = article.getElementsByClassName("wrapper--info-balloon")[0];
        console.log(infoBalloonWrapper);
        
        var instruction = infoBalloonWrapper.getElementsByClassName("instruction")[0];
        
        instruction.classList.remove("disabled");

        // Show buttons "herkenbaar" and "onherkenbaar"
        setRecognizAbleButtonsStatus(article, true);
    },
    ["license-plate"] : function (article) {
        setFocusPoint(article);

        var infoBalloonWrapper = article.getElementsByClassName("wrapper--info-balloon")[0];
        console.log(infoBalloonWrapper);
        
        var instruction = infoBalloonWrapper.getElementsByClassName("instruction")[0];
        
        instruction.classList.remove("disabled");

        // Show buttons "herkenbaar" and "onherkenbaar"
        setRecognizAbleButtonsStatus(article, true);
    },
    ["neighbor"] : function (article) {
        setFocusPoint(article);

        var infoBalloonWrapper = article.getElementsByClassName("wrapper--info-balloon")[0];
        console.log(infoBalloonWrapper);
        
        var instruction = infoBalloonWrapper.getElementsByClassName("instruction")[0];
        
        instruction.classList.remove("disabled");

        // Show buttons "herkenbaar" and "onherkenbaar"
        setRecognizAbleButtonsStatus(article, true);
    },
    ["route-3"] : function (article) {
        setTimeout(goToNextArticle, 1500);
    },
    ["police-desk"] : function (article) {
        setTimeout(goToNextArticle, 1500);
    },
    ["uploading"] : function (article) {
        setTimeout(goToNextArticle, 1500);
    },
};

var canUseNextButton = true;

// Show/hide buttons "herkenbaar" and "onherkenbaar"
function setRecognizAbleButtonsStatus (article, status) {
    var recognizeAbleOptions = article.querySelector(".overlay-effect span");
    if(recognizeAbleOptions != undefined) {
        if (status) {
            recognizeAbleOptions.classList.add("active");
        } else {
            recognizeAbleOptions.classList.remove("active");
        }
    }
}

function onSwitchArticle (article) {
    var id = article.id;
    
    var articleBehaviour = articleBehaviourData[id];
    if (articleBehaviour != undefined) {
        setTimeout(function () { // article is on his place
            articleBehaviour(article);
        }, 1000);
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



