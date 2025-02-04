"use client";

import "@/app/styles/animations.css";
import "@/app/styles/whirlwind.css";
import "@/app/styles/game.css";
import { useEffect, useState } from 'react';
import { delay } from '@/utils/delay';
import { Booster, Card, WonderPickResponse } from "@/lib/definitions";
import { generateWonderPick } from "@/utils/wonder-pick";
import Preferences, { PREFERENCES_WONDER_PICK_BOOSTER_KEY, PREFERENCES_WONDER_PICK_ONLY_GOD_PACK_KEY } from "./preferences";
import { useLocalStorage } from "usehooks-ts";

export default function Game({
    seedResponse,
}: {
    seedResponse?: WonderPickResponse,
}) {
    const [game, setGame] = useState<number>(0);
    const [preferredBooster] = useLocalStorage<Booster | 'random'>(PREFERENCES_WONDER_PICK_BOOSTER_KEY, 'random');
    const [onlyGodPack] = useLocalStorage<boolean>(PREFERENCES_WONDER_PICK_ONLY_GOD_PACK_KEY, false);
    const [forcedCard, setForcedCard] = useState<Card | undefined>();
    const [selectedBoosterType, setSelectedBoosterType] = useState<Booster | undefined>();
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCard, setSelectedCard] = useState<Card | undefined>();
    const [gameState, setGameState] = useState('');

    useEffect(() => {
        const { cardsList, prePickedCard, boosterType } = (seedResponse !== undefined)
            ? seedResponse
            : generateWonderPick(preferredBooster, onlyGodPack);
        setCards(cardsList);
        setForcedCard(prePickedCard);
        setSelectedBoosterType(boosterType);
    }, []);

    /**
     * Start wonder pick with animations.
     */
    const startWonderPick = async () => {
        setGameState('flipped');
        await delay(1800);
        setCards([...cards].sort(() => 0.5 - Math.random()));
        setGameState('started flipped centered');
        await delay(800);
        setGameState('started flipped centered shuffled');
        await delay(200);
        setGameState('started flipped centered shuffled whirlwind');
        await delay(500);
        setGameState('started flipped centered shuffled');
        await delay(1000);
        setGameState('started flipped centered');
        await delay(200);
        setGameState('started flipped');
        await delay(800);
        setGameState('started flipped selectable');
    }

    /**
     * Reset game.
     *
     * @param targetBooster target booster type
     * @param forceGodPack force only god pack?
     */
    const resetGame = (
        targetBooster: Booster | 'random' = preferredBooster,
        forceGodPack: boolean = onlyGodPack,
    ) => {
        setGame(game + 1);
        const { cardsList, prePickedCard, boosterType } = generateWonderPick(targetBooster, forceGodPack);
        setCards(cardsList);
        setForcedCard(prePickedCard);
        setSelectedBoosterType(boosterType);
        setSelectedCard(undefined);
        setGameState('');
    }

    /**
     * Select card.
     *
     * @param targetIndex target index
     * @param targetCard target card
     *
     * @returns void
     */
    const selectCard = async (targetIndex: number, targetCard: Card) => {
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
            front.style.backgroundImage = `url(${forcedCard?.image})`;
        }
        cardItem.className = 'card picked new';
        setSelectedCard(targetCard);
        await delay(1400);

        cardItem.className = 'card picked';
        setCards(cards.map((card, index) => {
            if (forcedCard && index === targetIndex) {
                return forcedCard;
            }
            if (card.image === forcedCard?.image && targetCard.image !== forcedCard.image) {
                return targetCard;
            }
            return card;
        }));

        await delay(300);
        setGameState('end');
    }

    return (
        <>
            <div className="text-center mx-auto max-w-7xl p-8">
                <div className="absolute top-0 left-0 w-full h-[25vh] bg-[#e0eaf5] [clip-path:polygon(0_0,100%_0,100%_80%,0%_100%)]" />
                <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-[#dde7f3] [clip-path:polygon(0_20%,100%_0,100%_100%,0%_100%)]" />
                <div className={`group relative mx-auto mb-8 transition-all duration-600 ease-in-out text-center min-h-[88px] ${gameState}`}>
                    {selectedBoosterType && (
                        <div className="inline-block opacity-1 px-8 py-2.5 leading-10 font-light bg-[#F2F8FC] text-[#878D96] rounded-[28px] shadow-[0_0_11px_0_#d7d8dc] relative mb-8 text-base transition-all duration-300 ease-in-out pl-20 data-[visible=true]:inline-block data-[visible=true]:opacity-100 group-[.started]:hidden group-[.end]:hidden max-422:text-[0.78rem]">
                            <div
                                className="absolute top-0 left-5 w-[41px] h-20 bg-[length:41px_80px] bg-no-repeat transform -translate-y-[12%] rotate-[10deg]"
                                style={{ backgroundImage: `url('/boosters/${selectedBoosterType}.webp')` }}
                            />
                            Wonder picking this booster pack!
                        </div>
                    )}

                    <div className="hidden opacity-0 py-2.5 leading-10 font-light bg-[#F2F8FC] text-[#878D96] rounded-[28px] shadow-[0_0_11px_0_#d7d8dc] relative mb-8 text-base transition-all duration-300 ease-in-out px-20 data-[visible=true]:inline-block data-[visible=true]:opacity-100 group-[.selectable]:inline-block group-[.selectable]:opacity-100">
                        Pick a card
                    </div>

                    <div className="hidden opacity-0 py-2.5 leading-10 font-light bg-[#F2F8FC] text-[#878D96] rounded-[28px] shadow-[0_0_11px_0_#d7d8dc] relative mb-8 text-base transition-all duration-300 ease-in-out px-20 data-[visible=true]:inline-block data-[visible=true]:opacity-100 group-[.end]:inline-block group-[.end]:opacity-100">
                        Wonder pick result:
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
                                <div className="front" style={{ backgroundImage: `url("${card.image}")` }} />
                                <div className="back" />
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
                    {gameState.includes('whirlwind') && (
                        <div className="content-whirlwind">
                            <div className="inner">
                                <div className="banner">
                                    {[...Array(24)].map((e, i) => <span className="panel" key={i} />)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className='mt-8 relative flex gap-4 items-center justify-center'>
                    {gameState === '' && (
                        <>
                            <button
                                onClick={startWonderPick}
                                className="px-10 py-2.5 h-12 box-border font-medium border-none bg-gradient-to-t from-[#37e6d5] to-[#1decb5] text-white rounded-full transition-all duration-300 ease-in-out shadow-md select-none text-base cursor-pointer hover:from-[#51F7CB] hover:to-[#1decb5] active:shadow-xl"
                            >
                                Start
                            </button>
                            <button
                                onClick={() => { resetGame(); }}
                                className="relative px-10 py-2.5 h-12 box-border font-medium border-none bg-gradient-to-t from-[#fff] to-[#fff] rounded-full transition-all duration-300 ease-in-out select-none shadow-md text-[#3A4452] cursor-pointer hover:from-[#f4f4f4] hover:to-[#f4f4f4] active:shadow-xl"
                            >
                                <span className="absolute top-[3px] bottom-[3px] left-[3px] right-[3px] border-2 rounded-full border-[#55DBE8]" />
                                Reload
                            </button>
                        </>
                    )}
                    {gameState === 'end' && (
                        <button
                            onClick={() => { resetGame(); }}
                            className="relative px-10 py-2.5 h-12 box-border font-medium border-none bg-gradient-to-t from-[#fff] to-[#fff] rounded-full transition-all duration-300 ease-in-out select-none shadow-md text-[#3A4452] cursor-pointer hover:from-[#f4f4f4] hover:to-[#f4f4f4] active:shadow-xl"
                        >
                            <span className="absolute top-[3px] bottom-[3px] left-[3px] right-[3px] border-2 rounded-full border-[#55DBE8]" />
                            New Pick
                        </button>
                    )}
                </div>
            </div>
            <Preferences onSave={resetGame} />
        </>
    );
}
