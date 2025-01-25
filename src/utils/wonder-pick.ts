import { Booster, WonderPickResponse } from "@/lib/definitions";
import { ALL_CARDS, FORCED_CARD_PIDGEY_IMAGE } from "./cards";

const BoostersList = [
    Booster.A1A_MEW,
    Booster.A1_CHARIZARD,
    Booster.A1_MEWTWO,
    Booster.A1_PIKACHU,
];

export const generateWonderPick = (
    targetBooster: Booster | 'random' = 'random'
) : WonderPickResponse => {
    const booster = targetBooster === 'random'
        ? BoostersList[Math.floor(Math.random() * BoostersList.length)]
        : targetBooster;

    const cardsList = ALL_CARDS[booster].sort(() => Math.random() - 0.5).slice(0, 5);

    const prePickedCardPidgey = cardsList.find((card) => (card.image === FORCED_CARD_PIDGEY_IMAGE));
    const prePickedCard = prePickedCardPidgey
        ? prePickedCardPidgey
        : cardsList[Math.floor(Math.random() * cardsList.length)];

    return {
        cardsList,
        prePickedCard,
        booster,
    };
}

