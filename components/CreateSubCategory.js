// form to write posts
import React, { useState } from "react";
import fire from "../config/fire-config";


const CreateSubCategory = () => {
  const [title, setTitle] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    fire.firestore()
    .collection("subCategories")
    .add({ title: title});

    setTitle("");

    setNotification("Create sub category");

    setTimeout(() => {
      setNotification("")
    }, 2000)
  }

  return (
    <div>
      <h2>Add ressource sub category</h2>
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

export default CreateSubCategory;