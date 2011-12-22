/*
saz.event.js
MVP関係
*/

// ルート
var SAZ = SAZ || {};


// 名前空間
SAZ.namespace('SAZ.mvp.Value');
/**
 * Value
 **/
SAZ.mvp.Value = (function() {
	
	//
	// 依存関係
	//
	var WatchEvent = SAZ.event.WatchEvent,
		Observer = SAZ.event.Observer;
	
	//
	// プライベートプロパティ
	//
	var Constr;
		//_value;		// 共有化されちゃう？
	
	//
	// 初期化処理（があればこの辺で）
	//
	
	// コンストラクタ
	Constr = function (value) {
		//_value = value;
		this.setValue(value);
		if (this.addObserver == null) Observer.initialize(this);
	};
	
	// 静的メンバ？
	Constr.EVENT_CHANGING = 'changing';
	Constr.EVENT_CHANGED = 'changed';
	
	// プロトタイプ
	Constr.prototype = {
		constructor: SAZ.mvp.Value,
		_value: null,
		getValue: function () {
			return this._value;
		},
		setValue: function (value) {
			var old=this._value;
			if(this.notify)this.notify(new WatchEvent(SAZ.mvp.Value.EVENT_CHANGING,this,old,value));
			this._value = value;
			if(this.notify)this.notify(new WatchEvent(SAZ.mvp.Value.EVENT_CHANGED,this,old,value));
		}
	};
	//if (Constr.prototype.addObserver == null) SAZ.event.Observer.initialize(Constr.prototype);
	
	// 新しい名前空間に代入されたコンストラクタを返す
	return Constr;
	
}());

// 静的メンバ
//SAZ.mvp.Value.EVENT_CHANGING = 'changing';
//SAZ.mvp.Value.EVENT_CHANGED = 'changed';
	
//console.log(SAZ.mvp.Value.prototype.addObserver);
//if (SAZ.mvp.Value.prototype.addObserver == null) SAZ.event.Observer.initialize(SAZ.mvp.Value.prototype);
