import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";
import logo from "../../../assets/logo.png";
import Select from "react-select";
import EditPreferencesButton from "./EditPreferencesButton";

const EditPreferencesCard = () => {
  const faculties = [
    { label: "School of Computing" },
    { label: "College of Humanities & Sciences" },
    { label: "Medicine" },
    { label: "Law" },
    { label: "Dentistry" },
    { label: "College of Design & Engineering" },
    { label: "Others" },
    { label: "No preference" },
  ];

  const genders = [
    { label: "Male" },
    { label: "Female" },
    { label: "Others" },
    { label: "No preference" },
  ];

  const studySpots = [{ label: "Male" }];

  const [selectedFaculty, setSelectedFaculty] = useState("No preference");
  const [selectedGender, setSelectedGender] = useState("No preference");
  const [selectedStudySpot, setSelectedStudySpot] = useState("No preference");
  return (
    <Card className="flex flex-col gap-y-5 w-full">
      <div className="flex justify-center pt-5">
        <img src={logo} className="w-1/5"></img>
      </div>
      <div className="font-serif text-4xl">Edit Preferences</div>
      <CardBody className="flex flex-col w-full gap-y-4">
        <div className="flex gap-x-2">
          <Select
            options={faculties}
            placeholder={<div>Preferred Faculty</div>}
            className="w-1/2 rounded-md"
            required
            onChange={(choice) => {
              console.log(choice);
              setSelectedFaculty(choice.label);
            }}
          ></Select>

          <Select
            options={genders}
            placeholder={<div>Preferred Gender</div>}
            className="w-1/2 rounded-md"
            required
            onChange={(choice) => {
              console.log(choice);
              setSelectedGender(choice.label);
            }}
          ></Select>
        </div>
        <div className="flex w-full justify-center">
          <Select
            options={studySpots}
            placeholder={<div>Preferred Study Spot in NUS</div>}
            className="w-full rounded-md"
            required
            onChange={(choice) => {
              console.log(choice);
              setSelectedStudySpot(choice.label);
            }}
          ></Select>
        </div>
        <EditPreferencesButton
          faculty={selectedFaculty}
          gender={selectedGender}
          studySpot={selectedStudySpot}
        />
      </CardBody>
    </Card>
  );
};

export default EditPreferencesCard;
