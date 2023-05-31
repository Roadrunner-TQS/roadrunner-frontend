import {Container} from "@/components/container";
import React from "react";
import {Button, Table, TextInput} from "flowbite-react";
import {useQuery} from "react-query";
import axios from "axios";
import {URLS} from "@/urls";
import {PickUpPoint} from "@/types";
import {Loader} from "@/components/loader";
import {CiSearch} from "react-icons/all";
import {useAuth} from "@/contexts/auth";

interface PickUpPointsProps {
}


export const PickUpPoints: React.FunctionComponent<PickUpPointsProps> = (props) => {

    const {token} = useAuth();

    const {data, status, refetch} = useQuery<PickUpPoint[]>({
        queryKey: ['pickup-points'],
        queryFn: async () => {
            const {data} = await axios.get(URLS.pickUp,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            return data;
        }
    });
    const [city, setCity] = React.useState<string>("");

    const acceptPickUpPoint = async (id: string) => {
        await axios.put(URLS.pickUpDetails(id), {},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        await refetch();
    }

    const deletePickUpPoint = async (id: string) => {
        await axios.delete(URLS.pickUpDetails(id),{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        await refetch();
    }

    return <Container>
        <Loader status={status}>
            <div className={"mx-auto w-10/12 mt-5 space-y-2"}>
                <TextInput
                    id="searchBar"
                    placeholder="City"
                    rightIcon={CiSearch}
                    type="text"
                    className={"w-2/12"}
                    onChange={(e) => setCity(e.target.value)}
                />
                <Table hoverable={true}>
                    <Table.Head>

                        <Table.HeadCell>
                            ID
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Name
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Address
                        </Table.HeadCell>
                        <Table.HeadCell>
                            City
                        </Table.HeadCell>
                        <Table.HeadCell colSpan={2} className={"text-center"}>
                            Actions
                        </Table.HeadCell>

                    </Table.Head>
                    <Table.Body className={"divide-y"}>
                        {data && data.filter((pickUpPoint) => pickUpPoint.city.toLowerCase().includes(city.toLowerCase())).map((pickUpPoint) => <>
                                <Table.Row key={pickUpPoint.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{pickUpPoint.id}</Table.Cell>
                                    <Table.Cell>
                                        {pickUpPoint.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {pickUpPoint.address}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {pickUpPoint.city} ({pickUpPoint.latitude}, {pickUpPoint.longitude})
                                    </Table.Cell>
                                    <Table.Cell>
                                        {pickUpPoint.accepted ? "Yes" : <Button
                                            gradientMonochrome="success"
                                            onClick={() => acceptPickUpPoint(pickUpPoint.id)}
                                        >
                                            <p>Accept</p>
                                        </Button>}
                                    </Table.Cell>
                                    <Table.Cell className={"flex flex-row gap-2"}>
                                        <Button
                                            gradientMonochrome="failure"
                                            onClick={() => deletePickUpPoint(pickUpPoint.id)}
                                        ><p>Delete</p></Button>
                                    </Table.Cell>
                                </Table.Row>
                            </>
                        )}
                    </Table.Body>
                </Table>
            </div>
        </Loader>

    </Container>
};