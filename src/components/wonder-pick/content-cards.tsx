/* eslint-disable @next/next/no-img-element */

import "@/app/styles/animations.css";
import "@/app/styles/whirlwind.css";
import "@/app/styles/game.css";
import { Card } from "@/lib/definitions";

export default function ContentCards({
    cards,
    gameState,
    game,
    selectCard,
}: {
    cards: Card[],
    gameState: string,
    game: number,
    selectCard: (index: number, card: Card) => void,
}) {
    if (cards.length === 0) {
        return null;
    }

    return (
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
            <div className='relative top-0 left-0 z-1'>
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
    );
}
