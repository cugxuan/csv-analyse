function draw(name,xRange,yRange,xText,yText,data,scaleN){
	//输出名字
	document.writeln(name);
	//width,height
	var width = 500,
	height = 250,
	margin = {left:50,top:30,right:20,bottom:20},
	g_width = width - margin.left -margin.right,
	g_height = height -margin.top - margin.bottom;

	//svg
	var container = d3.select('body')
					  .append('div');
	var svg = container.append('svg')
			 		   .attr('width',width)
					   .attr('height',height);
	var g = svg.append('g').attr('transform','translate('+margin.left+','+margin.top+')');


	var scale_x = d3.scaleLinear().domain([0,xRange]).range([0,g_width])
	var scale_y = d3.scaleLinear().domain([0,yRange]).range([g_height,0])

	//画线
	var line_generator = d3.line()
	.x(function(d,i){return scale_x(i)/scaleN;})//0,1,2,3...
	.y(function(d){return scale_y(d);})//1,3,5
	// .curve(d3.curveCardinal.tension(1))   //也是不拟合方式
	// .curve(d3.curveCardinal)   //曲线拟合方式
	g.append('path').attr('d',line_generator(data))

	var x_axis =d3.axisBottom(scale_x),
	y_axis =d3.axisLeft(scale_y);

	//.text中内容是显示在坐标轴的内容,transform内容表示旋转，dxdy表示离坐标轴的距离
	g.append('g').call(x_axis).attr('transform','translate(0,'+g_height+')').append('text').text(xText).attr('dx','40em').attr('dy','-1em')
	g.append('g').call(y_axis).append('text').text(yText).attr('text-anchor','start').attr('dx','1em').attr('dy','1em')

	// 打印坐标位置信息
      var wenzi = svg.append('text')
            .attr('font-family', 'sans-serif')  
            .attr('font-size', '11px')  
            .attr('fill', 'red')
            .attr('class','move2')
	// 使用circles对象进行画圆
      var yuan = svg.append('circle')
         .attr('r', 1)
         .attr('class','move1');
	//鼠标悬停
	svg.on('mousemove',function(event){
          var event = event || window.event;
          yuan.attr('style','display:block');
          wenzi.attr('style','display:block');  
          yuan.attr('cx',event.offsetX);
          yuan.attr('cy',event.offsetY);
          if(event.offsetX <=450){
            wenzi.text(function(d) {  
              return ((event.offsetX-50)/g_width*xRange).toFixed(2) + "," + ((height-event.offsetY-20)/g_height*yRange).toFixed(2);
            })
            wenzi.attr('x', event.offsetX+7)
            wenzi.attr('y', event.offsetY+7)
          }else{
            wenzi.text(function(d) {  
              return ((event.offsetX-50)/g_width*xRange).toFixed(2) + "," + ((height-event.offsetY-20)/g_height*yRange).toFixed(2);
            })
            wenzi.attr('x', event.offsetX-50)
            wenzi.attr('y', event.offsetY+7) 
          }
      })
}

var data = [1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,50,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1, 1]
var xRange=60,
	yRange=100,
	name='<p>进程AEMgr</p>',
    xText='时间(60分)',
	yText='CPU使用率(%)',
	scaleN=1;    //每个x单位有几个值
draw(name,xRange,yRange,xText,yText,data,scaleN);

var data = [1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,50,1,50,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1, 1]
var xRange=60,
	yRange=100,
	name='<p>进程AEMgr</p>',
    xText='时间(60分)',
	yText='CPU使用率(%)',
	scaleN=1;    //每个x单位有几个值
draw(name,xRange,yRange,xText,yText,data,scaleN);
