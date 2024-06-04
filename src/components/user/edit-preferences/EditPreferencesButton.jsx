import React from "react";

const EditPreferencesButton = (props) => {
  async function handleClick(e) {
    console.log("submitted preferences!");
  }

  return (
    <div>
      <button>Submit Preferences</button>
    </div>
  );
};

export default EditPreferencesButton;
