import { useState } from 'react'
import './App.css'

const initialCardsList = [
  '/cards/blue.webp',
  '/cards/gyarados-ex.webp',
  '/cards/mew-ex-gold.webp',
  '/cards/mew-ex.webp',
  '/cards/pidgey.webp',
];

const forcedCard = '/cards/pidgey.webp';
const getRandomCardsList = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function App() {
  const [cards, setCards] = useState(getRandomCardsList(initialCardsList));
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [game, setGame] = useState<number>(0);
  const [gameState, setGameState] = useState('');

  const launchWonderPick = () => {
    setGameState('flipped');

    setTimeout(() => {
      setGameState('flipped centered');

      setTimeout(() => {
        setGameState('flipped centered shuffled');

        setTimeout(() => {
          setGameState('flipped selectable');
        }, 1200);
      }, 1000);
    }, 1000);
  }

  const resetGame = () => {
    setCards(getRandomCardsList(initialCardsList));
    setSelectedCard(null);
    setGameState('');
    setGame(game + 1);
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
