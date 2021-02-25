import React, { useState } from 'react';
import Link from 'next/link';
import firebase from "../config/fire-config";

export default (_props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <div>
        <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={'Email'}
        />
        <input
            type={'password'}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder={'Password'}
        />
        <button
            onClick={async () => {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, pass);
            window.location.href = '/';
            }}
        >
            Create account
        </button>
        <button
            onClick={async () => {
            await firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                // ...
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
              });
            window.location.href = '/';
            }}
        >
            Log in
        </button>
        <br />
        <Link href="/">
            <a>Go back to home page</a>
        </Link>
    </div>
  );
};