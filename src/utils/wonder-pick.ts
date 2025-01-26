import { Booster, Card, WonderPickResponse, CardRarity } from "@/lib/definitions";
import { ALL_CARDS, FORCED_CARD_PIDGEY_IMAGE } from "./cards";

const BoostersList = [
    Booster.A1A_MEW,
    Booster.A1_CHARIZARD,
    Booster.A1_MEWTWO,
    Booster.A1_PIKACHU,
];

/**
 * Rules: 
 * Pick 5 cards with the following probabilities:
 * 
 * Probability of Normal pack: 99.95%
 * - Probability of inclusion in the 1st, 2nd and 3rd cards:
 *   - CardRarity.C: 100%
 * - Probability of inclusion in the 4th card:
 *   - CardRarity.UR: 0.04%
 *   - CardRarity.IM: 0.222%
 *   - CardRarity.SAR/CardRarity.SR: 0.5%
 *   - CardRarity.AR: 2.572%
 *   - CardRarity.RR: 1.666%
 *   - CardRarity.R: 5%
 *   - CardRarity.U: 90%
 * - Probability of inclusion in the 5ifth card:
 *   - CardRarity.UR: 0.16%
 *   - CardRarity.IM: 0.888%
 *   - CardRarity.SAR/CardRarity.SR: 2%
 *   - CardRarity.AR: 10.288%
 *   - CardRarity.RR: 6.664%
 *   - CardRarity.R: 20%
 *   - CardRarity.U: 60%
 * 
 * Probability of God pack: 0.05%
 * - Probability of inclusion in the 5 cards:
  *  - CardRarity.UR: 5.263%
 *   - CardRarity.IM: 5.263%
 *   - CardRarity.SAR/CardRarity.SR: 47.368%
 *   - CardRarity.AR: 42.105%
 *   - RR: 6.664%
 */
export const getBoosterCardsList = (
    booster: Booster,
    forceGodPack: boolean,
) : Card[] => {
    const targetCards =  ALL_CARDS[booster];
    const isGodPack = forceGodPack ? true : Math.random() < 0.0005; // 0.05% chance

    if (isGodPack) {
        const godPackCards: Card[] = [];
        for (let i = 0; i < 5; i++) {
            const roll = Math.random() * 100;
            let rarity: CardRarity;

            if (roll < 5.263) rarity = CardRarity.UR;
            else if (roll < 10.526) rarity = CardRarity.IM;
            else if (roll < 57.894) rarity = [CardRarity.SR, CardRarity.SAR][Math.floor(Math.random() * 2)];
            else rarity = CardRarity.AR;

            const possibleCards = targetCards.filter(card => card.rarity === rarity);
            godPackCards.push(possibleCards[Math.floor(Math.random() * possibleCards.length)]);
        }
        return godPackCards;
    }

    const normalPack: Card[] = [];
    
    // First 3 cards - Common only
    for (let i = 0; i < 3; i++) {
        const commons = targetCards.filter(card => card.rarity === CardRarity.C);
        normalPack.push(commons[Math.floor(Math.random() * commons.length)]);
    }

    // 4th card
    const fourthCardRoll = Math.random() * 100;
    let fourthCardRarity: string;
    if (fourthCardRoll < 0.04) fourthCardRarity = CardRarity.UR;
    else if (fourthCardRoll < 0.262) fourthCardRarity = CardRarity.IM;
    else if (fourthCardRoll < 0.762) fourthCardRarity = [CardRarity.SR, CardRarity.SAR][Math.floor(Math.random() * 2)];
    else if (fourthCardRoll < 3.334) fourthCardRarity = CardRarity.AR;
    else if (fourthCardRoll < 5) fourthCardRarity = CardRarity.RR;
    else if (fourthCardRoll < 10) fourthCardRarity = CardRarity.R;
    else fourthCardRarity = CardRarity.U;

    const fourthCardPool = targetCards.filter(card => card.rarity === fourthCardRarity);
    normalPack.push(fourthCardPool[Math.floor(Math.random() * fourthCardPool.length)]);

    // 5th card
    const fifthCardRoll = Math.random() * 100;
    let fifthCardRarity: string;
    if (fifthCardRoll < 0.16) fifthCardRarity = CardRarity.UR;
    else if (fifthCardRoll < 1.048) fifthCardRarity = CardRarity.IM;
    else if (fifthCardRoll < 3.048) fifthCardRarity = [CardRarity.SR, CardRarity.SAR][Math.floor(Math.random() * 2)];
    else if (fifthCardRoll < 13.336) fifthCardRarity = CardRarity.AR;
    else if (fifthCardRoll < 20) fifthCardRarity = CardRarity.RR;
    else if (fifthCardRoll < 40) fifthCardRarity = CardRarity.R;
    else fifthCardRarity = CardRarity.U;

    const fifthCardPool = targetCards.filter(card => card.rarity === fifthCardRarity);
    normalPack.push(fifthCardPool[Math.floor(Math.random() * fifthCardPool.length)]);

    return normalPack;
};

export const getRandomCardList = (
    booster: Booster,
) : Card[] => {
    return ALL_CARDS[booster].sort(() => Math.random() - 0.5).slice(0, 5);
}

export const generateWonderPick = (
    targetBooster: Booster | 'random' = 'random',
    forceGodPack: boolean = false,
) : WonderPickResponse => {
    const boosterType = targetBooster === 'random'
        ? BoostersList[Math.floor(Math.random() * BoostersList.length)]
        : targetBooster;
    const cardsList = getBoosterCardsList(boosterType, forceGodPack);
    const prePickedCardPidgey = cardsList.find((card) => (card.image === FORCED_CARD_PIDGEY_IMAGE));
    const prePickedCard = prePickedCardPidgey
        ? prePickedCardPidgey
        : cardsList[Math.floor(Math.random() * cardsList.length)];

    return {
        cardsList,
        prePickedCard,
        boosterType,
    };
}

