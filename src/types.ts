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
    state: string;
}
export interface Package {
    id: string;
    states: PackageState[];
    customer: Customer;
    pickUpLocation: PickUpPoint;
    shop: Shop;
    status: string;
}
export interface IState {
    state: string;
    nextStates: {
        state: string;
        authorizedRoles: string[];
    }[]

}


export const possibleStates: IState[] = [
    {
        state: "PENDING",
        nextStates: [
            {
                state: "CANCELLED",
                authorizedRoles: ["CUSTOMER"]
            },
            {
                state: "SHIPPING",
                authorizedRoles: ["ROLE_ADMIN"]
            },
            {
                state: "DENIED",
                authorizedRoles: ["ROLE_ADMIN"]
            },
        ]
    },
    {
        state: "SHIPPING",
        nextStates: [
            {
                state: "INTRANSIT",
                authorizedRoles: []
            }
        ]
    },
    {
        state: "INTRANSIT",
        nextStates: [
            {
                state: "AVAILABLE",
                authorizedRoles: []
            }
        ]
    },
    {
        state: "AVAILABLE",
        nextStates: [
            {
                state: "DELIVERED",
                authorizedRoles: ["ROLE_PARTNER"]
            },
            {
                state: "FORGOTEN",
                authorizedRoles: []
            },
            {
                state: "RETURNED",
                authorizedRoles: ["CUSTOMER"]
            }
        ]
    }
]