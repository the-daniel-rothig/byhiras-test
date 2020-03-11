import React from 'react';
import useGameState, { INITIAL_HP } from './useGameState';
import useAnimationState from './useAnimationState';
import './Game.css';
import cn from 'classnames';

const Character = ({className, hp, children}) => {
  const lifeScale = Math.max(hp / INITIAL_HP, 0); 

  return (
    <div className={cn("character", className)}>
      <div className="lifebar">
        <div className={"lifebar__outer"}>
          <div className={"lifebar__inner"} style={{transform: `scaleX(${lifeScale})`}} />
        </div>
        <div class="lifebar__text">{Math.max(0, hp)} HP</div> 
      </div>
      <div className={cn("character__sprite", {"character__sprite--dead": hp <= 0})}>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

const Hero = () => (
  <pre role="img" aria-label="our hero">{`
|_O       
  |\`-)--- 
  |\\      
/  |
  `}</pre>
);

const Monster = () => (
  <pre role="img" aria-label="a monster">{`
oo\`'._..---.___..-
(_,-.        ,..'\`
    \`'.    ;
        : :\`
      _;_; 
`}</pre>
);

const Swords = () => <span role="img" aria-label="swords clash!" className={"swords"}>⚔️</span>

const dieFaces = [
  "⚀",
  "⚁",
  "⚂",
  "⚃",
  "⚄",
  "⚅"
];

const Dice = ({className, values}) => (
  <div className={cn("dice", className)}>
    {values.map(v => (
      <span role="img" aria-label={`die of value ${v}`} className={"die"}>
        {dieFaces[v - 1]}
      </span>
    ))}
  </div>
)

const DamageMessage = ({gameState}) => {
  let message = "You parried each other's blows.";

  if (gameState.oldHeroHp !== gameState.heroHp) {
    const damage = gameState.oldHeroHp - gameState.heroHp;

    message = (
      <>
        {damage > 5 ? "OUCH! " : ""}
        You've taken{" "}
        <Dice className="dice--inline right" values={gameState.monsterDice} />
        {" "}-{" "}
        <Dice className="dice--inline left" values={gameState.heroDice} />
        {" "}= {damage} damage.
      </>
    );
  }

  if (gameState.oldMonsterHp !== gameState.monsterHp) {
    const damage = gameState.oldMonsterHp - gameState.monsterHp
    message = (
      <>
        {damage > 5 ? "WOW! " : ""}
        You've dealt{" "}
        <Dice className="dice--inline left" values={gameState.heroDice} />
        {" "}-{" "}
        <Dice className="dice--inline right" values={gameState.monsterDice} />
        {" "}= {damage} damage.
      </>
    );
  }

  return (
    <span className={"gameMessage"}>
      {message}
    </span>
  );
}

const GameOver = ({win}) => (
  <span className={cn("gameMessage", {"gameMessage__good": win, "gameMessage__bad": !win})}>
    {win ? "You Win" : "Game Over"}
  </span>
)

const Game = () => {
  const game = useGameState();
  const animation = useAnimationState();

  const showOldHp = animation.state.active && !animation.state.showDamage;

  const heroHp = showOldHp ? game.state.oldHeroHp : game.state.heroHp;
  const monsterHp = showOldHp ? game.state.oldMonsterHp : game.state.monsterHp;

  const gameOver = heroHp <= 0 || monsterHp <= 0;

  function onClick() {
    game.attack();
    animation.start();
  }

  return (
    <>
      <Character hp={heroHp} className={"left"}>
        <Hero />
      </Character>
      <Character hp={monsterHp} className={"right"}>
        <Monster />
      </Character>
      {animation.state.showSwords && <Swords />}
      {animation.state.showDice && <Dice className={"left"} values={game.state.heroDice} />}
      {animation.state.showDice && <Dice className={"right"} values={game.state.monsterDice} />}
      {animation.state.showDamage && <DamageMessage gameState={game.state}/>}

      {!animation.state.active && !gameOver && <button className={"attackButton"} onClick={onClick}>Attack!</button>}
      {!animation.state.active && gameOver && <GameOver win={heroHp > 0} />}
    </>
  )
}

export default Game;