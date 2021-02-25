// form to write posts
import React, { useState } from "react";
import firebase from "../config/fire-config";


const CreateCategory = () => {
  const [title, setTitle] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    firebase.firestore()
    .collection("categories")
    .add({ title: title});

    setTitle("");

    setNotification("Create category");

    setTimeout(() => {
      setNotification("")
    }, 2000)
  }

  return (
    <div>
      <h2>Add ressource category</h2>
      {notification}
      <form onSubmit={handleSubmit}>
        <div>
          Title <br />
          <input type="text" value={title} onChange={ ({target}) => setTitle(target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default CreateCategory;
