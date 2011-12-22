/*
saz.js
コンストラクタを作成するモジュールテンプレート
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
	var Constr;
	
	//
	// 初期化処理（があればこの辺で）
	//
	
	// コンストラクタ
	Constr = function (arg1) {
		this.prop1 = arg1;
	}
	
	// プロトタイプ
	Constr.prototype = {
		constructor: SAZ.X,
		prop1: null,
		prop2: null
	};
	
	// 新しい名前空間に代入されたコンストラクタを返す
	return Constr;
	
}());
