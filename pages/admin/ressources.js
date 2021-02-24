import { useState, useEffect } from "react";
import fire from "../../config/fire-config";
import Head from "next/head";
import CreateRessource from "../../components/CreateRessource";
import Link from "next/link";

const ressources = () => {
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
      <title>Edit ressources - Ressources Antoine Tardivel</title>
      </Head>
      <h1>Ressources Antoine Tardivel</h1>
      <ul>
        {ressources.map(ressource =>
          <li key={ressource.id}><Link href="/admin/editressource/[id]" as={"/admin/editressource/" + ressource.id}><a>{ressource.title}</a></Link></li>
        )}
      </ul>
      <CreateRessource />
    </div>
  )
}

export default ressources;