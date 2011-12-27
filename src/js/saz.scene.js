/*
saz.js
モジュールテンプレート
*/

// ルート
var SAZ = SAZ || {};

// 名前空間
SAZ.namespace('SAZ.scene');
dojo.declare('SAZ.scene.Scene', null, {
	id: '',
	// コンストラクタ
	constructor: function(id) {
		this.id = id;
	},
	// 配列やオブジェクトなど、プリミティブでない型をクラスメンバとして宣言してしまうと、自動的に"static"として扱われる
	from: function(scene) {
		return new dojo.Deferred();
	},
	to: function(scene) {
		return new dojo.Deferred();
	}
});

// 配列やオブジェクトなど、プリミティブでない型をクラスメンバとして宣言してしまうと、自動的に"static"として扱われる
dojo.declare('SAZ.scene.SceneContainer', SAZ.scene.Scene, {
	
	// コンストラクタ
	constructor: function(id) {
		this.scenes_ = {};
		this.current_ = null;
	},
	
	//
	// private
	//
	getCurrent_: function() {
		return this.current_;
	},
	getCurrentId_: function() {
		return this.current_ ? this.current_.id : '';
	},
	getScene_: function(id) {
		return this.scenes_[id];
	},
	
	//
	// public
	//
	add: function(scene) {
		this.scenes_[scene.id] = scene;
	},
	change: function(id) {
		//this.current_ = this.getScene_(id);
		var def = new dojo.Deferred(),
			src = this.current_,
			dst = this.getScene_(id);
		if (dst === null) return;
		
		if (src === null) {
			def.then(function() {
				console.log('set current');
				this.current_ = dst;
			}).then(function() {
				console.log('dst.from(scene);');
				return dst.from(src);
			}).then(function() {
				console.log('complete');
			});
		}else{
			src.to(
				dst
			).then(function() {
				this.current_ = dst;
			}).then(function() {
				return dst.from(src)
			});
		}
		def.resolve();
		return def;
	}
});
// getter
SAZ.scene.SceneContainer.prototype.__defineGetter__("current", SAZ.scene.SceneContainer.prototype.getCurrent_);
SAZ.scene.SceneContainer.prototype.__defineGetter__("currentId", SAZ.scene.SceneContainer.prototype.getCurrentId_);
