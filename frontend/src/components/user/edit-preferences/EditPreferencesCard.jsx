import React, { useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useToast,
} from "@chakra-ui/react";
import logo from "../../../assets/logo.png";
import Select from "react-select";
import { useAuth } from "../../../contexts/auth/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useToastContext } from "../../../contexts/user/ToastContext";
import { useNavigate } from "react-router-dom";

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

  const { session, userInfo, userPreferences, loading } = useAuth();

  const [selectedFaculty, setSelectedFaculty] = useState(
    userPreferences?.faculty
  );
  const [selectedGender, setSelectedGender] = useState(userPreferences?.gender);
  const [selectedStudySpot, setSelectedStudySpot] = useState(
    userPreferences?.study_spot
  );

  const navigate = useNavigate();
  const { showToast } = useToastContext();

  async function handleSubmit() {
    const userData = [
      {
        id: session.user.id,
        faculty: selectedFaculty,
        gender: selectedGender,
        studyspot: selectedStudySpot,
      },
    ];

    // call API to post
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/userpreferences`,
        {
          method: "POST",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(userData[0]),
        }
      );

      if (!response.ok) {
        throw new Error();
      }
    } catch (e) {
      toast.error("Error when editing preferences.");
    }

    showToast("Successfully edited preferences");
    // reset fields
    setSelectedFaculty("No preference");
    setSelectedGender("No preference");
    setSelectedStudySpot("No preference");

    // bring back to homepage
    navigate("/home");
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
              placeholder={
                <div>
                  {userPreferences
                    ? userPreferences.faculty
                    : "Preferred faculty"}
                </div>
              }
              className="w-1/2 rounded-md"
              required
              onChange={(choice) => {
                console.log(choice);
                setSelectedFaculty(choice.label);
              }}
            ></Select>

            <Select
              options={genders}
              placeholder={
                <div>
                  {userPreferences
                    ? userPreferences.gender
                    : "Preferred gender"}
                </div>
              }
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
              placeholder={
                <div>
                  {userPreferences
                    ? userPreferences.study_spot
                    : "Preferred study spot in NUS"}
                </div>
              }
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
              disabled={loading}
            >
              <p className="p-3">
                {loading ? "Submitting Preferences..." : "Submit Preferences"}
              </p>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditPreferencesCard;
