import { useMemo, useState } from 'react';
import './App.css';

const initialCardsList = [
  '/cards/blue.webp',
  '/cards/gyarados-ex.webp',
  '/cards/mew-ex-gold.webp',
  '/cards/mew-ex.webp',
  '/cards/pidgey.webp',
];

const forcedCard = '/cards/pidgey.webp';

function App() {
  const [game, setGame] = useState<number>(0);
  const randomCardsList = useMemo(
    () => initialCardsList.sort(() => 0.5 - Math.random()),
    []
  );
  const [cards, setCards] = useState(randomCardsList);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [gameState, setGameState] = useState('');

  const launchWonderPick = () => {
    setGameState('flipped');
    setTimeout(() => {
      // setCards(cards.sort(() => 0.5 - Math.random()));
      setGameState('flipped centered');
      setTimeout(() => {
        setGameState('flipped centered spread');
        // setTimeout(() => {
        //   setGameState('flipped centered spread shuffle');
        // }, 1000)
        // setTimeout(() => {
        //   setGameState('flipped selectable');
        // }, 1600);
      }, 350);
    }, 1000);
  }

  const resetGame = () => {
    setGame(game + 1);
    setCards(cards.sort((a, b) => 0.5 - Math.random()));
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
        front.style.backgroundImage = `url(${forcedCard})`;
      }
      cardItem.className += ' picked';
      setSelectedCard(url);
      setTimeout(() => {
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
              console.log('card.onClick');
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
