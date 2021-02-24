import { useState, useEffect } from "react";
import fire from "../config/fire-config";
import Head from "next/head";
import CreatePost from "../components/CreateRessource";
import Link from "next/link";

const Home = () => {
  const [ressources, setRessources] = useState([]);

  useEffect(() => {
    fire.firestore()
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