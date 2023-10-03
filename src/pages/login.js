import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { GiCardExchange } from "react-icons/gi";

import { login } from "../actions/auth";

function Login() {
  let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(login(data.username, data.password))
      .then(() => {
        navigate("/profile");
        window.location.reload();
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  return (
    <section className="flex-1 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto flex-1 lg:py-0">
        <a href="/" className="flex items-center mb-6 text-2xl font-semibold h1">
          <GiCardExchange size="40px" style={{ color: "#fbbf24" }} className="mr-4" />
          YGO Assistant
        </a>
        <div className="w-full bg-neutral-content rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-base-100">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="username" className="label">
                  <span className="label-text text-neutral font-semibold">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  className="input input-bordered w-full"
                  placeholder="YugiMuto"
                  {...register("username", { required: true })}
                />
                {errors.username?.type === "required" && (
                  <p role="alert" className="text-error mt-1">
                    Username is required
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="label">
                  <span className="label-text text-neutral font-semibold">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && (
                  <p role="alert" className="text-error mt-1">
                    Password is required
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <label className="cursor-pointer label">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      checked="checked"
                      className="checkbox checkbox-primary mr-4"
                      {...register("remember", { required: true })}
                    />
                    <span className="label-text text-neutral">Remember me</span>
                  </label>
                </div>
                <a
                  href="/recoverAccount"
                  className="text-sm font-medium text-neutral hover:underline">
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Sign in
              </button>
              {message && (
                <p role="alert" className="text-error mt-1">
                  {message}
                </p>
              )}
              <p className="text-sm font-light text-neutral">
                Don&#39;t have an account yet?{" "}
                <a href="/createAccount" className="font-medium text-neutral hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
