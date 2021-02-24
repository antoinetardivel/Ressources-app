import { useState, useEffect } from "react";
import fire from "../../../config/fire-config";
import Link from "next/link";
import Head from "next/head";

const editcategory = (props) => {

  return (
    <div>
      <Head>
        <title>{props.title} - Ressources Antoine Tardivel</title>
      </Head>
      <h2>{props.title}</h2>
      <Link href="/admin/categories">
        <a>Back</a>
      </Link>
    </div>
  )
}

export const getServerSideProps = async ({ query }) => {
  const content = {};
  await fire.firestore()
    .collection("categories")
    .doc(query.id)
    .get()
    .then(result => {
      content["title"] = result.data().title;
    });

    return {
      props: {
        title: content.title
      }
    }
}

export default editcategory;