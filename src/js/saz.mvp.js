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
	


// 名前空間
SAZ.namespace('SAZ.mvp.ValueWatcher');
SAZ.mvp.ValueWatcher = (function() {
	
	//
	// 依存関係
	//
	var Value = SAZ.mvp.Value;
	
	//
	// プライベートプロパティ
	//
	var Constr;
	
	// コンストラクタ
	Constr = function (host,handler) {
		//this.unwatch();
		this.watch(host, handler);
	}
	
	// プロトタイプ
	Constr.prototype = {
		constructor: SAZ.mvp.Value,
		
		_host: null,
		_handler: null,
		
		getValue: function(){
			return _host.getValue();
		},
		watch: function(host,handler) {
			if (host==null||handler==null) return null;
			
			this.unwatch();
			this._host=host;
			this._handler=handler;
			this._host.addObserver(SAZ.mvp.Value.EVENT_CHANGED, this._handler);
		},
		unwatch: function(){
			if (this._host==null || this._handler==null) return null;
			
			this._host.removeObserver(SAZ.mvp.Value.EVENT_CHANGED, this._handler);
			this._host=null;
			this._handler=null;
			return this;
		}
	};
	
	// 新しい名前空間に代入されたコンストラクタを返す
	return Constr;
	
}());

// 名前空間
SAZ.namespace('SAZ.mvp.BindingUtil');
SAZ.mvp.BindingUtil = (function() {
	
	//
	// 依存関係
	//
	var Value = SAZ.mvp.Value,
		ValueWathcher = SAZ.mvp.ValueWatcher;
	
	//
	// パブリックAPI
	//
	return {
		/**
		 * プロパティをValueにバインド.
		 * @param	{Object} site バインドされるプロパティを持つオブジェクト.
		 * @param	{Object} prop siteに定義されているプロパティの名前.
		 * @param	{Object} value Value.
		 * @return	{ValueWatcher} ValueWatcherインスタンス.
		 */
		bindProperty: function (site,prop,value) {
			return new SAZ.mvp.ValueWatcher(value,function(e){
				site[prop]=e.newValue;
			});
		},
		
		/**
		 * 関数setterをValueにバインド.
		 * @param	{Object} setter 値が変更されたときに、呼び出すsetterメソッド.
		 * @param	{Object} value Value.
		 * @return	{ValueWatcher} ValueWatcherインスタンス.
		 */
		bindSetter: function (setter,value) {
			return new SAZ.mvp.ValueWatcher(value,function(e){
				setter(value);
			});
		},
		
		END:''
	};
}());

