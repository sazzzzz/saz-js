/*
saz.event.js
イベント関係
*/

// ルート
var SAZ = SAZ || {};


// 名前空間
SAZ.namespace('SAZ.event.Event');

//
// 参考までにJSのビルトインEvent
// 
// http://www.tohoho-web.com/js/event.htm
// http://phpjavascriptroom.com/?t=js&p=event_object
// 
// type	String	発生したイベントの型を取得
// target	Object	イベントの発生元	IE未対応
// マウスの座標
// screenX, screenY, pageX, pageY, clientX, clientY, offsetX, offsetY
// キーボードイベント
// keyCode, which, modfiers
// 
//

/**
 * Eventクラス. 
 **/
SAZ.event.Event = (function() {
	
	//
	// プライベートプロパティ
	//
	var Constr;
	
	//
	// 初期化処理（があればこの辺で）
	//
	
	// コンストラクタ
	Constr = function (type, target) {
		this.type = type;
		this.target = target;
	}
	
	// プロトタイプ
	Constr.prototype = {
		constructor: SAZ.event.Event,
		type: '',
		target: null,
		context: null
	};
	
	// 新しい名前空間に代入されたコンストラクタを返す
	return Constr;
	
}());




// 名前空間
SAZ.namespace('SAZ.event.WatchEvent');
/**
 * Event
 **/
SAZ.event.WatchEvent = (function() {
	
	//
	// 依存関係
	//
	var Event = SAZ.event.Event;
	
	//
	// プライベートプロパティ
	//
	var Constr;
	
	//
	// 初期化処理（があればこの辺で）
	//
	
	// コンストラクタ
	Constr = function (type, target, oldValue, newValue) {
		// 親コンストラクタ
		Event.apply(this, [type, target]);
		
		this.oldValue = oldValue;
		this.newValue = newValue;
	}
	
	// プロトタイプ
	Constr.prototype.oldValue = null;
	Constr.prototype.newValue = null;
	
	// 新しい名前空間に代入されたコンストラクタを返す
	return Constr;
	
}());
// 継承
SAZ.inherit(SAZ.event.WatchEvent, SAZ.event.Event);


// 名前空間
SAZ.namespace('SAZ.event.Observer');
/**
 * Observer ミックスイン.
 **/
SAZ.event.Observer = (function() {
	
	//
	// 依存関係
	//
	var Event = SAZ.event.Event;
	
	//
	// プライベートプロパティ
	//
	//var array_string_ = '[object Array]';
	
	//
	// プライベートメソッド
	//
	addObserver_ = function (type, listener, context) {
		var listeners = this.listeners_;
		if (!listeners[type]) {
			listeners[type] = [];
		}
		listeners[type].push([listener, context]);		
	};
	removeObserver_ = function (type, listener) {
		var listeners = this.listeners_;
		if(listeners[type]){
			var i;
			var len = listeners[type].length;
			for(i = len - 1; i >= 0; i--){
				var arr = listeners[type][i];
				if(arr[0] == listener){
					listeners[type].splice(i, 1);
				}
			}
		}		
	};
	dispatch_ = function (e) {
		var listeners = this.listeners_;
		//var e = new SAZ.event.Event(type, this);
		var type = e.type;
		if(listeners[type]){
			var i;
			var len = listeners[type].length;
			for(i = 0; i < len; i++){
				var arr = listeners[type][i];
				e.context = arr[1];
				arr[0](e);
			}
		}
	};
	
	//
	// 初期化処理（があればこの辺で）
	//
	
	
	//
	// パブリックAPI
	//
	return {
		
		/**
		 * 対象オブジェクトをObserverとして初期化。
		 * addObserver、removeObserver、dispatchの3つのメソッドを追加。すでにメンバが定義されていたら中断。
		 * @return	初期化できたらtrue、できなかったらfalse。
		 */
		initialize: function (target) {
			if (target.listeners_!=null || target.addObserver!=null || target.removeObserver!=null || target.dispatch!=null) return false;
			
			target.listeners_ = {};
			if(target.addObserver==null)target.addObserver = addObserver_;
			if(target.removeObserver==null)target.removeObserver = removeObserver_;
			if(target.dispatch==null)target.dispatch = dispatch_;
			//SAZ.mixin(target, this, ['addObserver', 'removeObserver', 'dispatch'], ['addObserver_', 'removeObserver_', 'dispatch_'])
			return true;
		},
		END:''
	};
}());








