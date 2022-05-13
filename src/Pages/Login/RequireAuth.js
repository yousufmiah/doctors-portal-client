import { sendEmailVerification } from "firebase/auth";
import React from "react";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);

  if (loading) {
    return <Loading></Loading>;
  }

  //user na thake
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  //email verified na hole dokte dibo na
  if (user.providerData[0]?.providerId === "password" && !user.emailVerified) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-red-500">Your Email is Not verified!!</h3>
        <h5 className="text-green-500">Please verify your email address.</h5>
        <button
          className="btn btn-primary"
          onClick={async () => {
            await sendEmailVerification();
            toast("Sent email");
          }}
        >
          Send Verification Email
        </button>
        <ToastContainer></ToastContainer>
      </div>
    );
  }

  return children;
};
export default RequireAuth;

// //====================

// import React from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Navigate, useLocation } from "react-router-dom";
// import auth from "../../firebase.init";
// import Loading from "../Shared/Loading";

// const RequireAuth = ({ children }) => {
//   const [user, loading] = useAuthState(auth);
//   const location = useLocation();

//   if (loading) {
//     return <Loading></Loading>;
//   }

//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
//   }
//   return children;
// };

// export default RequireAuth;
