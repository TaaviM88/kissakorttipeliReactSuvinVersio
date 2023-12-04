export default function Brick(level, bricks, canvas, brick){
    brick.width = canvas.width /5;
    let newBricks = [];
    if(!bricks){
        return [];
    }
    if(bricks.length >= 5 * level){
        return;
    }

    for(let i = 0; i < 5 * level; i++){
        let newBrick = new SingleBrick(
            brick.x + brick.width,
            brick.y,
            brick.width,
            brick.height,
            brick.colors
        );
        newBricks.push(newBrick);
        brick.x += brick.width +1;
        if(brick.x + brick.width >= canvas.width){
            brick.x = 0.5;
            brick.y += brick.height +1;
        }
    }
    //console.log(newBricks);
    return newBricks;
}

class SingleBrick{
    constructor(x,y,w,h,c){
        this.x = x -w;
        this.y = y;
        this.width = w;
        this.height = h;
        this.colors = c;
        this.broke = false;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fillStyle = this.broke ? "#134959" : this.colors[1];
        ctx.strokeStyle = this.broke ? "#134959" : "#134959";
        ctx.lineWidth = 5;
        ctx.fillStyle = this.broke ? "#134959" : this.colors[1];
        ctx.shadowBlur = 0;
        ctx.shadowColor = "blue";
        ctx.strokeRect(this.x,this.y,this.width,this.height);
        ctx.fill();
    }
}