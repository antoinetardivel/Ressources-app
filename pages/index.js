import { useState, useEffect } from "react";
import firebase from "../config/fire-config";
import Head from "next/head";
import CreatePost from "../components/CreateRessource";
import Link from "next/link";
import { useAuth } from '../auth/AuthProvider';

const Home = () => {
  const [ressources, setRessources] = useState([]);
  const { user } = useAuth();

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

  console.log(ressources);

  return (
    <div>
      <p>{`User ID: ${user ? user.uid : 'no user signed in'}`}</p>
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

export default Home;