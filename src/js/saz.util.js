/*
saz.js
ユーティリティパッケージ
*/

// ルート
var SAZ = SAZ || {};

// 名前空間
SAZ.namespace('SAZ.util');
SAZ.util = (function() {
	
	//
	// 依存関係
	//
	//var uobj = SAZ.utils.object,
	//	ulang = SAZ.utils.lang;
	
	//
	// プライベートプロパティ
	//
	var _array_string = '[object Array]',
		_oToString = Object.prototype.toString,
		_aSlice = Array.prototype.slice;
	
	//
	// プライベートメソッド
	//
	_hoge = function () {
		//
	};
	
	//
	// 初期化処理（があればこの辺で）
	//
	
	
	//
	// パブリックAPI
	//
	return {
		
		inArray: function (search, array) {
		},
		
		/**
		 * 配列かどうか調べる. 
		 * @param	{Object} target 調べるオブジェクト.
		 * @return	{Boolean} 配列ならtrue、そうでないならfalse.
		 */
		isArray: function (target) {
			return _oToString.call(target) === _array_string;
		},
		
		
		/**
		 * カリー化する
		 * @param	{Function} func カリー化対象の関数.
		 * @return	{Function} カリー化された関数を返す.
		 */
		curry: function (func) {
			var stored_args = _aSlice.call(arguments, 1);
			return function() {
				var new_args = _aSlice.call(arguments),
					args = stored_args.concat(new_args);
				return func.apply(null, args);
			};
		},
		
		/**
		 * オブジェクトの「浅い」コピーを作成します.
		 * @param	{Object} parent コピー元.
		 * @param	{Object} child （オプション）コピー先. 省略すると新しいオブジェクトを作成する. 
		 * @return	childを省略した場合はコピーしたオブジェクトを返す. 
		 */
		extend: function (parent, child) {
			var i;
			child = child || {};
			
			for (i in parent) {
				if (parent.hasOwnProperty(i)) {
					child[i] = parent[i];
				}
			}
			return child;
		},
		
		/**
		 * オブジェクトの「深い」コピーを作成します. 
		 * @param	{Object} parent コピー元.
		 * @param	{Object} child （オプション）コピー先. 省略すると新しいオブジェクトを作成する. 
		 * @return	childを省略した場合はコピーしたオブジェクトを返す. 
		 */
		extendDeep: function (parent, child) {
			var i;
			child = child || {};
			
			for (i in parent) {
				if (parent.hasOwnProperty(i)) {
					if (typeof parent[i] === 'object') {
						child[i] = (_oToString.call(parent[i]) === _array_string) ? [] : {};
						//SAZ.utils.extendDeep(parent[i], child[i]);
						arguments.callee(parent[i], child[i]);
					} else {
						child[i] = parent[i];
					}
					
				}
			}
			return child;
		},
		
		
		
		END:'END'
	};
}());








