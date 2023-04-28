import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

export default function NewMeetupForm() {
  // here, useNavigate() allows us to programatically navigate through different pages of an SPA
  const navigate = useNavigate();

  // here, useRef() allows us to read the value of an input attribute
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  async function submitHandler(event) {
    // this will stop the browser from sending a HTTP request to the server,
    // when the user clicks the submit button.
    // We don't want to reload the page during submitting, rather we want React and JS
    // to handle the submission smoothly. That is why we are doing such
    event.preventDefault();

    // storing the values of different form inputs
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    // Now to store the data in firebase, we need to use the 'fetch' function and
    // make an API call to firebase.
    // The 'meetups.json' part in the end of the API link is necessary to make firebase understand
    // that what should be the table/collection name
    await fetch(
      "https://react-meetup-app-a2eae-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(meetupData),
        // some apis' need this header to be sure that the post data is sent in JSON format
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // this will redirect us automatically to the home page
    navigate("/");
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title"> Meetup Title </label>
          <input type="text" id="title" ref={titleInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="image"> Image URL </label>
          <input type="url" id="image" ref={imageInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="address"> Address </label>
          <input type="text" id="address" ref={addressInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="description"> Description </label>
          <textarea type="text" id="description" ref={descriptionInputRef} rows="5" required />
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}
