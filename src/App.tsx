import { useMemo, useState } from 'react'
import './styles/animations.css'
import './styles/App.css'
import { getInitialCards } from './utils/initial-cards';


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

  const launchWonderPick = () => {
    setGameState('flipped');
    setTimeout(() => {
      setCards(cards.sort(() => 0.5 - Math.random()));
      setGameState('flipped centered');
      setTimeout(() => {
        setGameState('flipped centered shuffled');
        setTimeout(() => {
          setGameState('flipped');
          setTimeout(() => {
            setGameState('flipped selectable');
          }, 800);
        }, 1600);
      }, 1400);
    }, 2000);
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

  const selectCard = (index: number, url: string) => {
    if (selectedCard || !gameState.includes('selectable')) {
      return;
    }

    const cardItem = document.getElementById(`card-${game}-${index}`);
    if (cardItem) {
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
      cardItem.className += ' picked new';
      setSelectedCard(url);
      setTimeout(() => {
        cardItem.className = 'card picked'
        setCards(cards.map((cardUrl, i) => {
          if (i === index) {
            return forcedCard;
          }
          if (cardUrl === forcedCard && url !== forcedCard) {
            return url;
          }
          return cardUrl;
        }));
        setTimeout(() => {
          setGameState('end');
        }, 300);
      }, 1400);
    }
  }

  return (
    <>
      <div className={`content-cards ${gameState}`}>
        {cards.map((url, index) => (
          <div
            id={`card-${game}-${index}`}
            className='card'
            key={`card-${game}-${index}`}
            onClick={() => {
              selectCard(index, url);
            }}
          >
            <div className="card-inner">
              <div className="front" style={{ backgroundImage: 'url(' + url + ')' }} />
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
          <button onClick={launchWonderPick}>Launch Wonder Pick</button>
        )}
        {gameState === 'end' && (
          <button onClick={resetGame}>Reset</button>
        )}
      </div>
    </>
  )
}

export default App
