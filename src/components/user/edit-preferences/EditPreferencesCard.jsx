import React, { useRef, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";
import logo from "../../../assets/logo.png";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";

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

  const studySpots = [
    { label: "Central Library" },
    { label: "MedSci Library" },
    { label: "HSSML" },
    { label: "Others" },
    { label: "No preference" },
  ];

  const [selectedFaculty, setSelectedFaculty] = useState("No preference");
  const [selectedGender, setSelectedGender] = useState("No preference");
  const [selectedStudySpot, setSelectedStudySpot] = useState("No preference");

  async function handleSubmit() {
    toast.success("not implemented yet");
    console.log(selectedFaculty);

    // reset fields
    setSelectedFaculty("No preference");
    setSelectedGender("No preference");
    setSelectedStudySpot("No preference");

    // facultyRef.current && facultyRef.current.clearValue();
  }

  const facultyRef = useRef();

  return (
    <div>
      <Toaster />
      <Card className="flex flex-col items-center gap-y-5 w-full">
        <div className="flex justify-center pt-5">
          <img src={logo} className="w-1/5"></img>
        </div>
        <div className="font-serif text-4xl">Edit Preferences</div>
        <CardBody className="flex flex-col w-full gap-y-6">
          <div className="flex gap-x-2">
            <Select
              ref={facultyRef}
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
          <div className="flex flex-col items-center text-gray-600 text-sm">
            You can edit these preferences again anytime.
          </div>
          <div className="flex justify-center pb-5">
            <button
              onClick={handleSubmit}
              className="
              bg-orange-100 
              w-1/2 
              rounded-3xl
              "
            >
              <p className="p-3">Submit Preferences</p>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditPreferencesCard;
