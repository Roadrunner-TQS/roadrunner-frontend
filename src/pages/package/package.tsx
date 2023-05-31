import {Container} from "@/components/container";
import {Loader} from "@/components/loader";
import {Card, Timeline} from "flowbite-react";
import {useQuery} from "react-query";
import {Package as PackageType} from "@/types";
import {useParams} from "react-router-dom";
import axios from "axios";
import {URLS} from "@/urls";
import moment from "moment";
import {useAuth} from "@/contexts/auth";

interface PackageProps {
}

export const Package: React.FunctionComponent<PackageProps> = (props) => {
    const {token} = useAuth();
    const params = useParams()
    const {data, status} = useQuery<PackageType>({
        queryKey: ['package', params.id],
        queryFn: async () => {
            const {data} = await axios.get(URLS.packageDetails(params.id || ""),{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return data;
        }
    });


    return <Container>
        <Loader status={status}>
            <div className={"w-10/12 mt-5 space-y-4 mx-auto"}>
                <Card>
                    <div className={"grid grid-cols-12"}>
                        <div className={"col-span-10"}>
                            <h2 className={"text-3xl font-bold"}>User</h2>
                            <div className={"text-2xl flex flex-row items-center space-x-1"}>
                                {data?.customer.firstName} {data?.customer.lastName}
                            </div>
                            <div className={"text-xl font-extralight flex flex-row items-center space-x-1"}>
                                {data?.customer.email}
                            </div>

                            <div className={"text-xl font-extralight flex flex-row items-center space-x-1"}>
                                {data?.customer.phone}
                            </div>

                            <hr className={"mx-2 my-4"}/>

                            <h2 className={"text-3xl font-bold"}>Shop</h2>
                            <div className={"text-xl flex flex-row items-center space-x-1"}>
                                {data?.shop.name}
                            </div>
                            <div className={"text-xl font-extralight flex flex-row items-center space-x-1"}>
                                {data?.shop.address}
                            </div>

                            <hr className={"mx-2 my-4"}/>

                            <h2 className={"text-3xl font-bold"}>Pick Up Point</h2>
                            <div className={"text-xl flex flex-row items-center space-x-1"}>
                                {data?.pickUpLocation.name}
                            </div>
                            <div className={"text-xl font-extralight flex flex-row items-center space-x-1"}>
                                {data?.pickUpLocation.address}
                            </div>

                            <div className={"text-xl font-extralight flex flex-row items-center space-x-1"}>
                                {data?.pickUpLocation.city} ({data?.pickUpLocation.latitude}, {data?.pickUpLocation.longitude})
                            </div>

                        </div>

                        <Timeline className={"col-span-2"}>
                            {data?.states.map((state) => <>
                                <Timeline.Item>
                                    <Timeline.Point/>
                                    <Timeline.Content>
                                        <Timeline.Title>
                                            {state.state}
                                        </Timeline.Title>
                                        <Timeline.Time>
                                            {moment(state.date).format('MMMM Do YYYY h:mm:ss a')}
                                        </Timeline.Time>
                                    </Timeline.Content>
                                </Timeline.Item>
                            </>)}
                        </Timeline>

                    </div>
                </Card>
            </div>
        </Loader>
    </Container>
};