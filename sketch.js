
var algo='bfs',x=20,y=20,sx=0,sy=0,ex=19,ey=19;

var done = 0;

var pixel = 20;

var cols = x;
var rows = y;

var l,b;


var grid;


var finish = false;

var obstacles = 80;


var queue = [];
var path = [];



function getInputValue(){
    x = parseInt(document.getElementById("xgrid").value);
    y = parseInt(document.getElementById("ygrid").value);
    algo = document.getElementById("algo").value;

	sx = parseInt(document.getElementById("sx").value);
    sy = parseInt(document.getElementById("sy").value);
    
    ex = parseInt(document.getElementById("ex").value);
    ey = parseInt(document.getElementById("ey").value);
    
    pixel = parseInt(document.getElementById("px").value);
	
	obstacles = parseFloat(document.getElementById("obs").value)*1000;

	// print(obstacles);


    if(ex>x-1){
    	ex=x-1;
    }
    if(ey>y-1){
    	ey=y-1;
    }
    if(sx>x-1){
    	sx=x-1;
    }
    if(sy>y-1){
    	sy=y-1;
    }

    cols = x;
    rows = y;
    
    grid = new Array(rows);

    l=(x*pixel)/rows;
	b=(y*pixel)/cols;
	
	finish = false;


	queue = [];
	path = [];

	for(var i=0;i<rows;i++){
		grid[i] = new Array(cols);
	}


	for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			grid[i][j] = new spot(i,j);
			grid[i][j].show(0);
		}
	}
	grid[sx][sy].status = 1;
	grid[sx][sy].cost = 0;


	for(var i=0;i<obstacles;i++){
		var x = round(random(0,rows-1));
		var y = round(random(0,cols-1));
		grid[x][y].status = 3;
		grid[x][y].cost = 9000000;
	}


	queue.push(grid[sx][sy]);

    done = 1;
}


function setup(){
	let cnv = createCanvas(400,400);
	cnv.parent('plotter');
	
}

function draw(){

	background(256);
	if(done == 1){
		resizeCanvas(x*pixel,y*pixel);
			if(!finish && queue.length!=0){
				if(algo=='bfs')
					var ele = queue.shift();
				else if(algo=='dfs'){
					var ele = queue[queue.length-1];
					queue.pop();
				}

				// print(ele.i,ele.j,ex,ey);
				if(ele.i==ex && ele.j==ey){
					print("FOUND");
					print(grid[ex][ey].cost);
					finish = true;

					path.push([ex,ey]);
					// print(path);
					path.push(grid[ex][ey].getMin())
					while(ex!=sx && ey!=sy){
						path.push(grid[ex][ey].getMin());
						ex = path[path.length-1][0];
						ey = path[path.length-1][1];
					}
					path.push([sx,sy]);
					// print(path);
				}
				ele.addNeigh();
			}
				for(var i=0;i<rows;i++){
					for(var j=0;j<cols;j++){
						if(grid[i][j].status==0)
							grid[i][j].show("#fff");
						if(grid[i][j].status==1)
							grid[i][j].show("#FBAA1D");
						if(grid[i][j].status==2)
							grid[i][j].show("#0B132B");
						if(grid[i][j].status==3)
							grid[i][j].show("#8C271E");
					}
				}

			if(finish){

				push();
				noFill();
			  stroke(255);
			  strokeWeight(2);
			  beginShape();
			  for (var i = 0; i < path.length; i++) {
			    vertex(path[i][0] * l + l / 2, path[i][1] * b + b / 2);
			  }
			  endShape();
			  // print(path[0][0]*l +l/2,path[0][1]*b +b/2,path[path.length-1][0]*l +l/2,path[path.length-1][1]*b +b/2);
			  // line(path[0][0]*l +l/2,path[0][1]*b +b/2,path[path.length-1][0]*l +l/2,path[path.length-1][1]*b +b/2);
			  pop();
			}
			else if(queue.length==0){
				print("path not found");
			}
	}
}









function spot(i,j){
	this.i = i;
	this.j = j;
	this.status = 0;
	this.cost = 1000000;
	this.show = function(col){
		// stroke(0);
		fill(col)
		rect(this.i*l,this.j*b,l,b,(l/2+b/2)/2);
	}
	this.addNeigh = function () {
		var count = 0;
				if( this.i-1>=0 && grid[this.i-1][this.j].status==0 && grid[this.i-1][this.j].status!=3 ){
					grid[this.i-1][this.j].status = 1;
					grid[this.i-1][this.j].cost = this.cost+1;
					queue.push(grid[this.i-1][this.j]);
					count++;
				}

				if(this.j-1>=0 && grid[this.i][this.j-1].status==0 && grid[this.i][this.j-1].status!=3 ){
					grid[this.i][this.j-1].status = 1;
					grid[this.i][this.j-1].cost = this.cost+1;
					queue.push(grid[this.i][this.j-1]);
					count++;
				}

				if(this.j-1>=0 && this.i-1>=0 && grid[this.i-1][this.j-1].status==0 && grid[this.i-1][this.j-1].status!=3 ){
					grid[this.i-1][this.j-1].status = 1;
					grid[this.i-1][this.j-1].cost = this.cost+1;
					queue.push(grid[this.i-1][this.j-1]);
					count++;
				}


				if(this.i+1<rows && grid[this.i+1][this.j].status==0 && grid[this.i+1][this.j].status!=3 ){
					grid[this.i+1][this.j].status = 1;
					grid[this.i+1][this.j].cost = this.cost+1;
					queue.push(grid[this.i+1][this.j]);
					count++;
				}

				if(this.j+1<cols && grid[this.i][this.j+1].status==0 && grid[this.i][this.j+1].status!=3 ){
					grid[this.i][this.j+1].status = 1;
					grid[this.i][this.j+1].cost = this.cost+1;
					queue.push(grid[this.i][this.j+1]);
					count++;
				}

				if(this.j+1<cols && this.i+1<rows && grid[this.i+1][this.j+1].status==0 && grid[this.i+1][this.j+1].status!=3 ){
					grid[this.i+1][this.j+1].status = 1;
					grid[this.i+1][this.j+1].cost = this.cost+1;
					queue.push(grid[this.i+1][this.j+1]);
					count++;
				}


				if(this.j+1<cols && this.i-1>=0 && grid[this.i-1][this.j+1].status==0 && grid[this.i-1][this.j+1].status!=3 ){
					grid[this.i-1][this.j+1].status = 1;
					grid[this.i-1][this.j+1].cost = this.cost+1;
					queue.push(grid[this.i-1][this.j+1]);
					count++;
				}


				if(this.j-1>=0 && this.i+1<rows && grid[this.i+1][this.j-1].status==0 && grid[this.i+1][this.j-1].status!=3 ){
					grid[this.i+1][this.j-1].status = 1;
					grid[this.i+1][this.j-1].cost = this.cost+1;
					queue.push(grid[this.i+1][this.j-1]);
					count++;
				}
		this.status = 2;
		return count;
	}
	this.getMin = function(){
		var min = grid[this.i][this.j].cost;
		var mi = this.i;
		var mj = this.j;

				if( this.i-1>=0 && grid[this.i-1][this.j].cost<=min){
					min = grid[this.i-1][this.j].cost;
					mi = this.i-1;
					mj = this.j;
				}

				if(this.j-1>=0 && grid[this.i][this.j-1].cost<=min){
					min = grid[this.i][this.j-1].cost;
					mi = this.i;
					mj = this.j-1;
				}

				if(this.j-1>=0 && this.i-1>=0 && grid[this.i-1][this.j-1].cost<=min){
					min = grid[this.i-1][this.j-1].cost;
					mi = this.i-1;
					mj = this.j-1;
				}


				if(this.i+1<rows && grid[this.i+1][this.j].cost<=min){
					min = grid[this.i+1][this.j].cost;
					mi = this.i+1;
					mj = this.j;
				}

				if(this.j+1<cols && grid[this.i][this.j+1].cost<=min){
					min = grid[this.i][this.j+1].cost;
					mi = this.i;
					mj = this.j+1;
				}

				if(this.j+1<cols && this.i+1<rows && grid[this.i+1][this.j+1].cost<=min){
					min = grid[this.i+1][this.j+1].cost;
					mi = this.i+1;
					mj = this.j+1;
				}


				if(this.j+1<cols && this.i-1>=0 && grid[this.i-1][this.j+1].cost<=min){
					min = grid[this.i-1][this.j+1].cost;
					mi = this.i-1;
					mj = this.j+1;
				}


				if(this.j-1>=0 && this.i+1<rows && grid[this.i+1][this.j-1].cost<=min){
					min = grid[this.i+1][this.j-1].cost;
					mi = this.i+1;
					mj = this.j-1;
				}
		return [mi,mj];
	}
}