import { useState, useEffect } from "react";
import fire from "../../config/fire-config";
import Head from "next/head";
import CreateSubCategory from "../../components/CreateSubCategory";
import Link from "next/link";

const subcategories = () => {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    fire.firestore()
      .collection("subCategories")
      .onSnapshot(snap => {
        const subCategories = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSubCategories(subCategories);
      });
  }, []);

  console.log(subCategories);

  return (
    <div>
      <Head>
      <title>Edit sub sub categories - Ressources Antoine Tardivel</title>
      </Head>
      <h1>Ressources Antoine Tardivel</h1>
      <ul>
        {subCategories.map(subCategorie =>
          <li key={subCategorie.id}><Link href="/admin/editsubcategory/[id]" as={"/admin/editsubcategory/" + subCategorie.id}><a>{subCategorie.title}</a></Link></li>
        )}
      </ul>
      <CreateSubCategory />
    </div>
  )
}

export default subcategories;