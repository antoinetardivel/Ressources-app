import { useState, useEffect } from "react";
import fire from "../../config/fire-config";
import Head from "next/head";
import CreateCategory from "../../components/CreateCategory";
import Link from "next/link";

const categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fire.firestore()
      .collection("categories")
      .onSnapshot(snap => {
        const categories = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categories);
      });
  }, []);

  console.log(categories);

  return (
    <div>
      <Head>
        <title>Edit categories - Ressources Antoine Tardivel</title>
      </Head>
      <h1>Ressources Antoine Tardivel</h1>
      <ul>
        {categories.map(category =>
          <li key={category.id}><Link href="/admin/editcategory/[id]" as={"/admin/editcategory/" + category.id}><a>{category.title}</a></Link></li>
        )}
      </ul>
      <CreateCategory />
    </div>
  )
}

export default categories;