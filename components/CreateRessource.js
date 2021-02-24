import React, { useState } from "react";
import fire from "../config/fire-config";


const CreateRessource = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    fire.firestore()
    .collection("ressources")
    .add({ title: title, content: content});

    setTitle("");
    setContent("");

    setNotification("Blog create ressource");

    setTimeout(() => {
      setNotification("")
    }, 2000)
  }

  return (
    <div>
      <h2>Add ressource</h2>
      {notification}
      <form onSubmit={handleSubmit}>
        <div>
          Title <br />
          <input type="text" value={title} onChange={ ({target}) => setTitle(target.value)} />
        </div>
        <div>
          Content <br />
          <textarea value={content} onChange={ ({target}) => setContent(target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default CreateRessource;
