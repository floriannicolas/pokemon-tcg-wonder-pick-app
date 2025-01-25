export type Card = {
    image: string;
    rarity: CardRarity;
}

export enum CardRarity {
    C = 'C',
    U = 'U',
    R = 'R',
    RR = 'RR',
    AR = 'AR',
    SR = 'SR',
    SAR = 'SAR',
    IM = 'IM',
    UR = 'UR',
}

export enum Booster {
    A1_CHARIZARD = 'a1-charizard',
    A1_MEWTWO = 'a1-mewtwo',
    A1_PIKACHU = 'a1-pikachu',
    A1A_MEW = 'a1a-mew',
}

export type WonderPickResponse = {
    cardsList: Card[];
    prePickedCard: Card;
    booster: Booster;
}