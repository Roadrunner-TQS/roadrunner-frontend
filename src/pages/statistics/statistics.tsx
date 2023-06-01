import {Container} from "@/components/container";
import {useQuery} from "react-query";
import axios from "axios";
import {URLS} from "@/urls";
import {Loader} from "@/components/loader";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {useAuth} from "@/contexts/auth";
import {Card} from "flowbite-react";
import {PackagesByPickUp, PackagesByState} from "@/types";

interface StatisticsProps {
}

export const Statistics: React.FunctionComponent<StatisticsProps> = (props) => {

    const {token} = useAuth();

    const {data: stats1, status: status1} = useQuery({
        queryKey: 'statistics',
        queryFn: async () => {
            const {data} = await axios.get(URLS.statistics,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            return data;
        }
    });

    const {data: stats2, status: status2} = useQuery<PackagesByState[]>({
        queryKey: 'statistics2',
        queryFn: async () => {
            const {data} = await axios.get(URLS.packagesStatistics,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log(data)
            return data;
        }
    });

    const {data: stats3, status: status3} = useQuery<PackagesByPickUp[]>({
        queryKey: 'statistics3',
        queryFn: async () => {
            const {data} = await axios.get(URLS.packagesStatisticsByPickUp,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            return data;
        }
    });

    return <Container>
        <div className={"m-4"}>
            <Loader status={status1}>
                <h1 className={"text-5xl font-bold"}>General Statistics</h1>
                <div className={"grid  grid-cols-1 md:grid-cols-4 gap-4"}>
                    <Card>
                        <div className={"flex flex-row justify-between items-center"}>
                            <h2 className={"text-2xl font-medium"}>Number of Pick Up Locations</h2>
                            <p className={"text-5xl"}>{stats1?.nrPickUpLocations}</p>
                        </div>
                    </Card>
                    <Card>
                        <div className={"flex flex-row justify-between items-center"}>
                            <h2 className={"text-2xl font-medium"}>Number of Shops</h2>
                            <p className={"text-5xl"}>{stats1?.nrShops}</p>
                        </div>
                    </Card>
                    <Card>
                        <div className={"flex flex-row justify-between items-center"}>
                            <h2 className={"text-2xl font-medium"}>Number of Packages</h2>
                            <p className={"text-5xl"}>{stats1?.nrPackages}</p>
                        </div>
                    </Card>
                    <Card>

                        <div className={"flex flex-row justify-between items-center"}>
                            <h2 className={"text-2xl font-medium"}>Number of On Going Packages</h2>
                            <p className={"text-5xl"}>{stats1?.nrOnGoingPackages}</p>
                        </div>
                    </Card>
                </div>
            </Loader>
            <div className={"grid grid-cols-2 mt-2 gap-2"}>
                <Card>
                    <h1 className={"font-medium text-5xl"}>Packages by Pickup</h1>
                    <ResponsiveContainer width="100%" className={"items-center flex"}>
                        <Loader status={status2}>
                            <BarChart width={730} height={550} data={stats2}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="state" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="packages" fill="#2085d7" />
                            </BarChart>
                        </Loader>
                    </ResponsiveContainer>
                </Card>

                <Card>
                    <h1 className={"font-medium text-5xl"}>Packages by Pickup</h1>
                    <ResponsiveContainer width="100%" className={"items-center flex"}>
                        <Loader status={status3}>
                            <PieChart width={800} height={600}>
                                <Pie
                                    dataKey="packages"
                                    isAnimationActive={false}
                                    data={stats3}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={200}
                                    fill="#2085d7"
                                    label
                                />
                                <Tooltip/>
                            </PieChart>
                        </Loader>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>

    </Container>
};