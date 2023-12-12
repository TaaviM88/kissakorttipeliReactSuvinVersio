import React, { useEffect, useRef } from "react";
//Lisää vasta kun data ja ballmovement on luotu
import { BallMovement } from "./BallMovement";
import data from "./data";
import WallCollision from "./WallCollision";
import Paddle from "./Paddle";
import Brick from "./Brick";
import BrickCollision from "./BrickCollision";
import PaddleHit from "./PaddleHit";
//kun aletaan tekemään tiiliä
let bricks = [];
//Muista poistaa tämä myös
let x = 0;

//pitää siirtää tänne että voidaan lukea canvaksessa hiireen liikkeeseen ja samalla lisää paddleProps.
//kun teet tiilihommia niin sitten listää brickObj
let {ballObj,paddleProps, brickObj} = data;
export default function Breakout(){
    const canvasRef = useRef(null);
    
    useEffect(()=>{
        const render = () =>{
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            //for paddle hit detection
            paddleProps.y = canvas.height - 30;

            //Assign Bricks: luo brick.jsx
            let newBrickSet =  Brick(2,bricks,canvas,brickObj);
            if(newBrickSet && newBrickSet.length >0){
                bricks = newBrickSet;
            }
            //datan hakeminen, siirrä kun paddlepropsia ja hiiren liikuttista tehdään niin ylös.
            //let {ballObj,paddleProps} = data;
            //eka testi vihreä suorakulmion luominen
            //ctx.fillStyle = "green";
            //ctx.fillRect(10,10,150,100);
            //tämän jälkeen 
            ctx.clearRect(0,0, canvas.width, canvas.height);
            
            //brick juttua
            bricks.map((brick)=>{
                return brick.draw(ctx);
            })
            //Tämä ekan testin jälkeen. Poist eka suorakulmio testi ja sitten tee nämä
            //Sen jälkeen kun BallMovement.jsx ja data on luotu niin poista tämä
            // ctx.beginPath();
            // ctx.fillStyle = "red";
            // ctx.arc(x,75,50,0,2*Math.PI);
            // ctx.strokeStyle = "black";
            // ctx.strokeWidth = 4;
            // ctx.fill();
            // ctx.stroke();
            // ctx.stroke();
            // x++;
            // console.log("Creating a circle");

            //sen jälkeen kun ballmovement ja data on tehty
            BallMovement(ctx, ballObj)

            WallCollision(ballObj, canvas);
            //Move these to wallcollision component. when done
            // if(ballObj.y - ballObj.rad < 0 || ballObj.y + ballObj.rad > canvas.height){
            //     ballObj.dy *= -1;
            // }
        
            // if(ballObj.x + ballObj.rad > canvas.width || ballObj.x - ballObj.rad < 0){
            //     ballObj.dx *= -1;
            // }

            let brickCollision;
            for (let i = 0; i < bricks.length; i++) {
                brickCollision = BrickCollision(ballObj, bricks[i]);
        
                if (brickCollision.hit && !bricks[i].broke) {
                  // console.log(brickCollision);
                  if (brickCollision.axis === "X") {
                    ballObj.dx *= -1;
                    bricks[i].broke = true;
                  } else if (brickCollision.axis === "Y") {
                    ballObj.dy *= -1;
                    bricks[i].broke = true;
                  }
                  //player.score += 10;
                }
              }
            
            //kun pallon osuminen seiniin tehty. Ala tekemään mailaa(paddle komponenttia)

            Paddle(ctx, canvas, paddleProps);

            PaddleHit(ballObj, paddleProps);

            requestAnimationFrame(render)
        }
        render();
    },[]);

    return(
        //<canvas id="canvas" ref={canvasRef} onMouseMove={(event)=> paddleProps.x = event.clientX - paddleProps.width / 2 - 15} height="500px" width="800px" />
        <canvas id="canvas" ref={canvasRef} onMouseMove={(event)=> paddleProps.x = event.clientX - paddleProps.width / 2 - 10} height="500px" width={window.innerWidth -20} />
    );
    
};