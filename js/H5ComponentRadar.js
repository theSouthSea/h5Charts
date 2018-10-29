/*折线图组件对象*/

var H5ComponentRadar=function(name,cfg){
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
	component.append(cns);
	
	var r=w/2;
	var step=cfg.data.length;
	// ctx.beginPath();
	// // ctx.strokeStyle="#0f0";
	// // ctx.fillStyle="#00f";
	// ctx.arc(r,r,10,0,2*Math.PI);
	// ctx.stroke();
	// // ctx.fill();

	// ctx.beginPath();
	// ctx.arc(r,r,r,0,2*Math.PI);
	// ctx.stroke();

	// 计算一个圆周上的坐标
	// 已知：圆心坐标（a,b）,半径 r，角度	deg
	// rad=(2*Math.PI/360)*(360/step)*i
	// x=a+Math.sin(rad)*r
	// y=b+Math.cos(rad)*r
	
	// 绘制网格背景 (分面绘制分为10份)
	var isBlue=true;
	for(var s=10;s>0;s--){
		ctx.beginPath();
		for(var i=0;i<step;i++){
			rad=(2*Math.PI/360)*(360/step)*i;
			x=r+Math.sin(rad)*r*(s/10);
			y=r+Math.cos(rad)*r*(s/10);

			
			// ctx.moveTo(r,r);
			ctx.lineTo(x,y);
			// ctx.arc(x,y,5,0,2*Math.PI);
			// ctx.stroke();
		}
		ctx.closePath();
		ctx.fillStyle= (isBlue = !isBlue) ? "#f1f99f":"blue";
		ctx.fill();
	}
	
	ctx.stroke();

	//绘制伞骨
	for(var i=0;i<step;i++){
		var rad=(2*Math.PI/360)*(360/step)*i;
		var x=r+Math.sin(rad)*r;
		var y=r+Math.cos(rad)*r;

		ctx.moveTo(r,r);
		ctx.lineTo(x,y);

		//输出项目文字
		var text=$('<div class="text"></div>');
		text.text(cfg.data[i][0]);
		if(x>w/2){
			text.css("left",x/2+5);
		}else{
			text.css("right",(w-x)/2+5);
		}
		if(y>h/2){
			text.css("top",y/2+5);
		}else{
			text.css("bottom",(h-y)/2+5);
		}
		if(cfg.data[i][2]){
			text.css("color",cfg.data[i][2]);
		}
		text.css("opacity",0);
		text.css("transition",'all .5s '+.1*i+'s');
		// text.css({"left":x/2,"top":y/2});
		component.append(text);
	}
	ctx.strokeStyle="#eee";
	ctx.stroke();

	// 数据层的开发
	// 加入一个画布 数据层
	var cns=document.createElement("canvas");
	var ctx=cns.getContext("2d");
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	component.append(cns);

	// ctx.beginPath();
	// for(var i=0;i<step;i++){
	// 	rad=(2*Math.PI/360)*(360/step)*i;
	// 	x=r+Math.sin(rad)*r*0.5;
	// 	y=r+Math.cos(rad)*r*0.5;

		
	// 	// ctx.moveTo(r,r);
	// 	ctx.lineTo(x,y);
	// 	// ctx.arc(x,y,5,0,2*Math.PI);
	// 	// ctx.stroke();
	// }
	// ctx.fillStyle="#f00";
	// ctx.closePath();
	// ctx.fill();
	// ctx.stroke();

	var draw=function( per ){
		if(per >= 1){
			// $(".text").css("opacity",1);
			component.find(".text").css("opacity",1)
		}
		if(per < 1){
			// $(".text").css("opacity",1);
			component.find(".text").css("opacity",0)
		}
		// 清除画布
		ctx.clearRect(0,0,w,h);

		// 输出数据的折线
		for(var i=0;i<step;i++){
			var rad=(2*Math.PI/360)*(360/step)*i;
			var rate=cfg.data[i][1]*per;
			var x=r+Math.sin(rad)*r*rate;
			var y=r+Math.cos(rad)*r*rate;

			ctx.lineTo(x,y);
			// ctx.arc(x,y,5,0,2*Math.PI);

		}
		ctx.strokeStyle="red";
		ctx.closePath();
		ctx.stroke();

		//输出数据的点
		ctx.fillStyle="red";
		for(var i=0;i<step;i++){
			var rad=(2*Math.PI/360)*(360/step)*i;
			var rate=cfg.data[i][1]*per;
			var x=r+Math.sin(rad)*r*rate;
			var y=r+Math.cos(rad)*r*rate;

			// ctx.lineTo(x,y);
			ctx.beginPath();
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();

		}
		
	}
	// draw(0.4);
	component.on("onLoad",function(){
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