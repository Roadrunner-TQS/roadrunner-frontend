import React from "react";
import {Button, Card, Label} from "flowbite-react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "react-query";
import axios from "axios";
import {URLS} from "@/urls";
import {User} from "@/types";

interface SignUpProps {
}

interface ISignUp {
    email: string;
    password: string
    firstName: string;
    lastName: string;
    phoneNumber: string;
    name: string;
    address: string;
    city: string;
    latitude: number;
    longitude: number;
}

const loginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    latitude: Yup.number().required("Latitude is required"),
    longitude: Yup.number().required("Longitude is required")
});

export const SignUp: React.FunctionComponent<SignUpProps> = (props) => {

    const [step, setStep] = React.useState(1);
    const navigate = useNavigate();

    const signUpMutation = useMutation({
        mutationFn: async (values: Partial<User>) => {
            const {data} = await axios.post(URLS.register, values);
            return data;
        },
        onSuccess: (data) => {
            navigate("/signIn")
        },
        onError: (error) => {
            console.log(error)
        }
    })


    return <div className={"w-full h-screen bg-blue-800 flex items-center"}>
        <Card className={"w-10/12 lg:w-4/12 h-fit mx-auto shadow-2xl"}>
            <Formik initialValues={{} as ISignUp} validationSchema={loginSchema}
                    onSubmit={async (values, actions) => {
                        const signUpData : Partial<User> = {
                            email: values.email,
                            password: values.password,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            pickUpLocation: {
                                name: values.name,
                                address: values.address,
                                city: values.city,
                                latitude: values.latitude,
                                longitude: values.longitude
                            }
                        }

                        signUpMutation.mutate(signUpData)
                        actions.setSubmitting(false);
                    }}>
                <Form className="flex flex-col gap-4">
                    {step === 1 && <>
                        <div>
                            <p className={"text-center text-5xl font-bold"}>ROADRUNNER</p>
                            <img src="/icon.png" className="mx-auto" alt="Roadrunner Logo"/>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Email address"/>
                            </div>
                            <Field id={"email"} name={"email"} placeholder={"email@roadrunner.com"}
                                   className={"h-12 w-full border border-gray-300 rounded-md px-2"}
                                   type={"email"}
                            />
                            <ErrorMessage name={"email"} component={"div"} className={"text-red-500"}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="pasword"
                                    value="Your password"
                                />
                            </div>
                            <Field id={"password"} name={"password"} placeholder={"*********"}
                                   className={"h-12 w-full border border-gray-300 rounded-md px-2"}
                                   type={"password"}
                            />
                            <ErrorMessage name={"password"} component={"div"} className={"text-red-500"}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="firstName"
                                    value="First name"
                                />
                            </div>
                            <Field id={"firstName"} name={"firstName"} placeholder={"First Name"}
                                   className={"h-12 w-full border border-gray-300 rounded-md px-2"}
                                   type={"text"}
                            />
                            <ErrorMessage name={"firstName"} component={"div"} className={"text-red-500"}/>
                        </div>


                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="lastName"
                                    value="Last name"
                                />
                            </div>
                            <Field id={"lastName"} name={"lastName"} placeholder={"Last Name"}
                                   className={"h-12 w-full border border-gray-300 rounded-md px-2"}
                                   type={"text"}
                            />
                            <ErrorMessage name={"lastName"} component={"div"} className={"text-red-500"}/>
                        </div>
                    </>
                    }

                    {step === 2 && <>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="phoneNumber"
                                    value="Phone number"
                                />
                            </div>
                            <Field id={"phoneNumber"} name={"phoneNumber"} placeholder={"Phone number"}
                                   className={"h-12 w-full border border-gray-300 rounded-md px-2"}
                                   type={"text"}
                            />
                            <ErrorMessage name={"phoneNumber"} component={"div"} className={"text-red-500"}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="name"
                                    value="Name"
                                />
                            </div>
                            <Field id={"name"} name={"name"} placeholder={"Name"}
                                   className={"h-12 w-full border border-gray-300 rounded-md px-2"}
                                   type={"text"}
                            />
                            <ErrorMessage name={"name"} component={"div"} className={"text-red-500"}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="address"
                                    value="Address"
                                />
                            </div>

                            <Field id={"address"} name={"address"} placeholder={"Address"}
                                   className={"h-12 w-full border border-gray-300 rounded-md px-2"}
                                   type={"text"}
                            />
                            <ErrorMessage name={"address"} component={"div"} className={"text-red-500"}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="city"
                                    value="City"
                                />
                            </div>
                            <Field id={"city"} name={"city"} placeholder={"City"}
                                   className={"h-12 w-full border border-gray-300 rounded-md px-2"}
                                   type={"text"}
                            />
                            <ErrorMessage name={"city"} component={"div"} className={"text-red-500"}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="latitude"
                                    value="Latitude"
                                />
                            </div>
                            <Field id={"latitude"} name={"latitude"} placeholder={"Latitude"}
                                      className={"h-12 w-full border border-gray-300 rounded-md px-2"}
                                        type={"number"}
                            />
                            <ErrorMessage name={"latitude"} component={"div"} className={"text-red-500"}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="longitude"
                                    value="Longitude"
                                />
                            </div>
                            <Field id={"longitude"} name={"longitude"} placeholder={"Longitude"}
                                      className={"h-12 w-full border border-gray-300 rounded-md px-2"}
                                        type={"number"}
                            />
                            <ErrorMessage name={"longitude"} component={"div"} className={"text-red-500"}/>
                        </div>
                    </>
                    }

                    {step === 1 ?
                        <Button onClick={() => setStep(2)}>
                            Next
                        </Button> :
                        <div className={"flex flex-row w-full gap-2"}>
                            <Button onClick={() => setStep(1)} className={"basis-1/2"}>
                                Back
                            </Button>
                            <Button type={"submit"} className={"basis-1/2"} color={"success"}>
                                Submit
                            </Button>
                        </div>
                    }
                </Form>
            </Formik>
            <p className={"mx-auto"}>
                Already have an account? <Link to={"/signin"} className={"text-blue-500"}>Sign in</Link>
            </p>
        </Card>
    </div>;
};