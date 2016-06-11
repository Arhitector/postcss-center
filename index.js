var postcss = require('postcss');

module.exports = postcss.plugin('postcss-center', function (opts) {
	opts = opts || {};
	return function (css, result) {

		css.walkDecls(decl => {
			if (decl.prop === 'center') {
				var position = "";
				var centerMethod =  {
					checkExist: function (parametr) {
						return decl.value.indexOf(parametr) !== -1;
					},
					createParams: function (obj) {
						return Object.assign({}, options.defParams, obj) ;
					},
					getPosition: function () {
						if (this.checkExist(options.abs)) {
							return "absolute";
						} else {
							return "relative";
						}
					},
					checkPosParams: function () {
						for (var key in decl.parent.nodes) {
							if(decl.parent.nodes[key].prop === "position") {
								return true;
							}else {
								return false;
							}
						};
					},
					getPosParams: function () {
						var posParams = {};
						if (!this.checkPosParams()) {
							posParams.prop = "position";
							posParams.value = this.getPosition();
							return this.createParams(posParams);
						}
					},
					trParams: function () {
						var transformParams = {};
						transformParams.prop = "transform";
						if (centerMethod.checkExist(options.center)) {
							transformParams.value = "translate(-50%,-50%)";
						}else if (centerMethod.checkExist(options.hor)) {
							transformParams.value = "translateX(-50%)";
						}else if (centerMethod.checkExist(options.ver)) {
							transformParams.value = "translateY(-50%)";
						}
						return this.createParams(transformParams);
					},
					leftParams: function() {
						var leftParams = {};
						if (this.checkExist(options.hor) || this.checkExist(options.center)) {
							leftParams.prop = "left";
							leftParams.value = '50%';
							return this.createParams(leftParams);
						};
						return "";
					},
					topParams: function() {
						var topParams = {};
						if (this.checkExist(options.ver) || this.checkExist(options.center)) {
							topParams.prop = "top";
							topParams.value = '50%';
							return this.createParams(topParams);
						};
						return "";
					},
					setRules: function() {
						rule.append(
							this.getPosParams(),
							this.leftParams(),
							this.topParams(),
							this.trParams()
						);
					}
				};
				const rule = postcss.rule({selector: decl.parent.selector});
				const options = {
					abs: "abs",
					center: "center",
					hor: "horizontal",
					ver: "vertical",
					defParams: {
						type: "decl",
						raw: {
							before: "\n\t",
							betwen: ":"
						}
					}
				};
				centerMethod.setRules();
				decl.root().insertAfter(decl.parent, rule)
				rule.source = decl.parent.source;
				decl.remove();
			}
		});
	};
});
