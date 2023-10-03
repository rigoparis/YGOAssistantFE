import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineCheckCircle } from "react-icons/ai";

import { createAccount } from "../actions/auth";

const isValidEmail = (email) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

function CreateAccount() {
  let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createAccount(data.username, data.email, data.password))
      .then(() => {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full toast toast-top toast-center h-10`}>
            <div className="alert alert-success">
              <div className="flex flex-row justify-center items-center">
                <AiOutlineCheckCircle className="mr-2" />
                Account created successfully. Please log in.
              </div>
            </div>
          </div>
        ));
        navigate("/login");
      })
      .catch(() => {});
  };

  const handleEmailValidation = (email) => {
    return isValidEmail(email);
  };

  const handlePasswordValidation = (password) => {
    return password === getValues("password");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 lg:py-0">
      <div className="w-full bg-neutral-content rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-base-100">
            Create your account
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
                placeholder="SetoKaiba"
                {...register("username", { required: true })}
              />
              {errors.username?.type === "required" && (
                <p role="alert" className="text-error mt-1 text-sm">
                  Username is required
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text text-neutral font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="seto@kaibacorp.com"
                {...register("email", { required: true, validate: handleEmailValidation })}
              />
              {errors.email?.type === "required" && (
                <p role="alert" className="text-error mt-1 text-sm">
                  Email is required
                </p>
              )}
              {errors.email?.type === "validate" && (
                <p role="alert" className="text-error mt-1 text-sm">
                  Must use a valid email
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
                <p role="alert" className="text-error mt-1 text-sm">
                  Password is required
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="label">
                <span className="label-text text-neutral font-semibold">Confirm password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                className="input input-bordered w-full"
                {...register("confirmPassword", {
                  required: true,
                  validate: handlePasswordValidation,
                })}
              />
              {errors.confirmPassword?.type === "required" && (
                <p role="alert" className="text-error mt-1 text-sm">
                  Password confirmation is required
                </p>
              )}
              {errors.confirmPassword?.type === "validate" && (
                <p role="alert" className="text-error mt-1 text-sm">
                  Passwords must match
                </p>
              )}
            </div>
            <div className="my-10" />
            <button type="submit" className="btn btn-primary btn-block">
              Sign up
            </button>
            {message && (
              <p role="alert" className="text-error mt-1">
                {message}
              </p>
            )}
            <p className="text-sm font-light text-neutral">
              Do you have an account?{" "}
              <a href="/createAccount" className="font-medium text-neutral hover:underline">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
