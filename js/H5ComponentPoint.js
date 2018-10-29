/*散点图组件对象*/

var H5ComponentPoint=function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	// component.text("散点图组件对象");
	var base = cfg.data[0][1];
	$.each(cfg.data,function(idx,item){
		var point=$('<div class="point point_'+idx+'"></div>');
		// point.text(item[0]);
		// point.text(item[0]+" = "+item[1]);
		var name=$('<div class="name">'+item[0]+'</div>');
		var rate=$('<div class="per">'+item[1]*100+'%</div>');
		name.append(rate);
		point.append(name);
		var per=(item[1]/base*100)+"%";
		point.width(per).height(per);

		if(item[2]){
			point.css("background-color",item[2]);
		}

		if(item[3] !== undefined && item[4] !== undefined){
			// point.css({left:item[3],top:item[4]});
			point.css('left',item[3]).css('top',item[4]);
			// 暂存每个元素的left和top
			point.data("left",item[3]).data("top",item[4]);;
		}
		// 设置点元素的堆叠顺序zIndex,位置left和top
		point.css({"z-index":100-idx,"left":0,"top":0});
		point.css('transition','all 1s '+idx*.5+'s');
		component.append(point);
	});

	component.on("onLoad",function(){
		console.log("onLoad");
		component.find(".point").each(function(idx,item){
			$(item).css("left",$(item).data("left")).css("top",$(item).data("top"));

		});
	});
	component.on("onLeave",function(){
		console.log("onLeave");
		component.find(".point").each(function(idx,item){
			$(item).css("left",0).css("top",0);
			
		});
	});
	component.find(".point").on("click",function(){
		component.find(".point").removeClass("point_focus");
		$(this).addClass("point_focus");
		return false;
	}).eq(0).addClass("point_focus");
	return component;
};