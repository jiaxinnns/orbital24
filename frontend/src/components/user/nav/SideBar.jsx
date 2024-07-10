import { React, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../../contexts/auth/AuthContext";
import logo from "../../../assets/logo.png";

import {
  List,
  ListItem,
  ListIcon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
} from "@chakra-ui/react";

import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import { GrNotes } from "react-icons/gr";
import { PiStudentFill } from "react-icons/pi";
import SignOutButton from "../../auth/SignOutButton";
import ViewProfileButton from "./ViewProfileButton";

function SideBar(props) {
  // get session / user info
  const { session, userInfo, userPreferences, loading } = useAuth();

  // TODO: add links
  const items = [
    { name: "Dashboard", link: "/home", id: 0 },
    { name: "Edit Preferences", link: "/edit-preferences", id: 1 },
    { name: "Find Matches", link: "/find-matches", id: 2 },
    { name: "View Requests", link: "/requests", id: 3 },
    { name: "View Matches", link: "/matches", id: 4 },
    { name: "Study Timer", link: "/timer", id: 5 },
  ];

  const listItems = items.map((item) => (
    <ListItem
      listStyleType="none"
      key={item.id}
      className="hover:text-orange-900"
    >
      <ListIcon as={GrNotes}></ListIcon>
      <Link
        to={item.link}
        sx={{
          color: "initial",
          _hover: {
            color: "initial",
            textDecoration: "none",
          },
        }}
      >
        {item.name}
      </Link>
    </ListItem>
  ));

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <IconButton
        ref={btnRef}
        colorScheme="white"
        onClick={onOpen}
        icon={<HamburgerIcon />}
      ></IconButton>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className="bg-orange-100 flex flex-col gap-y-3 group-aria-expanded:">
            <img src={logo} className="basis-1/3 w-1/2" />
            <div className="text-3xl font-serif">
              Welcome to
              <br />
              StudyBuddies!
            </div>
            <div className="text-sm text-gray-500 font-serif">
              {session ? session.user.email : "Loading..."}
            </div>
            <div className="flex gap-x-2">
              <ViewProfileButton />
              <SignOutButton loading={loading} />
            </div>
          </DrawerHeader>

          <DrawerBody className="font-serif">
            <List className="flex-col space-y-6 pt-4">{listItems}</List>
          </DrawerBody>

          <DrawerFooter justifyContent="start">
            &copy; StudyBuddies 2024 <br /> All rights reserved.
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideBar;
