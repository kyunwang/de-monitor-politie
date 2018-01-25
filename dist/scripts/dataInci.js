'use strict';

var createBubble = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var bubbleChart, bubbleInfoHead, bubbleInfoLi, bubbleW, bubbleH, bubbleDiameter, rollupData, rollupInvolved, formattedData, bubbleColor, packLayout, rootNode, bubbleNodes, enterBubble, leaveBubble, updateInfo, getInitialInfo, getValue, getX, getY;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getY = function getY(d) {
              return d.y;
            };

            getX = function getX(d) {
              return d.x;
            };

            getValue = function getValue(name) {
              var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : rollupInvolved;

              var involvedValue = data.filter(function (item) {
                return item.key == name;
              });
              if (involvedValue.length === 0) return 0;
              return involvedValue[0].value;
            };

            getInitialInfo = function getInitialInfo() {
              bubbleInfoHead.textContent = 'Betrokkenen';
              bubbleInfoLi[0].textContent = getValue('Verdachte');
              bubbleInfoLi[1].textContent = getValue('Slachtoffer');
              bubbleInfoLi[2].textContent = getValue('Beide');
              bubbleInfoLi[3].textContent = d3.sum(rollupInvolved, function (item) {
                return item.value;
              });
            };

            updateInfo = function updateInfo(d) {
              if (!d.data.key || d.data.key == undefined) return;

              var filteredData = vlogData.filter(function (item) {
                return item.inciCat === d.data.key;
              });

              // roll up the data of involved people
              var filteredRollup = d3.nest().key(function (item) {
                return item.involvedPeople;
              }).rollup(function (item) {
                return item.length;
              }).entries(filteredData);

              // Update the number using getValue
              bubbleInfoHead.textContent = 'Betrokkenen bij categorie: ' + d.data.key;
              bubbleInfoLi[0].textContent = getValue('Verdachte', filteredRollup);
              bubbleInfoLi[1].textContent = getValue('Slachtoffer', filteredRollup);
              bubbleInfoLi[2].textContent = getValue('beide', filteredRollup);
              bubbleInfoLi[3].textContent = d3.sum(filteredRollup, function (item) {
                return item.value;
              });
            };

            leaveBubble = function leaveBubble(d) {
              d3.select(this).transition().duration(300).attr('fill', bubbleColor(d.data.value));
              getInitialInfo();
            };

            enterBubble = function enterBubble(d, i) {
              d3.select(this).transition().duration(300).attr("fill", "#ffa101");
              updateInfo(d);
            };

            bubbleChart = d3.select('#bubble-chart');
            bubbleInfoHead = document.querySelector('.data__info.data__info--bubble h3');
            bubbleInfoLi = document.querySelectorAll('.data__info.data__info--bubble li span');

            // Getting the info: https://github.com/d3/d3-selection/issues/128

            _context.next = 12;
            return bubbleChart.node().getBoundingClientRect().width;

          case 12:
            bubbleW = _context.sent;
            _context.next = 15;
            return bubbleChart.node().getBoundingClientRect().height;

          case 15:
            bubbleH = _context.sent;
            bubbleDiameter = [bubbleW, bubbleH];
            _context.next = 19;
            return d3.nest().key(function (d) {
              return d.inciCat;
            }).rollup(function (d) {
              return d.length;
            }).entries(vlogData);

          case 19:
            rollupData = _context.sent;
            _context.next = 22;
            return d3.nest().key(function (d) {
              return d.involvedPeople;
            }).rollup(function (d) {
              return d.length;
            }).entries(vlogData);

          case 22:
            rollupInvolved = _context.sent;
            formattedData = {
              name: 'parent',
              children: rollupData
            };
            bubbleColor = d3.scaleLinear().domain([1, d3.max(formattedData.children, function (d) {
              return d.value;
            })]).interpolate(d3.interpolateHcl).range([d3.rgb('#8CE2F1'), d3.rgb('#1ac5e3')]);
            packLayout = d3.pack().size(bubbleDiameter).padding(1);

            // Create hierarchy object

            rootNode = d3.hierarchy(formattedData).sum(function (d) {
              return d.value;
            });

            // Apply data to the pack layout

            packLayout(rootNode);

            bubbleNodes = bubbleChart.selectAll('g').data(rootNode.descendants()).enter().append('g');


            bubbleNodes.append('circle').attr('cx', getX).attr('cy', getY).attr('r', function (d) {
              return d.r;
            }).attr('fill', function (d) {
              return bubbleColor(d.data.value);
            }).on('mouseenter', enterBubble).on('mouseleave', leaveBubble);

            bubbleNodes.append('text')
            //  .classed('svg-text')
            .attr('dy', function (d) {
              return getY(d) + 5;
            }).attr('dx', function (d) {
              return getX(d) - 25;
            }) // trying to center the labels
            .text(function (d) {
              return d.children === undefined ? d.data.key : '';
            });

            // Setting the initial unfiltered info


            // Get the requested data and return the value if there is any


            getInitialInfo();

          case 32:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createBubble() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }