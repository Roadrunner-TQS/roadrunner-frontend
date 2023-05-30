export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface Shop {
    id: string;
    name: string;
    slugs: string;
    address: string;
}
export interface User {
    id: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    pickUpLocation: Partial<PickUpPoint>;
}

export interface PickUpPoint {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    city: string;
    accepted: boolean;
}
export interface PackageState {
    id: string;
    date: string;
    state: EPackageState;
}
export interface Package {
    id: string;
    states: PackageState[];
    customer: Customer;
    pickUpLocation: PickUpPoint;
    shop: Shop;
    status: EPackageState;
}

export type EPackageState = "INTRANSIT" | "SHIPPING" | "AVAILABLE" | "DELIVERED" | "RETURNED" | "FORGOTEN";
export const APackageState = ["INTRANSIT", "SHIPPING", "AVAILABLE", "DELIVERED","RETURNED", "FORGOTEN"]
