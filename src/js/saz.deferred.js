/*
saz.deferred.js
*/

// ルート
var SAZ = SAZ || {};

// 名前空間
SAZ.namespace('SAZ.deferred');
SAZ.deferred = (function() {
	
	//
	// 依存関係
	//
	var Deferred_ = dojo.Deferred;
	var Tween_ = Tween;
	
	//
	// パブリックAPI
	//
	return {
		
		/**
		 * TweenJSするDeferredを作成. 
		 *
		 * @param	{Object} tween Tweenインスタンス. 
		 * @return	{Object} 作成されたDeferredインスタンス.
		 */
		tween: function(tween) {
			var d = new Deferred_();
			tween.call(function() {
				d.resolve();
			})
			return d;
		},
		/**
		 * TweenJSするthen用Functionを作成. 
		 *
		 * @param	{Object} tween Tweenインスタンス. 
		 * @return	{Function} 作成されたthen用Function.
		 */
		thenTween: function(tween) {
			return function() {
				return SAZ.deferred.tween(tween);
			};
		},
		
		
		/**
		 * 指定秒待つDeferredを作成. 
		 * 
		 * @param	{Number} msec ウェイト時間. 単位はミリ秒.
		 * @return	{Object} 作成されたDeferredインスタンス.
		 */
		wait: function (msec) {
			var d = new Deferred_();
			setTimeout(function(){
				d.resolve();
			},msec);
			return d;
		},
		/**
		 * 指定秒待つthen用Functionを作成.
		 * 
		 * @param	{Number} msec ウェイト時間. 単位はミリ秒.
		 * @return	{Function} 作成されたthen用Function.
		 */
		thenWait: function (msec) {
			return function() {
				return SAZ.deferred.wait(msec);
			};
		},
		
		
		/**
		 * 指定メッセージをconsole.logで出力するDeferredを作成.
		 * 
		 * @param	{String} message 出力する文字列.
		 * @return	{Object} 作成されたDeferredインスタンス.
		 */
		log: function (message) {
			var d = new Deferred_();
			if (console) console.log(message);
			d.resolve();
			return d;
		},
		/**
		 * 指定メッセージを出力するthen用Functionを作成.
		 * 
		 * @param	{String} message 出力する文字列.
		 * @return	{Function} 作成されたthen用Function.
		 */
		thenLog: function (message) {
			return function() {
				return SAZ.deferred.log(message);
			};
		},
		
		END:''
	};
}());










