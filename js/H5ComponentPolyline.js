/*折线图组件对象*/

var H5ComponentPolyline=function(name,cfg){
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
	// 水平网格线 10份
	var step=10;
	ctx.beginPath();
	ctx.lineWidth=1;
	ctx.strokeStyle="#aaa";

	window.ctx=ctx;
	for(var i=0;i<step+1;i++){
		var y=h/step*i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}
	//纵线
	step=cfg.data.length+1;
	var text_w=w/step>>0;

	for(var j=0;j<step+1;j++){
		var x=w/step*j;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);
		if(cfg.data[j]){
			var text=$('<div class="text"></div>');
			text.text( cfg.data[j][0] );
			text.css({"width":text_w/2+"px","left":x/2+text_w/4+"px"});
			component.append(text);
		}
	}
	ctx.stroke();
	
	// 加入画布 数据层
	var cns=document.createElement("canvas");
	var ctx=cns.getContext("2d");
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;

	component.append(cns);


	var draw=function( per ){
		// 清空画布
		ctx.clearRect(0,0,w,h);
		// 绘制折线数据
		ctx.beginPath();
		ctx.lineWidth=3;
		ctx.strokeStyle="#f00";

		var x=0;
		var y=0;
		// ctx.moveTo(10,10);
		// ctx.arc(10,10,5,0,2*Math.PI);
		// 画点
		var row_w=w/(cfg.data.length+1);
		for(var i=0,len=cfg.data.length;i<len;i++){
			// console.log(cfg.data[i])
			var item=cfg.data[i];
			x=row_w*(i+1);
			y=h-item[1]*h*per;
			ctx.moveTo(x,y);
			ctx.arc(x,y,5,0,2*Math.PI);
		}

		// 连线
		// 移动画笔到第一个数据点的位置
		ctx.moveTo(row_w,h-cfg.data[0][1]*h*per);
		for(var i=0,len=cfg.data.length;i<len;i++){
			// console.log(cfg.data[i])
			var item=cfg.data[i];
			x=row_w*(i+1);
			y=h-item[1]*h*per;
			ctx.lineTo(x,y);
		}

		ctx.stroke();
		ctx.lineWidth=1;
		ctx.strokeStyle="rgba(234, 51, 51, 0.24)";
		// 绘制阴影
		ctx.lineTo(x,h);
		ctx.lineTo(row_w,h);
		ctx.fillStyle="rgba(234, 51, 51, 0.24)";
		ctx.fill();
		//写入文字
		for(var i=0,len=cfg.data.length;i<len;i++){
			// console.log(cfg.data[i])
			var item=cfg.data[i];
			x=row_w*(i+1);
			y=h-item[1]*h*per;

			ctx.fillStyle = item[2] ? item[2] : "#000";
			ctx.fillText(((item[1]*100)>>0)+"%",x-10,y-10);
		}
		ctx.stroke();
	}
	// draw(0.9);
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