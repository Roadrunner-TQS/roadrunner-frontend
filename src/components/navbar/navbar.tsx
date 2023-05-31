import {Avatar, Dropdown, Navbar as NavbarFB} from "flowbite-react";
import {navbarLinks} from "@/components/navbar/navbarLinks";
import {Link} from "react-router-dom";
import {useAuth} from "@/contexts/auth";

interface NavbarProps {
}

export const Navbar: React.FunctionComponent<NavbarProps> = () => {

    const {user, logout} = useAuth();


    return <NavbarFB
        fluid={true}
        rounded={false}
        className={"shadow"}
    >
        <NavbarFB.Brand>
            <img
                src="/icon.png"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Roadrunner
    </span>
        </NavbarFB.Brand>
        <div className="flex md:order-2">
            <Dropdown
                arrowIcon={false}
                inline={true}
                label={<Avatar alt="User settings" img={`https://robohash.org/${user?.firstName}${user?.lastName}`}
                               rounded={true}/>}
            >
                <Dropdown.Header>
        <span className="block text-sm">
          {user?.firstName} {user?.lastName}
        </span>
                    <span className="block truncate text-sm font-medium">
          {user?.email}
        </span>
                </Dropdown.Header>
                <Dropdown.Item onClick={logout}>
                    Sign out
                </Dropdown.Item>
            </Dropdown>
            <NavbarFB.Toggle/>
        </div>
        <NavbarFB.Collapse>
            {navbarLinks.map((link) => <>
                    {user && link.access?.includes(user.role) && <Link key={link.title} to={link.path}>
                        <NavbarFB.Link className={"flex flex-row items-center space-x-2"}
                                       active={window.location.pathname === link.path}
                        >
                            <link.icon className={"text-2xl"}/>
                            <span>{link.title}</span>
                        </NavbarFB.Link>
                    </Link>
                    }
                </>
            )}
        </NavbarFB.Collapse>
    </NavbarFB>
};