export interface NavLink {
    id: string;
    title: string;
}

export interface CocktailListItem {
    name: string;
    country: string;
    detail: string;
    price: string;
}


export type MocktailListItem = CocktailListItem;

export interface Profile {
    imgPath: string;
}

export interface StoreInfo {
    heading: string;
    address: string;
    contact: {
        phone: string;
        email: string;
    };
}

export interface OpeningHour {
    day: string;
    time: string;
}

export interface Social {
    name: string;
    icon: string;
    url: string;
}

export interface Cocktail {
    id: number;
    name: string;
    image: string;
    title: string;
    description: string;
}
