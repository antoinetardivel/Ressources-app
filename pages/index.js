import { useState, useEffect } from "react";
import firebase from "../config/fire-config";
import Head from "next/head";
import Link from "next/link";
import React from 'react';

// Check if connected
import nookies from 'nookies';
import { firebaseAdmin } from '../config/fire-admin';

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.`, connected:"connecté" },
    };
  } catch (err) {
    // ctx.res.writeHead(302, { Location: '/login' });
    // ctx.res.end();
    return {
      props: { message: `...`, connected:"déconnecté" },
    };
  }
};

export default (props) => {
  const [ressources, setRessources] = useState([]);

  useEffect(() => {
    firebase.firestore()
      .collection("ressources")
      .onSnapshot(snap => {
        const ressources = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRessources(ressources);
      });
  }, []);
  return (
    <div>
      <p>{props.connected}</p>
      <Head>
        <title>Ressources Antoine Tardivel</title>
      </Head>
      <h1>Ressources Antoine Tardivel</h1>
      <ul>
        {ressources.map(ressource =>
          <li key={ressource.id}><Link href="/ressource/[id]" as={"/ressource/" + ressource.id}><a>{ressource.title}</a></Link></li>
        )}
      </ul>
      <Link href="/admin"><a>Admin panel</a></Link>
    </div>
  )
}