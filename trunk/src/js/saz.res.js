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
	var Deferred = dojo.Deferred;
	
	//
	// プライベートプロパティ
	//
	//var array_string_ = '[object Array]';
	
	
	//
	// パブリックAPI
	//
	return {
		
		/**
		 * 画像をロード. 
		 * 
		 * @param	{String}	url	画像のURL.
		 * @return	{Object}	Deferred.
		 */
		imageGet: function (url) {
			var def = new dojo.Deferred();
			
			var image = new Image();
			image.onload = function(e) {
				//console.log('image.onload:'+url);
				//console.dir(arguments[0]);
				def.resolve(e);
			};
			image.onerror = function(e) {
				console.log('image.onerror:'+url);
				//console.dir(arguments[0]);
				//def.reject(e);	//dojoのエラーが
				def.reject();
			};
			image.onabort = function(e) {
				console.log('image.onabort:'+url);
				//def.reject(e);	//dojoのエラーが
				def.reject();
			};
			image.src = url;
			
			return def;
		},
		
		END:''
	};
}());




/**
 * 複数ロードするインターフェース. 
 */
SAZ.res.IMultiLoader = SAZ.declare('SAZ.res.IMultiLoader', null, {
	
	EVENT_START: 'start',
	EVENT_PROGRESS: 'progress',
	EVENT_COMPLETE: 'complete',
	
	STATE_INIT: 'init',
	STATE_READY: 'ready',
	STATE_LOADING: 'loading',
	STATE_LOADED: 'loaded',
	
	
	/**
	 * コンストラクタ. 
	 */
	constructor: function() {
	},
	
	
	/**
	 * ロード開始. 
	 */
	start: function() {
	},
	
	/**
	 *ロード停止. 
	 */
	stop: function() {
	},
	
	/**
	 * ロードするURLを追加. 
	 * 
	 * @param	{String}	url	ロードするリソースのURL. 
	 * @return	{Number}	登録したインデックス値.
	 */
	addUrl: function(url) {
	},
	
	/**
	 * ロードするURLを複数追加. 
	 * 
	 * @param	{Array}	urls	ロードするURLの配列. 
	 */
	addUrls: function(urls) {
	},
	
	/**
	 * 登録したURLをすべて消去. 
	 */
	clearUrl: function() {
	},
	
	/**
	 * ロードしたリソースを取得. 
	 * 
	 * @param	{String}	url	URL.
	 * @return	{Object}	リソース.
	 */
	getResource: function(url) {
	},
	
	/**
	 * （オプション）ロードしたリソースを、インデックスで指定して取得. 
	 *
	 * @param	{Number}	index	インデックス値.
	 * @return	{Object}	リソース.
	 */
	getResourceAt: function(index) {
	},
	
	
	END: ''
});


/**
 * 画像を順番にロードするクラス. 
 *
 * @class	SerialImageLoader
 * @namespace	SAZ.res
 * 
 * var sil = new SAZ.res.SerialImageLoader();
 * sil.addUrl('js/images/DemoHandcursor.png');
 * sil.addUrl('js/images/GameReplayButton.png');
 * sil.addUrl('js/images/GameStartButton.png');
 * sil.start().then(
 * 	function(){
 * 		console.log('SerialImageLoader: comp');
 * 	}
 * );
 */
SAZ.res.SerialImageLoader = SAZ.declare('SAZ.res.SerialImageLoader', SAZ.res.IMultiLoader, {
	//依存関係
	SE_: SAZ.event,
	SU_: SAZ.util,
	
	state_: '',
	
	/**
	 * コンストラクタ. 
	 */
	constructor: function() {
		this.urls_ = [];
		this.startDef_ = null;
		this.state_ = this.STATE_INIT;
		
		SAZ.event.Observer.initialize(this);
	},
	
	getState_: function() {
		return this.state_;
	},
	
	getCount_: function() {
		return this.urls_.length;
	},
	
	makeResolve_: function(url,index) {
		var self = this;
		return function(){
			//console.log('SAZ.res.SerialImageLoader: 画像ロードできた: '+url);
			var event = new SAZ.event.Event(self.EVENT_PROGRESS,self);
			event.index = index;
			self.dispatch(event);
			return SAZ.res.imageGet(url);
		};
	},
	makeReject_: function(url,index) {
		return function(){
			console.log('SAZ.res.SerialImageLoader: 画像ロードエラー: '+url);
		}
	},
	
	/**
	 * ロード開始. 
	 */
	start: function() {
		this.state_ = this.STATE_LOADING;
		
		this.startDef_ = new dojo.Deferred();
		var def = this.startDef_;
		//var url;
		for(var i=0,n=this.urls_.length;i<n;i++){
			var url = this.urls_[i];
			def = def.then(
				this.makeResolve_(url,i), this.makeReject_(url,i)
			);
		}
		
		var self = this;
		var compDef = new dojo.Deferred();
		def.then(
			function(){
				// this=defなので、selfを使う
				self.state_ = self.STATE_LOADED;
				self.dispatch(new SAZ.event.Event(self.EVENT_COMPLETE,self));
				compDef.resolve();
			},function(){
				
			}
		);
		
		this.dispatch(new SAZ.event.Event(this.EVENT_START,self));
		this.startDef_.resolve();
		return compDef;
	},
	
	/**
	 *ロード停止. 
	 */
	stop: function() {
		throw new Error('SAZ.res.SerialImageLoader#stop 未実装です');
	},
	
	/**
	 * ロードするURLを追加. 
	 * 
	 * @param	{String}	url	画像URL. 
	 * @return	{Number}	登録したインデックス値.
	 */
	addUrl: function(url) {
		this.state_ = this.STATE_READY;
		var index = dojo.indexOf(this.urls_, url);
		if(index === -1){
			return this.urls_.push(url);
		}
		return index;
	},
	
	/**
	 * ロードするURLを複数追加. 
	 * 
	 * @param	{Array}	urls	画像URLの配列. 
	 */
	addUrls: function(urls) {
		for(var i=0,n=urls.length;i<n;i++){
			addUrl(urls[i]);
		}
	},
	
	/**
	 * URLを消去. 
	 */
	clearUrl: function() {
		this.state_ = this.STATE_INIT;
		this.urls_.length = 0;
	},
	
	/**
	 * ロードしたリソースを取得. 
	 * 
	 * @param	{String}	url	URL.
	 * @return	{Object}	リソース.
	 */
	getResource: function(url) {
		throw new Error('SAZ.res.SerialImageLoader#getResource 未実装です');
	},
	
	/**
	 * （オプション）ロードしたリソースを、インデックスで指定して取得. 
	 *
	 * @param	{Number}	index	インデックス値.
	 * @return	{Object}	リソース.
	 */
	getResourceAt: function(index) {
		throw new Error('SAZ.res.SerialImageLoader#getResourceAt 未実装です');
	},
	
	/**
	 * 指定インデックスのURL. 
	 * @param	{Number}	index	インデックス. 
	 */
	getUrl: function(index) {
		return this.urls_[index];
	},
	
	END: ''
});
// getter
SAZ.res.SerialImageLoader.prototype.__defineGetter__("state", SAZ.res.SerialImageLoader.prototype.getState_);
SAZ.res.SerialImageLoader.prototype.__defineGetter__("count", SAZ.res.SerialImageLoader.prototype.getCount_);
