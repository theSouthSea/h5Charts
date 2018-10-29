/*基本图文组件对象*/

var H5ComponentBase=function(name,cfg){
	var cfg=cfg || {};
	var id=('h5_c_'+Math.random()).replace(".","_");
	var cls="h5_component_"+cfg.type;
	var component=$('<div class="h5_component '+cls+' h5_component_name_'+name+'" id="'+id+'"></div>');

	cfg.text && component.text(cfg.text); //jshint ignore:line
	cfg.width && component.width(cfg.width/2); //jshint ignore:line
	cfg.height && component.height(cfg.height/2); //jshint ignore:line

	cfg.css && component.css(cfg.css);	//jshint ignore:line
	cfg.bg && component.css("background-image","url("+cfg.bg+")"); //jshint ignore:line
	if(cfg.center === true){
		component.css({
			marginLeft:(cfg.width/4*-1)+'px',
			left:'50%'
		});
	}

	if(typeof cfg.onclick === "function"){
		component.on("click",cfg.onclick);
	}
	component.on("onLoad",function(){
		setTimeout(function(){
			component.addClass(cls+"_load").removeClass(cls+"_leave");
			cfg.animateIn && component.animate(cfg.animateIn); //jshint ignore:line
		},cfg.delay || 0)
		return false;
	});
	component.on("onLeave",function(){
		setTimeout(function(){
			component.addClass(cls+"_leave").removeClass(cls+"_load");
			cfg.animateOut && component.animate(cfg.animateOut); //jshint ignore:line
		},cfg.delay || 0)
		return false;
	});

	return component; 
};