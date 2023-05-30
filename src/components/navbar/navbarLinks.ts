import {CiBoxes, CiLocationOn, CiShop, SlChart} from "react-icons/all";
import {IconType} from "react-icons";

interface NavbarLink {
    title: string,
    path: string,
    icon: IconType
}

export const navbarLinks:NavbarLink[] = [
    {
        title: 'Packages',
        path: '/packages',
        icon: CiBoxes
    },
    {
        title: 'PickUp Points',
        path: '/pickups',
        icon:CiLocationOn
    },
    {
        title: 'Shops',
        path: '/shops',
        icon: CiShop
    },
    {
        title: 'Statistics',
        path: '/statistics',
        icon: SlChart
    }
]