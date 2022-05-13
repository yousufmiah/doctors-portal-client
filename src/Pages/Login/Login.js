import React, { useEffect } from "react";
import {
  // useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  // sign in by google =================
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  // use react hook form ====================
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // sign in with email password =============
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  //forget or reset password============
  // const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  let signInErrorMessage;
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user || googleUser) {
      // console.log(user, googleUser);
      navigate(from, { replace: true });
    }
  }, [user, googleUser, from, navigate]);

  // loading spinner==================
  if (loading || googleLoading) {
    return <Loading></Loading>;
  }

  // error message=====================
  if (error || googleError) {
    signInErrorMessage = (
      <p className="text-red-500">{error?.message || googleError?.message}</p>
    );
  }

  // onsubmit=======================
  const onSubmit = (data) => {
    // console.log(data);
    signInWithEmailAndPassword(data.email, data.password);
  };

  //forget or reset password====================
  // const resetPassword = async (data) => {
  //   console.log("clicked");
  //   console.log(data);
  //   const email = data.email;
  //   // console.log(email);
  //   await sendPasswordResetEmail(email);
  //   if (email) {
  //     toast("Sent email");
  //   } else {
  //     toast("Please enter your email address.");
  //   }
  //   email("");
  // };

  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* =====email input start==== */}
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xs"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid Email",
                  },
                })}
              />
              <label class="label">
                {errors.email?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span class="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            {/* ========email input end========= */}

            {/* ======password input start===== */}
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your Password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 character or longer",
                  },
                })}
              />
              <label class="label">
                {errors.password?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span class="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>

            {/* ======password input end===== */}
            {signInErrorMessage}

            {/* ===login button */}
            <input
              className="btn w-full max-w-xs text-white"
              type="submit"
              value="Login"
            />
          </form>

          {/* ======to signup======= */}
          <p>
            <small>
              New to Doctors Portal?
              <Link className="text-primary" to="/signup">
                Create New Account
              </Link>
            </small>
          </p>

          {/* ==== forget or reset password ==== */}
          {/* <p>
            <small>
              Forget Password?
              <button onClick={resetPassword} className="text-primary">
                Reset Password
              </button>
            </small>
          </p> */}

          {/* =====sign in with google */}
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
