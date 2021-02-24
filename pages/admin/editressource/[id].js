import { useState, useEffect } from "react";
import fire from "../../../config/fire-config";
import Link from "next/link";
import Head from "next/head";

const editressource = (props) => {

  return (
    <div>
      <Head>
        <title>{props.title} - Ressources Antoine Tardivel</title>
      </Head>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <Link href="/admin/ressources">
        <a>Back</a>
      </Link>
    </div>
  )
}

export const getServerSideProps = async ({ query }) => {
  const content = {};
  await fire.firestore()
    .collection("ressources")
    .doc(query.id)
    .get()
    .then(result => {
      content["title"] = result.data().title;
      content["content"] = result.data().content;
    });

    return {
      props: {
        title: content.title,
        content: content.content
      }
    }
}

export default editressource;