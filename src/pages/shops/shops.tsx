import {Container} from "@/components/container";
import {useQuery} from "react-query";
import {Shop} from "@/types";
import axios from "axios";
import {URLS} from "@/urls";
import {Loader} from "@/components/loader";
import React from "react";
import {Button, Label, Modal, Table} from "flowbite-react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

interface ShopsProps {
}

interface ShopForm {
    name: string;
    slugs: string;
    address: string;
}

const shopSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    slugs: Yup.string().required("Slug is required"),
    address: Yup.string().required("Address is required"),
});


export const Shops: React.FunctionComponent<ShopsProps> = (props) => {

    const {data, status, refetch} = useQuery<Shop[]>({
        queryKey: 'shops',
        queryFn: async () => {
            const {data} = await axios.get(URLS.shop);
            return data;
        }
    });

    const deleteShop = async (id: string) => {
        await axios.delete(URLS.shopDetails(id))
        await refetch();
    }

    const [show, setShow] = React.useState(false);

    const onClick = () => {
        setShow(!show);
    }

    const onClose = () => {
        setShow(false);
    }

    return <Container>
        <div className={"mx-auto w-10/12 mt-5 space-y-2"}>
            <Button onClick={onClick} gradientMonochrome={"info"}>
                Add Shop
            </Button>
        </div>
        <Loader status={status}>
            <div className={"mx-auto w-10/12 mt-5"}>
                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell>ID</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Address</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className={"divide-y"}>
                        {data?.map((shop) => <Table.Row key={shop.id}
                                                        className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{shop.id}</Table.Cell>
                                <Table.Cell>{shop.name}</Table.Cell>
                                <Table.Cell>{shop.address}</Table.Cell>
                                <Table.Cell className={"flex flex-row gap-2"}>
                                    <Button
                                        gradientMonochrome="failure"
                                        onClick={() => deleteShop(shop.id)}
                                    ><p>Delete</p></Button>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        </Loader>

        <Modal
            dismissible
            onClose={onClose}
            show={show}
        >
            <Modal.Header>
                Add Shop
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={{} as ShopForm}
                        onSubmit={async (values, actions) => {
                            await axios.post(URLS.shop, values)
                            await refetch();
                            actions.setSubmitting(false);
                            actions.resetForm();
                        }
                        }
                        validationSchema={shopSchema}
                >
                    <Form className={"flex flex-col gap-2 w-full"}>
                        <Label htmlFor={"name"} value={"Name"}/>
                        <Field id={"name"} name={"name"} placeholder={"Name"}
                               className={"h-12 w-full border border-gray-300 rounded-md px-2"}
                        />
                        <ErrorMessage name={"name"} component={"div"} className={"text-red-500"}/>

                        <Label htmlFor={"slugs"} value={"Slug"}/>
                        <Field id={"slugs"} name={"slugs"} placeholder={"Slug"}
                               className={"h-12 w-full border border-gray-300 rounded-md px-2"}
                        />
                        <ErrorMessage name={"slugs"} component={"div"} className={"text-red-500"}/>

                        <Label htmlFor={"address"} value={"Address"}/>
                        <Field id={"address"} name={"address"} placeholder={"Address"}
                               className={"h-12 w-full border border-gray-300 rounded-md px-2"}
                        />
                        <ErrorMessage name={"address"} component={"div"} className={"text-red-500"}/>

                        <Button gradientMonochrome={"success"} type={"submit"}
                            onClick={onClose}
                        >Add</Button>
                    </Form>
                </Formik>
            </Modal.Body>
        </Modal>
    </Container>
};