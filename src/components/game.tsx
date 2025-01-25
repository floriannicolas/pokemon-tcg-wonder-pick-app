"use client";

import "@/app/styles/animations.css";
import "@/app/styles/game.css";
import { useMemo, useState } from 'react';
import { getInitialCards } from '@/utils/initial-cards';
import { delay } from '@/utils/delay';

const FORCE_PIDGEY = false;

export default function Game() {
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
        setGameState('started flipped animation-state-1');
        await delay(1800);
        setCards(cards.sort(() => 0.5 - Math.random()));
        setGameState('started flipped centered');
        await delay(800);
        setGameState('started flipped centered shuffled');
        await delay(1800);
        setGameState('started flipped');
        await delay(800);
        setGameState('started flipped selectable');
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
        <div className="text-center mx-auto max-w-7xl p-8">
            <div className="absolute top-0 left-0 w-full h-[25vh] bg-[#e0eaf5] [clip-path:polygon(0_0,100%_0,100%_80%,0%_100%)]" />
            <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-[#dde7f3] [clip-path:polygon(0_20%,100%_0,100%_100%,0%_100%)]" />
            <div className={`group relative mx-auto mb-8 transition-all duration-600 ease-in-out text-center min-h-[88px] ${gameState}`}>
                <img src="/logo.webp" alt="" className="block w-full max-w-[180px] mx-auto group-[.started]:hidden" />

                <div className="hidden opacity-0 px-8 py-2.5 leading-10 font-light bg-[#F2F8FC] text-[#878D96] rounded-[28px] shadow-[0_0_11px_0_#d7d8dc] relative mb-8 text-base transition-all duration-300 ease-in-out pl-20 data-[visible=true]:inline-block data-[visible=true]:opacity-100 group-[.animation-state-1]:inline-block group-[.animation-state-1]:opacity-100 max-422:text-[0.78rem]">
                    <div className="absolute top-0 left-5 w-[41px] h-20 bg-[url('/booster-a1a.webp')] bg-[length:41px_80px] bg-no-repeat transform -translate-y-[12%] rotate-[10deg]" />
                    Wonder picking this booster pack!
                </div>

                <div className="hidden opacity-0 py-2.5 leading-10 font-light bg-[#F2F8FC] text-[#878D96] rounded-[28px] shadow-[0_0_11px_0_#d7d8dc] relative mb-8 text-base transition-all duration-300 ease-in-out px-20 data-[visible=true]:inline-block data-[visible=true]:opacity-100 group-[.selectable]:inline-block group-[.selectable]:opacity-100">
                    Pick a card
                </div>
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
                        <div className='popup-picked'>Picked!</div>
                    </div>
                ))}
                <div className='relative top-0 left-0 z-[1]'>
                    <img
                        src="/game-mask.webp"
                        alt=""
                        className="relative block w-full m-0"
                    />
                </div>
            </div>
            <div className='mt-8 relative'>
                {gameState === '' && (
                    <button
                        onClick={launchWonderPick}
                        className="px-10 py-2.5 h-12 box-border font-light border-none bg-gradient-to-t from-[#3AC0B3] to-[#00d4ff] text-white rounded-[23px] transition-all duration-300 ease-in-out select-none text-base cursor-pointer hover:from-[#37e6d5] hover:to-[#00d4ff] focus:outline-none"
                    >
                        Start Wonder Pick
                    </button>
                )}
                {gameState === 'end' && (
                    <button
                        onClick={resetGame}
                        className="px-10 py-2.5 h-12 box-border font-light border-none bg-gradient-to-t from-[#3AC0B3] to-[#00d4ff] text-white rounded-[23px] transition-all duration-300 ease-in-out select-none text-base cursor-pointer hover:from-[#37e6d5] hover:to-[#00d4ff] focus:outline-none"
                    >
                        New Pick
                    </button>
                )}
            </div>
        </div>
    );
}
