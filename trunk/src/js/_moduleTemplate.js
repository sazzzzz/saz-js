/*
saz.js
モジュールテンプレート
*/

// ルート
var SAZ = SAZ || {};

// 名前空間
SAZ.namespace('SAZ.X');
SAZ.X = (function() {
	
	//
	// 依存関係
	//
	//var uobj = SAZ.utils.object,
	//	ulang = SAZ.utils.lang;
	
	//
	// プライベートプロパティ
	//
	var array_string_ = '[object Array]',
		oToString_ = Object.prototype.toString,
		aSlice_ = Array.prototype.slice;
	
	//
	// プライベートメソッド
	//
	hoge_ = function () {
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
		},
		
		END:''
	};
}());








