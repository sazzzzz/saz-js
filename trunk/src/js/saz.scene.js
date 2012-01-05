/*
saz.js
モジュールテンプレート
*/

// ルート
var SAZ = SAZ || {};
// 名前空間
SAZ.namespace('SAZ.scene');



// 名前空間
//SAZ.namespace('SAZ.scene.Scene');
/*SAZ.scene.Scene = (function() {
	var Constr;
	Constr = function (id) {
	};
	Constr.prototype = {
		constructor: SAZ.scene.Scene
	};
	return Constr;
	
}());*/

SAZ.declare('SAZ.scene.Scene', null, {
	id: '',
	// コンストラクタ
	constructor: function(id) {
		this.id = id;
	},
	// 配列やオブジェクトなど、プリミティブでない型をクラスメンバとして宣言してしまうと、自動的に"static"として扱われる
	from: function(scene) {
		var d = new dojo.Deferred();
		d.resolve();
		return d;
	},
	to: function(scene) {
		var d = new dojo.Deferred();
		d.resolve();
		return d;
	}
});


// 名前空間
//SAZ.namespace('SAZ.scene.SceneContainer');
/**
 * Sceneのコンテナ. 
 * TODO	コンテナの入れ子サポート。Sceneの順番サポート。
 */
SAZ.declare('SAZ.scene.SceneContainer', SAZ.scene.Scene, {
	// 配列やオブジェクトなど、プリミティブでない型をクラスメンバとして宣言してしまうと、自動的に"static"として扱われる
	
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
			dst = this.getScene_(id),
			self = this;
		//console.log('this.current_='+this.current_);
		
		var defStart, defChange, defFrom, defComp;
		var defPrev;
		if (src != null) {
			defStart = new dojo.Deferred();
			defPrev = defStart.then(function() {
				console.log('SceneContainer.change: src.to('+dst+');');
				return src.to(dst);
			});
		}else{
			defStart = new dojo.Deferred();
			defPrev = defStart;
		}
		defChange = defPrev.then(function() {
			console.log('SceneContainer.change: set current');
			self.current_ = dst;
		});
		defFrom = defChange.then(function() {
			console.log('SceneContainer.change: dst.from('+src+');');
			return dst.from(src);
		});
		defComp = defFrom.then(function() {
			console.log('SceneContainer.change: complete');
		});
		
		defStart.resolve();
		return defComp;
		
		
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
		}
		def.resolve();
		return defComp;
		*/
	}
});
// getter
SAZ.scene.SceneContainer.prototype.__defineGetter__("current", SAZ.scene.SceneContainer.prototype.getCurrent_);
SAZ.scene.SceneContainer.prototype.__defineGetter__("currentId", SAZ.scene.SceneContainer.prototype.getCurrentId_);
