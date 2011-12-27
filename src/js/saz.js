/*
saz.js
 */

// ルート
var SAZ = SAZ || {};


/**
 * 名前空間管理.
 * 
 * @param	{String} path 名前空間を表すパス.
 * @return	{String} 名前空間オブジェクトを返す.
 */
SAZ.namespace = function (path) {
	var parts = path.split('.'),
		parent = SAZ,
		i,
		n;
	
	// 先頭のグローバルを取り除く
	if (parts[0] === 'SAZ') {
		parts = parts.slice(1);
	}
	
	for (i = 0, n = parts.length; i < n; i += 1) {
		// プロパティが存在しなければ作成する
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};


/**
 * クラス的な継承を行う.
 * 
 * @param	{Class}	ChildClass	子となるクラス.
 * @param	{Class} ParentClass	親クラス.
 */
SAZ.inherit = (function () {
	var F = function(){};
	return function (ChildClass, ParentClass) {
		F.prototype = ParentClass.prototype;
		ChildClass.prototype = new F();
		ChildClass.uber = ParentClass.prototype;
		ChildClass.prototype.constructor = ChildClass;
		//
		//ChildClass.prototype.parent = ParentClass.prototype.constructor;
		ChildClass.prototype.parent = ParentClass;
	}
}());



/*SAZ.declare = function (className, superClass, classBody) {
	dojo.declare(className, superClass, classBody);
};*/
SAZ.declare = dojo.declare;




