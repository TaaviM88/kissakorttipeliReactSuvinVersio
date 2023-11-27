import '../../App.css';
import Card from './Card'
import PlayButton from './PlayButton';
import { useState } from 'react';


const getRandomInt =(min, max)=>
  Math.floor(Math.random() * (max -min +1)+min);

  const createCard = index => ({
    id: crypto.randomUUID(),
    image: 'http://placekitten.com/120/100?image='+index,
    stats: [
      { name: 'Cuteness', value:getRandomInt(1,60) },
      { name: 'Speed', value: getRandomInt(1,80)},
      { name: 'Weight', value: getRandomInt(1,50) },
    ],
  });

const deck = Array(16).fill(null).map((_,index) =>createCard(index));
const half = Math.ceil(deck.length / 2);

const dealCards = ()=>{
    shuffle(deck);
    return{
      player: deck.slice(0,half),
      opponent: deck.slice(half)
    }
  }

  function shuffle(array){
    for(let i = array.length -1; i > 0; i--){
      const j = Math.floor(Math.random() * (i +1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  export default function CardGame(){
    const[cards, setCards] = useState(dealCards);
    const[result, setResult] = useState('');
    const[gameState, setGameState] = useState('play');
    const[selectedStat, setSelected] = useState(0);
  
    if(gameState !== 'game_over' && (!cards.opponent.length || !cards.player.length)){
      setResult(() =>{
        console.log(!cards.player.length, !cards.opponent.length);
        if(!cards.opponent.length) return 'Player win!';
        else if (!cards.player.length) return 'Player loss';
        return 'Draw';
      });
      setGameState('game_over');
    }
  
    function compareCards(){
     
      const playerStat = cards.player[0].stats[selectedStat];
      const opponentStat = cards.opponent[0].stats[selectedStat];
      if(playerStat.value === opponentStat.value) setResult("draw");
      else if(playerStat.value > opponentStat.value) setResult("win");
      else setResult('loss');
      setGameState('result');
    }
  
    function nextRound(){
      setCards(cards =>{
        const playedCards = [{...cards.player[0]},{...cards.opponent[0]}];
        const player = cards.player.slice(1);
        const opponent = cards.opponent.slice(1);
         if(result === 'draw')
         {
          return{
            player,
            opponent,
          };
         }
         if(result === 'win'){
          return{
            player:[...player,  ... playedCards],
            opponent,
          };
         }
        if(result === 'loss'){
          return{
            player,
            opponent:[...opponent, ...playedCards],
          };
        }
        return cards;
  
      })
      setGameState('play');
      setResult('');
    }
    
    function restartGame(){
      setCards(dealCards);
      setResult('');
      setGameState('play');
    }
  
    return(
      <>
      <h1>Pelin nimi</h1>
      <div id="game">
        <div className="hand pelaaja">
          <p>Player Cards</p>
          <ul  className='card-list'>
            {cards.player.map((pCard, index) =>(
              <li style={{zIndex: -index}} className='card-list-item player' key={pCard.id}>
                <Card card = { index === 0 ? pCard : null}
                handleSelect={statIndex => gameState === 'play' && setSelected(statIndex)}
                selectedStat={selectedStat}/>
              </li>
            ))}
          </ul>
        </div>
  
        <div id="center-area">
          <p>{result || 'Press the button'}</p>
          {
            gameState === 'play'?(<PlayButton text={'Play'} handleClick={compareCards}/>) : 
            gameState === 'game_over'  ?
            (<PlayButton text={'Restart'} handleClick={restartGame}/>)
             :
            (<PlayButton text={'Next'} handleClick={nextRound}/>)
          }
          
        </div>
  
        <div className="hand">
          <p>Opponent Cards</p>
          <ul className='card-list opponent'>
            {cards.opponent.map((oCard, index) =>(
              <li style={{zIndex: -index}} className='card-list-item opponent' key={oCard.id}>
                <Card card = { result &&index === 0 ? oCard : null}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
  
      </>
    );
  }