"use strict";

var _articleBehaviourData;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var articleBehaviourData = (_articleBehaviourData = {}, _defineProperty(_articleBehaviourData, "route-1", function route1(article) {
    setTimeout(goToNextArticle, 1500);
}), _defineProperty(_articleBehaviourData, "route-2", function route2(article) {
    setFocusPoint(article);

    var infoBalloonWrapper = article.getElementsByClassName("wrapper--info-balloon")[0];

    var foreword = infoBalloonWrapper.getElementsByClassName("foreword")[0];
    foreword.classList.remove("disabled");

    var instruction = infoBalloonWrapper.getElementsByClassName("instruction")[0];

    // var feedback = infoBalloonWrapper.getElementsByClassName("feedback")[0];


    var goToNextStep = document.getElementById("go-to-next-step");

    goToNextStep.classList.remove("hidden");

    goToNextStep.textContent = "Doorgaan";

    var _showInstruction;
    _showInstruction = function showInstruction(e) {
        var source = e.target;
        source.removeEventListener("click", _showInstruction); // just in case

        // remove foreword and show instruction
        foreword.classList.add("disabled");
        instruction.classList.remove("disabled");

        goToNextStep.classList.add("hidden");

        // Show buttons "herkenbaar" and "onherkenbaar"
        setRecognizAbleButtonsStatus(article, true);
    };

    goToNextStep.addEventListener("click", _showInstruction);
}), _defineProperty(_articleBehaviourData, "house", function house(article) {
    setFocusPoint(article);

    var infoBalloonWrapper = article.getElementsByClassName("wrapper--info-balloon")[0];

    var instruction = infoBalloonWrapper.getElementsByClassName("instruction")[0];

    instruction.classList.remove("disabled");

    // Show buttons "herkenbaar" and "onherkenbaar"
    setRecognizAbleButtonsStatus(article, true);
}), _defineProperty(_articleBehaviourData, "house-num", function houseNum(article) {
    setFocusPoint(article);

    var infoBalloonWrapper = article.getElementsByClassName("wrapper--info-balloon")[0];
    console.log(infoBalloonWrapper);

    var instruction = infoBalloonWrapper.getElementsByClassName("instruction")[0];

    instruction.classList.remove("disabled");

    // Show buttons "herkenbaar" and "onherkenbaar"
    setRecognizAbleButtonsStatus(article, true);
}), _defineProperty(_articleBehaviourData, "open-door", function openDoor(article) {
    setTimeout(goToNextArticle, 1500);
}), _defineProperty(_articleBehaviourData, "throw-beer", function throwBeer(article) {
    setFocusPoint(article);

    var infoBalloonWrapper = article.getElementsByClassName("wrapper--info-balloon")[0];
    console.log(infoBalloonWrapper);

    var instruction = infoBalloonWrapper.getElementsByClassName("instruction")[0];

    instruction.classList.remove("disabled");

    // Show buttons "herkenbaar" and "onherkenbaar"
    setRecognizAbleButtonsStatus(article, true);
}), _defineProperty(_articleBehaviourData, "license-plate", function licensePlate(article) {
    setFocusPoint(article);

    var infoBalloonWrapper = article.getElementsByClassName("wrapper--info-balloon")[0];
    console.log(infoBalloonWrapper);

    var instruction = infoBalloonWrapper.getElementsByClassName("instruction")[0];

    instruction.classList.remove("disabled");

    // Show buttons "herkenbaar" and "onherkenbaar"
    setRecognizAbleButtonsStatus(article, true);
}), _defineProperty(_articleBehaviourData, "neighbor", function neighbor(article) {
    setFocusPoint(article);

    var infoBalloonWrapper = article.getElementsByClassName("wrapper--info-balloon")[0];
    console.log(infoBalloonWrapper);

    var instruction = infoBalloonWrapper.getElementsByClassName("instruction")[0];

    instruction.classList.remove("disabled");

    // Show buttons "herkenbaar" and "onherkenbaar"
    setRecognizAbleButtonsStatus(article, true);
}), _defineProperty(_articleBehaviourData, "route-3", function route3(article) {
    setTimeout(goToNextArticle, 1500);
}), _defineProperty(_articleBehaviourData, "police-desk", function policeDesk(article) {
    setTimeout(goToNextArticle, 1500);
}), _defineProperty(_articleBehaviourData, "uploading", function uploading(article) {
    setTimeout(goToNextArticle, 1500);
}), _articleBehaviourData);

var canUseNextButton = true;

// Show/hide buttons "herkenbaar" and "onherkenbaar"
function setRecognizAbleButtonsStatus(article, status) {
    var recognizeAbleOptions = article.querySelector(".overlay-effect span");
    if (recognizeAbleOptions != undefined) {
        if (status) {
            recognizeAbleOptions.classList.add("active");
        } else {
            recognizeAbleOptions.classList.remove("active");
        }
    }
}

function onSwitchArticle(article) {
    var id = article.id;

    var articleBehaviour = articleBehaviourData[id];
    if (articleBehaviour != undefined) {
        setTimeout(function () {
            // article is on his place
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

    for (var index = 0; index < buttonsToNextArticle.length; index++) {
        var button = buttonsToNextArticle[index];
        button.addEventListener("click", function () {
            if (canUseNextButton) {
                goToNextArticle();
            }
        });
    }

    // switch between articles //
    /////////////////////////////

});