/*饼图组件对象*/

var H5ComponentPie=function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	// component.text("Polyline");
	
	// 绘制网格线
	var w=cfg.width;
	var h=cfg.height;

	// 加一个画布用于做网格线背景 背景层
	var cns=document.createElement("canvas");
	var ctx=cns.getContext("2d");
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	$(cns).css("zIndex",1);
	component.append(cns);
	
	var r=w/2;
	// 绘制底层
	ctx.beginPath();
	ctx.fillStyle="#eee";
	ctx.strokeStyle="#eee";
	ctx.lineWidth=1;
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();


	// 绘制数据层
	var cns=document.createElement("canvas");
	var ctx=cns.getContext("2d");
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	$(cns).css("zIndex",2);
	component.append(cns);

	var colors=["red","blue","green","orange","gray","black","pink","brown","white","yellow","silver","gold","purple","grey","cyan","indigo"];
	// 设置起始的角度
	var sAngle=1.5*Math.PI;//12点钟方向
	var eAngle=0; //结束角度
	var aAngle=2*Math.PI;//100%结束角度

	// ctx.beginPath();
	// ctx.fillStyle="#f00";
	// ctx.strokeStyle="#f00";
	// ctx.lineWidth=1;
	// ctx.moveTo(r,r);
	// ctx.arc(r,r,r,sAngle,eAngle);
	// ctx.fill();
	// ctx.stroke();
	
	var step=cfg.data.length;
	for(i=0;i<step;i++){
		var item=cfg.data[i];
		var color=item[2] || (itme[2]=colors.pop());

		eAngle= sAngle+aAngle*item[1];
		ctx.beginPath();
		ctx.fillStyle=color;
		ctx.strokeStyle="#f00";
		ctx.lineWidth=1;
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngle,eAngle);
		ctx.fill();
		ctx.stroke();

		sAngle=eAngle;

		//加入所有项目数据及百分比
		var text=$('<div class="text"></div>');
		text.text(cfg.data[i][0]);
		var per=$('<div class="per"></div>')
		per.text(cfg.data[i][1]*100+"%");
		text.append(per);

		var x=r+Math.sin(.5*Math.PI-sAngle)*r;
		var y=r+Math.cos(.5*Math.PI-sAngle)*r;
		// text.css("left",x/2).css("top",y/2);
		if(x>w/2){
			text.css("left",x/2);
		}else{
			text.css("right",(w-x)/2);
		}

		if(y>h/2){
			text.css("top",y/2);
		}else{
			text.css("bottom",(h-y)/2);
		}
		if(item[2]){
			text.css("color",item[2]);
		}
		text.css("opacity",0);
		component.append(text);
	}

	// 加一个蒙版层 用于制作动画效果
	var cns=document.createElement("canvas");
	var ctx=cns.getContext("2d");
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	$(cns).css("zIndex",3);
	component.append(cns);
	
	// 绘制底层
	ctx.fillStyle="#eee";
	ctx.strokeStyle="#eee";
	ctx.lineWidth=1;

	var draw=function( per ){
		ctx.clearRect(0,0,w,h);

		ctx.beginPath();
		ctx.moveTo(r,r);
		if(per <= 0){
			ctx.arc(r,r,r,0,2*Math.PI);
			// ctx.arc(r,r,r,sAngle,sAngle+2*Math.PI,true);
			component.find(".text").css("opacity",0);
		}else{
			ctx.arc(r,r,r,sAngle,sAngle+2*Math.PI*per,true);
		}
		if(per >= 1){
			component.find(".text").css("opacity",1);
		}
		ctx.fill();
		ctx.stroke();
		
	};
	draw(0);
	component.on("onLoad",function(){
		// 饼图动画效果
		var s=0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s=s+0.01;
				draw(s);
			},i*10+500);
		}
	});
	component.on("onLeave",function(){
		var s=1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s=s-0.01;
				draw(s);
			},i*10);
		}
	});
	return component;
};