'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Grid based on example from d3.layout.grid
var createHer = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var herInfo, herInfoDot, inciInfo, involInfo, herLink, herLinkInfo, width, delayScale, setData, data, herSvg, shapes, circles, grid, transition, updateLabels, groupByShape, random, capitalize, getColor, checkHer, updateInfo, highlightNode, updateHerInfo, updateInciInfo, updateInvolInfo, updateHerLink, checkVideo, checkData;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						checkData = function checkData(d) {
							if (d == 'X') return true;k;
							if (d.length > 0 && d != '') return d;
							return;
						};

						checkVideo = function checkVideo(d) {
							var change = d.vidChanges.toLowerCase();
							if (change == 'verwijderd') return false;
							return true;
						};

						updateHerLink = function updateHerLink(d) {
							herLink.classList.toggle('disabled', !checkVideo(d));
							herLink.setAttribute('href', d.link);
							herLinkInfo.textContent = d.vidChanges;
						};

						updateInvolInfo = function updateInvolInfo(d) {
							involInfo[0].textContent = checkData(d.involvedPeople);
						};

						updateInciInfo = function updateInciInfo(d) {
							inciInfo[0].textContent = checkData(d.inciCat);
							inciInfo[1].textContent = checkData(d.inci);
						};

						updateHerInfo = function updateHerInfo(d) {
							herInfo[0].textContent = checkData(d.routeShowed) ? herText.route : '';
							herInfo[1].textContent = checkData(d.recognisable) ? herText.recognisable : '';
							herInfo[2].textContent = checkData(d.otherRecognisable) ? herText.other : '';

							herInfoDot[0].style.background = checkData(d.routeShowed) ? herColor.routeShowed : 'none';
							herInfoDot[1].style.background = checkData(d.recognisable) ? herColor.recognisable : 'none';
							herInfoDot[2].style.background = checkData(d.otherRecognisable) ? herColor.otherRecognisable : 'none';
						};

						highlightNode = function highlightNode(d) {
							d3.selectAll('.her-node').style('opacity', function (item) {
								return item == d ? 1 : .2;
							});
						};

						updateInfo = function updateInfo(d) {
							updateHerInfo(d);
							updateInciInfo(d);
							updateInvolInfo(d);
							updateHerLink(d);

							highlightNode(d);
						};

						checkHer = function checkHer(d) {
							var keys = herKeys.filter(function (key) {
								return d[key] != '' && d[key].length > 0;
							});
							if (keys.length) return keys[0];
							return 'none';
						};

						getColor = function getColor(d) {
							var available = checkHer(d);
							// console.log(herColor[available]);
							return herColor[available];
						};

						capitalize = function capitalize(str) {
							return str[0].toUpperCase() + str.substr(1);
						};

						random = function random(start, end) {
							var range = end - start;
							return start + Math.floor(Math.random() * range);
						};

						groupByShape = function groupByShape() {
							grid.groupBy('shape');
							transition();
						};

						updateLabels = function updateLabels() {
							var groups = herLegend;

							// Provide d3 a key function so that labels are animated correctly
							// http://bost.ocks.org/mike/constancy/

							var legend = herSvg.append('g').selectAll('g').data(groups).enter().append('g').attr('y', 20).attr('transform', function (d, i) {
								return 'translate(' + (1 % i ? 200 : 31.125) + ', ' + (2 % i < 2 ? 60 : 20) + ')';
							});
							// .attr('transform', (d, i) =>  `translate(${1%i ? 250 : 31.125}, ${1%i ? i * 40 : i * 40})`);
							// .attr('transform', (d, i) =>  `translate(${1%i ? 31.125 : 150}, ${1%i ? i * 20 : i * 20})`);
							// .attr('transform', (d, i) =>  `translate(${i * 25}, ${20})`);

							legend.append('circle').attr('r', 25 / 2).attr('fill', 'red');

							legend.append('text').attr('x', 24).attr('y', 6).attr('dy', '0.0em').text(function (d) {
								return d;
							});
						};

						transition = function transition() {
							herSvg.attr('height', grid.height());
							shapes.transition().duration(750).delay(function (d) {
								return delayScale(d.groupIndex * 150 + d.index * 1);
							}).attr('transform', function (d) {
								return 'translate(' + d.x + ', ' + d.y + ')';
							});
							// updateLabels();
						};

						herInfo = document.querySelectorAll('.data__cat--her li');
						herInfoDot = document.querySelectorAll('.data__cat--dot');
						inciInfo = document.querySelectorAll('.data__cat--inci li');
						involInfo = document.querySelectorAll('.data__cat--invol li');
						herLink = document.querySelector('.data__info--details div a');
						herLinkInfo = document.querySelector('.data__info--details div p');
						width = document.getElementById('her-chart').getBoundingClientRect().width;
						delayScale = d3.scaleLinear().domain([0, 400]).range([0, 300]);
						_context.next = 25;
						return vlogData.map(function (d, i) {
							return _extends({}, d, {
								index: i,
								x: random(width / 2 - 100, width / 2 + 100),
								y: random(height / 2 - 100, height / 2 + 100),
								color: getColor(d),
								shape: 'circle',
								size: width < 450 ? 30 : 25
							});
						});

					case 25:
						setData = _context.sent;
						data = setData.sort(function (a, b) {
							return herOrder.indexOf(a.color) > herOrder.indexOf(b.color);
						});
						herSvg = d3.select('#data-her svg').attr('width', width).attr('height', height);
						shapes = herSvg.selectAll('.shape').data(data).enter().append('g').classed('her-node', true).attr('transform', function (d) {
							return 'translate(' + d.x + ', ' + d.y + ')';
						}).on('mouseenter', updateInfo);
						circles = shapes.filter(function (d) {
							return d.shape === 'circle';
						}).append('circle').attr('r', function (d) {
							return d.size / 2;
						}).attr('fill', function (d) {
							return d.color;
						});
						grid = d3.layoutGrid().width(width).height(height).colWidth(50).rowHeight(50)
						// .marginTop(0)
						.marginTop(40)
						// .marginTop(110)
						.marginLeft(31.125).sectionPadding(50).data(data);

						// testing out labeling using d3 (made using html atm)


						// function groupByColor() {
						// 	grid.groupBy('color');
						// 	transition();
						// }

						_context.next = 33;
						return groupByShape();

					case 33:
						_context.next = 35;
						return updateInfo(data[0]);

					case 35:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function createHer() {
		return _ref.apply(this, arguments);
	};
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }