let checkBtns = (() => {
    var _ref = _asyncToGenerator(function* (el, i) {
        let isSelected = el.classList.contains('button__select--selected');
        if (isSelected) return;
        yield deselectBtn();
        yield selectBtn(el, i);
    });

    return function checkBtns(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

let selectBtn = (() => {
    var _ref2 = _asyncToGenerator(function* (el, i) {
        if (saveBtn.hasAttribute('disabled')) yield saveBtn.removeAttribute('disabled');
        yield el.classList.add('button__select--selected');
        yield titleInfo[i].classList.add('title__info--open');
    });

    return function selectBtn(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})();

let deselectBtn = (() => {
    var _ref3 = _asyncToGenerator(function* () {
        for (let i = 0; i < titleBtns.length; i++) {
            titleBtns[i].classList.remove('button__select--selected');
            titleInfo[i].classList.remove('title__info--open');
        }
    });

    return function deselectBtn() {
        return _ref3.apply(this, arguments);
    };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//@ts-check

const titleCon = document.getElementById('choose-title');
// const titleBtns = titleCon.getElementsByTagName('button');
const titleBtns = document.getElementsByClassName('button__select');
const titleInfo = document.getElementsByClassName('title__info');
const saveBtn = titleCon.getElementsByTagName('input')[0];

for (let i = 0; i < titleBtns.length; i++) {
    titleBtns[i].addEventListener('click', function (el) {
        console.log('clicked');
        checkBtns(this, i);
    });
}