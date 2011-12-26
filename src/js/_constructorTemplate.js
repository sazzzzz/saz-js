/*
saz.js
コンストラクタを作成するモジュールテンプレート
*/

// ルート
var SAZ = SAZ || {};

// 名前空間
SAZ.namespace('SAZ.X');
SAZ.X = (function() {
	console.log('SAZ.X');
	
	//
	// 依存関係
	//
	//var uobj = SAZ.utils.object,
	//	ulang = SAZ.utils.lang;
	
	//
	// プライベートな「クラス」プロパティ
	//
	var Constr,
		_privateStatic = 'privateStatic';
	
	//
	// 初期化処理（があればこの辺で）
	//
	
	// パブリックAPI―コンストラクタ
	Constr = function (arg1) {
		console.log('--- SAZ.X コンストラクタ ---'+arg1);

		console.log('STATIC='+SAZ.X.STATIC);
		//console.log('STATIC='+this.STATIC);						// undefined
		//console.log('STATIC='+STATIC);							// Error: STATIC is not defind
		
		console.log('_privateStatic='+_privateStatic);
		//console.log('_privateStatic='+this._privateStatic);	// undefined

		console.log('prop1='+this.prop1);
		//console.log('prop1='+prop1);								// Error: prop1 is not defined
		
		this._name=arg1;
		_privateStatic=arg1+':'+'this is private class prop.';
		this.prop1=arg1+':'+'this is public prop.';
		SAZ.X.STATIC=arg1+':'+'this is static prop.';
	}
	
	// パブリックな「クラス」プロパティ（静的プロパティ）
	Constr.STATIC = 'static';
	
	// 記述方法
	// privateClassProp, this.prop1, SAZ.X.STATIC
	
	// パブリックAPI―プロトタイプ
	Constr.prototype = {
		constructor: SAZ.X,
		
		prop1: 'prop1',
		prop2: 'prop2',
		
		_name: 'name',
		
		/**
		 * テストメソッド.
		 * @param	{Object} dum 値が変更されたときに、呼び出すsetterメソッド.
		 * @return	{String} 'test'.
		 */
		test: function(dum){
			console.log('--- SAZ.X test ---'+this._name);

			console.log('STATIC='+SAZ.X.STATIC);
			//console.log('STATIC='+this.STATIC);						// undefined
			//console.log('STATIC='+STATIC);							// Error: STATIC is not defind

			console.log('_privateStatic='+_privateStatic);
			//console.log('_privateStatic='+this._privateStatic);	// undefined

			console.log('prop1='+this.prop1);
			//console.log('prop1='+prop1);								// Error: prop1 is not defined
			
			return 'test';
		},
		getProp: function(){
			return _privateStatic;
		}
	};
	
	// 新しい名前空間に代入されたコンストラクタを返す
	return Constr;
	
}());
