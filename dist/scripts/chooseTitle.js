'use strict';

var checkBtns = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(el, i) {
        var isSelected;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        isSelected = el.classList.contains('button__select--selected');

                        if (!isSelected) {
                            _context.next = 3;
                            break;
                        }

                        return _context.abrupt('return');

                    case 3:
                        _context.next = 5;
                        return deselectBtn();

                    case 5:
                        _context.next = 7;
                        return selectBtn(el, i);

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function checkBtns(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var selectBtn = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(el, i) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!saveBtn.hasAttribute('disabled')) {
                            _context2.next = 3;
                            break;
                        }

                        _context2.next = 3;
                        return saveBtn.removeAttribute('disabled');

                    case 3:
                        _context2.next = 5;
                        return el.classList.add('button__select--selected');

                    case 5:
                        _context2.next = 7;
                        return titleInfo[i].classList.add('title__info--open');

                    case 7:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function selectBtn(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var deselectBtn = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var i;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        for (i = 0; i < titleBtns.length; i++) {
                            titleBtns[i].classList.remove('button__select--selected');
                            titleInfo[i].classList.remove('title__info--open');
                        }

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function deselectBtn() {
        return _ref3.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//@ts-check

var titleCon = document.getElementById('choose-title');
// const titleBtns = titleCon.getElementsByTagName('button');
var titleBtns = document.getElementsByClassName('button__select');
var titleInfo = document.getElementsByClassName('title__info');
var saveBtn = titleCon.getElementsByTagName('input')[0];

var _loop = function _loop(i) {
    titleBtns[i].addEventListener('click', function (el) {
        console.log('clicked');
        checkBtns(this, i);
    });
};

for (var i = 0; i < titleBtns.length; i++) {
    _loop(i);
}