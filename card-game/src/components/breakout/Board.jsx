import React, { useEffect, useRef } from "react";
//Lisää vasta kun data ja ballmovement on luotu
import { BallMovement } from "./BallMovement";
import data from "./data";
//Muista poistaa tämä myös
let x = 0;
export default function Breakout(){
    const canvasRef = useRef(null);
    
    useEffect(()=>{
        const render = () =>{
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            //datan hakeminen
            let {ballObj} = data;
            //eka testi vihreä suorakulmion luominen
            //ctx.fillStyle = "green";
            //ctx.fillRect(10,10,150,100);
            //tämän jälkeen 
            ctx.clearRect(0,0, canvas.width, canvas.height);
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
            if(ballObj.y - ballObj.rad < 0 || ballObj.y + ballObj.rad > canvas.height){
                ballObj.dy *= -1;
            }

            if(ballObj.x + ballObj.rad > canvas.width || ballObj.x - ballObj.rad < 0){
                ballObj.dx *= -1;
            }

            requestAnimationFrame(render)
        }
        render();
    },[]);

    return(
        <canvas id="canvas" ref={canvasRef} height="500px" width="800px" />
    );
    
};