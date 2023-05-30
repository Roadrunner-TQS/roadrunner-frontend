import {Button, Card, Label} from "flowbite-react";
import React from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {URLS} from "@/urls";
import {useMutation, useQuery} from "react-query";
import {useAuth} from "@/contexts/auth";

interface SignInProps {
}

interface ILogin {
    email: string;
    password: string;
}

const loginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export const SignIn: React.FunctionComponent<SignInProps> = (props) => {

    const navigate = useNavigate();
    const {setToken, token, login} = useAuth();

    const signInMutation = useMutation({
        mutationFn: async (values: ILogin) => {
            const {data} = await axios.post(URLS.login, values);
            return data;
        },
        onSuccess: (data) => {
            setToken(data.token)
            login(data.user)
        },
        onError: (error) => {
        }
    })

    useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const {data} = await axios.get(URLS.me, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return data;
        },
        enabled: !!token,
        onSuccess: (data) => {
            login(data)
            navigate("/")
        }
    })



    return <div className={"w-full h-screen bg-blue-800 flex items-center"}>
        <Card className={"w-10/12 lg:w-4/12 h-fit mx-auto shadow-2xl"}>
            <Formik initialValues={{} as ILogin} validationSchema={loginSchema}
                    onSubmit={async (values, actions) => {
                        await signInMutation.mutateAsync(values);
                        actions.setSubmitting(false);
                    }}>
                <Form className="flex flex-col gap-4">
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
                    <Button type={"submit"}>
                        Submit
                    </Button>
                </Form>
            </Formik>
            <p className={"mx-auto"}>
                Don't have an account? <Link to={"/signup"} className={"text-blue-500"}>Sign up</Link>
            </p>
        </Card>
    </div>
};