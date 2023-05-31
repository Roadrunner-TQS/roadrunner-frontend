import {Container} from "@/components/container";
import {useQuery} from "react-query";
import {Package, PickUpPoint, possibleStates} from "@/types";
import {URLS} from "@/urls";
import {Loader} from "@/components/loader";
import {Badge, Button, Select, Table} from "flowbite-react";
import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useAuth} from "@/contexts/auth";

interface PackagesProps {
}

export const Packages: React.FunctionComponent<PackagesProps> = () => {

    const [edit, setEdit] = React.useState<string>("");
    const selectRef = React.useRef<HTMLSelectElement|null>(null);
    const [pickUp, setPickUp] = React.useState<string>("");
    const {token, user} = useAuth();

    const {data, status, refetch} = useQuery<Package[]>({
        queryKey: 'packages', queryFn: async () => {
            const {data} = await axios.get(URLS.packages, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            });
            return data;
        }
    });

    const {data: pickUps, status: pickUpStatus} = useQuery<PickUpPoint[]>({
        queryKey: 'pickUps', queryFn: async () => {
            const {data} = await axios.get(URLS.pickUp, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            });
            return data;
        },
        enabled: user?.role === 'ROLE_ADMIN'
    });

    const editPackage = async (id: string, status: string) => {
        await axios.put(URLS.editPackage(id), {}, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                newstate: status
            }
        });
        await refetch();
        setEdit("")
    }

    const filteredPosibleStates = (pck: Package) => possibleStates.find(
        (state) => state.state === pck.status)?.nextStates.filter((state) => state.authorizedRoles.includes(user?.role || "")) || [];


    return <Container>
        <div className={"mx-auto w-10/12 mt-5 space-y-2"}>
            <Loader status={status}>
                <div className={"flex flex-row justify-between items-center"}>
                    {user?.role === 'ROLE_ADMIN' && <Loader status={pickUpStatus}>
                        <Select
                            onChange={(e) => setPickUp(e.target.value)}
                        >
                            <option value={""}>All</option>
                            {pickUps?.map((pck) => <option key={pck.id} value={pck.id}>{pck.name}</option>)}
                        </Select>
                    </Loader>}
                </div>

                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell>Id</Table.HeadCell>
                        <Table.HeadCell>Customer</Table.HeadCell>
                        <Table.HeadCell>Pick Up Point</Table.HeadCell>
                        <Table.HeadCell className={"text-center"}>Status</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className={"divide-y"}>
                        {data?.filter((pck) => pickUp === "" || pck.pickUpLocation.id === pickUp).map((pck) => <>
                            <Table.Row key={pck.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className={"decoration-1 hover:underline"}>
                                    <Link to={pck.id}>{pck.id}</Link>
                                </Table.Cell>
                                <Table.Cell>{pck.customer.firstName} {pck.customer.lastName}</Table.Cell>
                                <Table.Cell>{pck.pickUpLocation.name}</Table.Cell>
                                <Table.Cell className={"flex flex-row items-center justify-around"}>
                                    {edit === pck.id ? <>
                                        <Select ref={selectRef}>
                                            {filteredPosibleStates(pck).map((state) => <option
                                                key={state.state}>{state.state}</option>)}

                                        </Select>
                                        <div className={"flex flex-row items-center gap-2"}>
                                            <Button gradientMonochrome={"success"} size={"sm"} className={"ml-2"}
                                                    onClick={() => editPackage(pck.id, selectRef.current?.value || "")}
                                            >
                                                Save
                                            </Button>
                                            <Button gradientMonochrome={"failure"} size={"sm"}
                                                    onClick={() => setEdit("")}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </> : <>
                                        <Badge color={"indigo"} className={"w-fit"}>
                                            {pck.status}
                                        </Badge>
                                        {filteredPosibleStates(pck).length > 0 && <>
                                            <Button gradientMonochrome={"info"} size={"sm"} className={"ml-2"}
                                                    onClick={() => setEdit(pck.id)}
                                            >
                                                Change
                                            </Button>
                                        </>}
                                    </>}
                                </Table.Cell>
                            </Table.Row>
                        </>)}
                    </Table.Body>
                </Table>
            </Loader>
        </div>

    </Container>
};