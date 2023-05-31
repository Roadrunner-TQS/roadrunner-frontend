import styles from "./toastError.module.css";
import {Toast} from "flowbite-react";
import React from "react";
import {BiErrorCircle} from "react-icons/all";

interface ToastErrorProps {
  message: string;
  setError: (error: string) => void;
}

export const ToastError: React.FunctionComponent<ToastErrorProps> = (props) => {
  return   <Toast className={"absolute bottom-0 right-0 m-2"}>
    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
      <BiErrorCircle className="h-5 w-5" />
    </div>
    <div className="ml-3 text-sm font-normal">
      {props.message}
    </div>
    <Toast.Toggle onClick={()=>props.setError("")}/>
  </Toast>
};