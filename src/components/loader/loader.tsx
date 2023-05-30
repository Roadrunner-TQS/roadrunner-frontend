import React from "react";
import {Spinner} from "flowbite-react";

interface LoaderProps {
  status: "idle" | "error" | "loading" | "success";
  children: React.ReactNode;
}

export const Loader: React.FunctionComponent<LoaderProps> = (props:LoaderProps) => {
  return <>
    {props.status === "loading" && <div className={"w-full flex flex-col items-center mt-14"}>
      <Spinner size={"xl"} aria-label="Loading"/>
    </div>}
    {props.status === "error" && <div className={"text-xl w-full flex flex-col items-center mt-14"}>Error</div>}

    {props.status === "success" && props.children}
  </>
};