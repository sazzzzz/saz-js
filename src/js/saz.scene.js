/*
saz.js
モジュールテンプレート
*/

// ルート
var SAZ = SAZ || {};
// 名前空間
SAZ.namespace('SAZ.scene');


SAZ.declare('SAZ.scene.Scene', null, {
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
SAZ.declare('SAZ.scene.SceneContainer', SAZ.scene.Scene, {
	
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
		if (this.getScene_(id) == null) throw new Error('SAZ.scene.SceneContainer#change: 移動先が見つかりません。');
		
		//this.current_ = this.getScene_(id);
		var src = this.current_,
			dst = this.getScene_(id);
		var def, defStart, defTo, defChange, defFrom, defComp;
		
		if (src != null) {
			defTo = new dojo.Deferred();
			defTo.then(function() {
				console.log('SceneContainer.change: src.to(scene);');
				return src.to(dst);
			});
			def = defTo;
			defStart = defTo;
		}else{
			def = new dojo.Deferred();
			defStart = def;
		}
		defChange = def.then(function() {
			console.log('SceneContainer.change: set current');
			this.current_ = dst;
		});
		defFrom = defChange.then(function() {
			console.log('SceneContainer.change: dst.from(scene);');
			return dst.from(src);
		});
		defComp = defFrom.then(function() {
			console.log('SceneContainer.change: complete');
		});
		
		
		/*if (src == null) {
			def.then(function() {
				console.log('SceneContainer.change: set current');
				this.current_ = dst;
			});
			var defFrom = def.then(function() {
				console.log('SceneContainer.change: dst.from(scene);');
				return dst.from(src);
			});
			var defComp = defFrom.then(function() {
				console.log('SceneContainer.change: complete');
			});
		}else{
			src.to(
				dst
			).then(function() {
				this.current_ = dst;
			}).then(function() {
				return dst.from(src)
			});
		}*/
		def.resolve();
		return defComp;
	}
});
// getter
SAZ.scene.SceneContainer.prototype.__defineGetter__("current", SAZ.scene.SceneContainer.prototype.getCurrent_);
SAZ.scene.SceneContainer.prototype.__defineGetter__("currentId", SAZ.scene.SceneContainer.prototype.getCurrentId_);
