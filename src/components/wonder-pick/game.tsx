/* eslint-disable @next/next/no-img-element */
"use client";

import "@/app/styles/animations.css";
import "@/app/styles/whirlwind.css";
import "@/app/styles/game.css";
import { createRoot } from 'react-dom/client';
import { useCallback, useEffect, useState } from 'react';
import { delay } from '@/utils/delay';
import { Booster, Card, WonderPickResponse } from "@/lib/definitions";
import { generateWonderPick } from "@/utils/wonder-pick";
import Preferences, { PREFERENCES_WONDER_PICK_BOOSTER_KEY, PREFERENCES_WONDER_PICK_ONLY_GOD_PACK_KEY } from "./preferences";
import { useLocalStorage } from "usehooks-ts";
import GameTitle from "./game-title";
import GameActions from "./game-actions";
import { CardStars } from "./card-stars";
import ContentCards from "./content-cards";
import { loadImage } from "@/utils/load-image";

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
    const startWonderPick = useCallback(async () => {
        setGameState('flipped');
        await delay(1800);
        setCards([...cards].sort(() => 0.5 - Math.random()));
        setGameState('started flipped centered');
        await delay(800);
        setGameState('started flipped centered shuffled');
        await delay(200);
        setGameState('started flipped centered shuffled whirlwind');
        await delay(600);
        setGameState('started flipped centered shuffled');
        await delay(1100);
        setGameState('started flipped centered');
        await delay(200);
        setGameState('started flipped');
        await delay(800);
        setGameState('started flipped selectable');
    }, [cards]);

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

        const frontList = cardItem.getElementsByClassName('front');
        if (frontList && frontList.length > 0 && forcedCard?.image) {
            const front = frontList[0] as HTMLDivElement;
            front.style.backgroundImage = `url(${forcedCard.image})`;
            await loadImage(forcedCard.image);
        }

        const starsRoot = document.createElement('div');
        const root = createRoot(starsRoot);
        root.render(<CardStars />);
        cardItem.appendChild(starsRoot);

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

    if (cards.length === 0) {
        return null;
    }

    return (
        <div className="flex place-items-center min-h-dvh">
            <div className="text-center mx-auto max-w-7xl p-8">
                <div className="absolute top-0 left-0 w-full h-[25vh] bg-[#e0eaf5] [clip-path:polygon(0_0,100%_0,100%_80%,0%_100%)]" />
                <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-[#dde7f3] [clip-path:polygon(0_20%,100%_0,100%_100%,0%_100%)]" />
                <GameTitle selectedBoosterType={selectedBoosterType} gameState={gameState} />
                <ContentCards gameState={gameState} game={game} cards={cards} selectCard={selectCard} />
                <GameActions gameState={gameState} start={startWonderPick} reset={resetGame} />
            </div>
            <Preferences onSave={resetGame} />
        </div>
    );
}
