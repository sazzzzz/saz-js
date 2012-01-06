/*
saz.js
コンストラクタを作成するモジュールテンプレート
*/

// ルート
var SAZ = SAZ || {};

// 名前空間
SAZ.namespace('SAZ.X.Parent');
SAZ.X.Parent = (function() {
	//
	// 依存関係
	//
	//var uobj = SAZ.utils.object;
	
	//
	// プライベートな「クラス」プロパティ
	//
	var Constr,
		privateStatic_ = 'privateStatic';
	
	//
	// 初期化処理（があればこの辺で）
	//
	
	// パブリックAPI―コンストラクタ
	Constr = function (arg1) {
		console.log('--- SAZ.X.Parent コンストラクタ ---'+arg1);

		console.log('STATIC='+SAZ.X.Parent.STATIC);
		//console.log('STATIC='+this.STATIC);						// undefined
		//console.log('STATIC='+STATIC);							// Error: STATIC is not defind
		
		console.log('privateStatic_='+privateStatic_);
		//console.log('privateStatic_='+this.privateStatic_);	// undefined

		console.log('prop1='+this.prop1);
		//console.log('prop1='+prop1);								// Error: prop1 is not defined
		
		this.name_=arg1;
		privateStatic_=arg1+':'+'this is private class prop.';
		this.prop1=arg1+':'+'this is public prop.';
		SAZ.X.Parent.STATIC=arg1+':'+'this is static prop.';
	};
	
	// パブリックな「クラス」プロパティ（静的プロパティ）
	Constr.STATIC = 'static';
	
	// 記述方法
	// privateClassProp, this.prop1, SAZ.X.Parent.STATIC
	
	// パブリックAPI―プロトタイプ
	Constr.prototype = {
		constructor: SAZ.X,
		
		prop1: 'prop1',
		prop2: 'prop2',
		
		name_: 'name',
		current_: '',
		
		getCurrent_: function() {
			return current_;
		},
		
		/**
		 * テストメソッド.
		 * @param	{Object} dum パラメータ説明.
		 * @return	{String} 戻り値の説明.
		 */
		test: function(dum){
			console.log('--- SAZ.X.Parent test() ---'+this.name_);

			console.log('STATIC='+SAZ.X.Parent.STATIC);
			//console.log('STATIC='+this.STATIC);						// undefined
			//console.log('STATIC='+STATIC);							// Error: STATIC is not defind

			console.log('privateStatic_='+privateStatic_);
			//console.log('privateStatic_='+this.privateStatic_);	// undefined
			console.log('getProp()='+this.getProp());

			console.log('prop1='+this.prop1);
			//console.log('prop1='+prop1);								// Error: prop1 is not defined
			
			return 'test';
		},
		getProp: function(){
			return privateStatic_;
		}
	};
	
	// 新しい名前空間に代入されたコンストラクタを返す
	return Constr;
	
}());
// getter
SAZ.X.Parent.prototype.__defineGetter__("current", SAZ.X.Parent.prototype.getCurrent_);


//
// FIXME	継承はうまく動作しない。保留中。
//

// 名前空間
SAZ.namespace('SAZ.X.Child');
SAZ.X.Child = (function() {
	//
	// 依存関係
	//
	var Parent = SAZ.X.Parent;
	
	//
	// プライベートな「クラス」プロパティ
	//
	var Constr,
		privateStatic_ = 'privateStatic@Child';
	
	//
	// 初期化処理（があればこの辺で）
	//
	
	// パブリックAPI―コンストラクタ
	Constr = function (arg1) {
		console.log('--- SAZ.X.Child コンストラクタ ---'+arg1);
		
		// 親コンストラクタ
		this.parent(arg1);
		//Parent.apply(this, [arg1]);
		
		this.name_=arg1;
		privateStatic_=arg1+':'+'this is private class prop.@Child';
		this.prop1=arg1+':'+'this is public prop.@Child';
		SAZ.X.Child.STATIC=arg1+':'+'this is static prop.@Child';
	}
	
	// パブリックな「クラス」プロパティ（静的プロパティ）
	Constr.STATIC = 'static@Child';
	
	// 記述方法
	// privateClassProp, this.prop1, SAZ.X.Parent.STATIC
	
	// パブリックAPI―プロトタイプ
	Constr.prototype = {
		constructor: SAZ.X,
		
		// override
		name_: 'name@Child',
		
		getProp: function(){
			return privateStatic_+'@Child';
		},
		test2: function(){
			console.log('--- SAZ.X.Child test2() ---'+this.name_);

			console.log('STATIC='+SAZ.X.Child.STATIC);
			console.log('privateStatic_='+privateStatic_);
			console.log('getProp()='+this.getProp());
			console.log('prop1='+this.prop1);
			return 'test2';
		}
	};
	
	// 継承
	//SAZ.inherit(SAZ.X.Child, SAZ.X.Parent);
	
	// 新しい名前空間に代入されたコンストラクタを返す
	return Constr;
	
}());
// 継承
SAZ.inherit(SAZ.X.Child, SAZ.X.Parent);

