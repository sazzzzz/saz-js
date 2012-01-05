/*
saz.js
 */

// ルート
//var SAZ = SAZ || {};

SAZ = (function() {
	
	//
	// 依存関係
	//
	var dd = dojo.declare;
	
	//
	// パブリックAPI
	//
	return {
		
		/**
		 * 名前空間管理.
		 * 
		 * @param	{String} path 名前空間を表すパス.
		 * @return	{String} 名前空間オブジェクトを返す.
		 */
		namespace: function (path) {
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
		},
		
		/**
		 * （擬似）クラスを作成する。いまのところdojo.declareのエイリアス。
		 * 
		 * @param	{String}	className	クラス名。
		 * @param	{Class}	superClass	親クラス。
		 * @param	{Object}	classBody	クラスメンバを定義するオブジェクト。
		 */
		declare: function (className, superClass, classBody) {
			dojo.declare(className, superClass, classBody);
		},
		
		/**
		 * ミックスイン。
		 * 
		 * @param	{Object}	target	コピー先.
		 * @param	{Object}	source	コピー元.
		 * @param	{Array}	memberNames	（オプション）コピーするメンバの名前リスト.
		 * @param	{Array}	sourceMemberNames	（オプション）コピーするsourceメンバの名前リスト.
		 */
		mixin: function (target, source, memberNames, sourceMemberNames) {
			if(target == null || source == null) throw new Error("SAZ.mixin: 引数エラー.")

			var p;
			var i, n, tn, sn;

			if(memberNames == null) {
				memberNames = [];
				for(p in source){
					memberNames.push(p);
				}
			}
			if(sourceMemberNames == null) {
				sourceMemberNames = memberNames;
			}

			for(i = 0, n = Math.min(memberNames.length, sourceMemberNames.length); i < n; i++) {
				tn = memberNames[i];
				sn = sourceMemberNames[i];
				if(target[tn] == null) target[tn] = source[sn];
			}
		},
		
		END:''
	};
}());

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

SAZ.declare = dojo.declare;






