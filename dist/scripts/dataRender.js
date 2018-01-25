"use strict";

var getData = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!vlogData) {
              vlogData = data;
            }
            // data = await vlogData.slice(0, 40);
            console.log("The Data", vlogData);
            _context.next = 4;
            return createHer();

          case 4:
            _context.next = 6;
            return createBubble();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getData(_x) {
    return _ref.apply(this, arguments);
  };
}();
// window.addEventListener('resize', getData);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// @ts-check
// Used https://www.zamzar.com/convert/xlsx-to-csv/ to convert the data

d3.csv("data/data.csv", cleanData, getData);

function cleanData(data, index) {
  // Get all the keys at the start
  if (index === 0) {
    keys = Object.keys(data);
  }

  // Returning a new object with better keynaming
  if (data[keys[0]]) {
    // Check wether there is data by checking the id/vlognumber
    return {
      number: data[keys[0]],
      vlogger: data[keys[1]],
      link: data[keys[2]],
      inci: data[keys[3]],
      inciCat: data[keys[4]],
      clipLeng: data[keys[5]],
      pubDate: data[keys[6]],
      routeShowed: data[keys[7]],
      recognisable: data[keys[8]],
      otherRecognisable: data[keys[9]],
      involvedPeople: data[keys[10]],
      vidChanges: data[keys[11]]
    };
  }
}