import { useState, useEffect } from "react";
import fire from "../../config/fire-config";
import Head from "next/head";
import Link from "next/link";

const categories = () => {
  return (
    <div>
      <Head>
        <title>Admin - Ressources Antoine Tardivel</title>
      </Head>
      <h1>Admin panel</h1>
      <ul>
          <li><Link href="/admin/categories"><a>Edit categories</a></Link></li>
          <li><Link href="/admin/subcategories"><a>Edit sub categories</a></Link></li>
          <li><Link href="/admin/ressources"><a>Edit ressources</a></Link></li>
      </ul>
      <Link href="/"><a>Home</a></Link>
    </div>
  )
}

export default categories;