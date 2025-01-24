import { useMemo, useState } from 'react'
import './styles/animations.css'
import './styles/App.css'
import { getInitialCards, FORCED_CARD } from './utils/initial-cards';

function App() {
  const [game, setGame] = useState<number>(0);
  const initialCards = getInitialCards();
  const randomCardsList = useMemo(
    () => initialCards.sort(() => 0.5 - Math.random()),
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
    const initialCards = getInitialCards();
    setCards(initialCards);
    setSelectedCard(null);
    setGameState('');
  }

  const selectCard = (index: number, url: string) => {
    if (selectedCard || !gameState.includes('selectable')) {
      return;
    }

    const cardItem = document.getElementById(`card-${game}-${index}`);
    if (cardItem) {
      const frontList = cardItem.getElementsByClassName('front');
      if (frontList && frontList.length > 0) {
        const front = frontList[0] as HTMLDivElement;
        front.style.backgroundImage = `url(${FORCED_CARD})`;
      }
      cardItem.className += ' picked';
      setSelectedCard(url);
      setTimeout(() => {
        setCards(cards.map((cardUrl, i) => {
          if (i === index) {
            return FORCED_CARD;
          }
          if (cardUrl === FORCED_CARD && url !== FORCED_CARD) {
            return url;
          }
          return cardUrl;
        }));
        setTimeout(() => {
          setGameState('end');
        }, 300);
      }, 1000);
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
