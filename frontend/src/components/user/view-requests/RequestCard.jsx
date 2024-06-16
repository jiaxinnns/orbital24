import React from "react";
import AcceptRequestButton from "./AcceptRequestButton";
import DeclineRequestButton from "./DeclineRequestButton";
import { Card } from "@chakra-ui/react";
import logo from "../../../assets/logo.png";

const RequestCard = (props) => {
  return (
    <div>
      <Card
        className="w-full"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
      >
        <img src={logo} className="w-36 p-4"></img>
        <div className="flex overflow-hidden">
          <div className="p-8 flex flex-col">
            <div className="text-2xl flex justify-start font-bold">
              {props.pm.name}
            </div>
            <div className="text-lg flex justify-start text-gray-500">
              {props.pm.gender} | {props.pm.faculty}
            </div>
            <div className="flex gap-x-2 justify-start pt-2">
              <AcceptRequestButton pm={props.pm} />
              <DeclineRequestButton />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RequestCard;
