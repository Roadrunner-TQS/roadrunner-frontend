import {CiBoxes, CiLocationOn, CiShop, FaAd, SlChart} from "react-icons/all";
import {IconType} from "react-icons";

interface NavbarLink {
    title: string,
    path: string,
    icon: IconType
    access?: string[]
}

export const navbarLinks:NavbarLink[] = [
    {
        title: 'Packages',
        path: '/packages',
        icon: CiBoxes,
        access: ['ROLE_ADMIN', 'ROLE_PARTNER']
    },
    {
        title: 'PickUp Points',
        path: '/pickups',
        icon:CiLocationOn,
        access: ['ROLE_ADMIN']
    },
    {
        title: 'Shops',
        path: '/shops',
        icon: CiShop,
        access: ['ROLE_ADMIN']
    },
    {
        title: 'Statistics',
        path: '/statistics',
        icon: SlChart,
        access: ['ROLE_ADMIN']
    }
]