import React from 'react';
import nookies from 'nookies';

import { firebaseAdmin } from '../config/fire-admin';

export const getServerSideProps = async () => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    // the user is authenticated!
    const { uid, email } = token;
    console.log("token:")
    console.log(token)
    // FETCH STUFF HERE!! 🚀

    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props, connectded:"non" };
  }
};

// export default (
//   props
// ) => (
//   <div>
//     <p>{props.message}</p>
//   </div>
// );