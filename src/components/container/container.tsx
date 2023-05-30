import {Navbar} from "@/components/navbar";

interface ContainerProps {
}

export const Container: React.FunctionComponent<ContainerProps> = (props: React.PropsWithChildren) => {
    return <div className={"w-full h-screen bg-gray-200"}>
        <Navbar/>
        {props.children}
    </div>
};