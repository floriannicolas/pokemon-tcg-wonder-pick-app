import { useMemo, useState } from 'react'
import './styles/animations.css'
import './styles/App.css'
import { getInitialCards } from './utils/initial-cards';
import { delay } from './utils/delay';


const FORCE_PIDGEY = false;

function App() {
  const [game, setGame] = useState<number>(0);
  const { cardsList, prePickedCard } = getInitialCards(FORCE_PIDGEY);
  console.log('prePickedCard', prePickedCard);
  const [forcedCard, setForcedCard] = useState<string>(prePickedCard);
  const randomCardsList = useMemo(
    () => cardsList.sort(() => 0.5 - Math.random()),
    []
  );
  const [cards, setCards] = useState(randomCardsList);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [gameState, setGameState] = useState('');

  const launchWonderPick = async () => {
    setGameState('flipped');
    await delay(1800);
    setCards(cards.sort(() => 0.5 - Math.random()));
    setGameState('flipped centered');
    await delay(800);
    setGameState('flipped centered shuffled');
    await delay(1600);
    setGameState('flipped');
    await delay(800);
    setGameState('flipped selectable');
  }

  const resetGame = () => {
    setGame(game + 1);
    const { cardsList, prePickedCard } = getInitialCards(FORCE_PIDGEY);
    setCards(cardsList);
    setForcedCard(prePickedCard);
    console.log('prePickedCard', prePickedCard);
    setSelectedCard(null);
    setGameState('');
  }

  const selectCard = async (targetIndex: number, targetCard: string) => {
    if (selectedCard || !gameState.includes('selectable')) {
      return;
    }

    const cardItem = document.getElementById(`card-${game}-${targetIndex}`);
    if (!cardItem) {
      return;
    }
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';

    for (let i = 0; i < 6; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animation = `star-twinkle 0.6s ease-out ${i * 0.1}s forwards`;
      starsContainer.appendChild(star);
    }

    cardItem.appendChild(starsContainer);

    const frontList = cardItem.getElementsByClassName('front');
    if (frontList && frontList.length > 0) {
      const front = frontList[0] as HTMLDivElement;
      front.style.backgroundImage = `url(${forcedCard})`;
    }
    cardItem.className = 'card picked new';
    setSelectedCard(targetCard);
    await delay(1400);

    cardItem.className = 'card picked'
    setCards(cards.map((card, index) => {
      if (index === targetIndex) {
        return forcedCard;
      }
      if (card === forcedCard && targetCard !== forcedCard) {
        return targetCard;
      }
      return card;
    }));

    await delay(300);
    setGameState('end');
  }

  return (
    <>
      <div className='content-logo'>
        <img src="/logo.webp" alt="" />
      </div>
      <div className={`content-cards ${gameState}`}>
        {cards.map((card, index) => (
          <div
            id={`card-${game}-${index}`}
            className='card'
            key={`card-${game}-${index}`}
            onClick={() => {
              selectCard(index, card);
            }}
          >
            <div className="card-inner">
              <div className="front" style={{ backgroundImage: `url(${card})` }} />
              <div className="back" style={{ backgroundImage: 'url(/cards/back.webp)' }} />
            </div>
          </div>
        ))}
        <div className='mask'>
          <img src="/game-mask.webp" alt="" />
        </div>
      </div>
      <div className='content-actions'>
        {gameState === '' && (
          <button onClick={launchWonderPick}>Start Wonder Pick</button>
        )}
        {gameState === 'end' && (
          <button onClick={resetGame}>New Pick</button>
        )}
      </div>
    </>
  )
}

export default App
