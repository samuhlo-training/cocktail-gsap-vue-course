/**
 * [MODULE] :: GLOBAL_TYPES
 * ----------------------------------------------------------------------
 * Core type definitions for the Mojito application.
 * Defines shapes for navigation, cocktail data, shop profiles, and store info.
 *
 * @module    types/index
 * ----------------------------------------------------------------------
 */

// =====================================================================
// [SECTION] :: NAVIGATION & UI
// =====================================================================

/**
 * [INTERFACE] :: NAV_LINK
 * Represents a single navigation link in the main menu or footer.
 */
export interface NavLink {
    id: string;
    title: string;
}

// =====================================================================
// [SECTION] :: COCKTAIL DATA
// =====================================================================

/**
 * [INTERFACE] :: COCKTAIL_LIST_ITEM
 * Compact representation of a cocktail for list views (e.g., Menu).
 */
export interface CocktailListItem {
    name: string;
    country: string;
    detail: string;
    price: string;
}

/**
 * [TYPE] :: MOCKTAIL_LIST_ITEM
 * Alias for non-alcoholic beverages, sharing the same structure.
 */
export type MocktailListItem = CocktailListItem;

/**
 * [INTERFACE] :: COCKTAIL
 * Detailed cocktail object used for featured items or detailed views.
 */
export interface Cocktail {
    id: number;
    name: string;
    image: string;
    title: string;
    description: string;
}

// =====================================================================
// [SECTION] :: STORE & BRANDING
// =====================================================================

/**
 * [INTERFACE] :: PROFILE
 * Visual asset path for the shop owner or main branding profile.
 */
export interface Profile {
    imgPath: string;
}

/**
 * [INTERFACE] :: STORE_INFO
 * Global configuration for store details, address, and contact info.
 */
export interface StoreInfo {
    heading: string;
    address: string;
    contact: {
        phone: string;
        email: string;
    };
}

/**
 * [INTERFACE] :: OPENING_HOUR
 * Schedule definition for store operating hours.
 */
export interface OpeningHour {
    day: string;
    time: string;
}

/**
 * [INTERFACE] :: SOCIAL
 * Social media platform connection details.
 */
export interface Social {
    name: string;
    icon: string;
    url: string;
}
