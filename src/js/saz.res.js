/*
saz.res.js
リソース関連パッケージ
*/

// ルート
var SAZ = SAZ || {};
// 名前空間
SAZ.namespace('SAZ.res');

SAZ.res = (function() {
	
	//
	// 依存関係
	//
	//var uobj = SAZ.utils.object,
	//	ulang = SAZ.utils.lang;
	
	//
	// プライベートプロパティ
	//
//	var array_string_ = '[object Array]';
	
	
	//
	// 初期化処理（があればこの辺で）
	//
	
	
	//
	// パブリックAPI
	//
	return {
		
		/**
		 * 画像をロード
		 * 
		 * @param	{String}	url	画像のURL.
		 * @return	{Object}	Deferred.
		 */
		imageGet: function (url) {
			var def = new dojo.Deferred();
			
			var image = new Image();
			image.onload = function() {
				def.resolve();
			};
			image.onerror = function() {
				def.reject();
			};
			image.onabort = function() {
				def.reject();
			};
			image.src = url;
			
			return def;
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


// ILoaderインターフェース
//SAZ.declare('SAZ.res.ILoader', null, {
//	EVENT_START: 'start',
//	//EVENT_PROGRESS: 'progress',
//	EVENT_COMPLETE: 'complete',
//	
//	url_: '',
//	
//	/**
//	 * コンストラクタ. 
//	 */
//	constructor: function() {
//		this.image_ = new Image();
//		this.image_.onload = this.image_onload_;
//		
//		SAZ.event.Observer.initialize(this);
//	},
//	
//	image_onload_: function() {
//		
//	},
//	getImage_: function() {
//		return this.image_;
//	},
//	
//	/**
//	 * ロードする. 
//	 * 
//	 * @param	{String}	url	画像URL. 
//	 */
//	load: function(url) {
//		this.url_ = url;
//		this.image_.src = url;
//	},
//	unload: function() {
//		
//	},
//	
//	END: ''
//});
//// getter
//SAZ.res.ILoader.prototype.__defineGetter__("image", SAZ.res.ILoader.prototype.getImage_);



SAZ.declare('SAZ.res.IMultiLoader', SAZ.res.ILoader, {
	
	// コンストラクタ
	constructor: function(params) {
		
	},
	
	addUrl: function(urlOrUrls) {
		
	},
	
	END: ''
});
