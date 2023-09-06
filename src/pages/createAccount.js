import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate  } from 'react-router-dom';

import { createAccount } from "../actions/auth";

function CreateAccount() {

  let navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onSubmit = data => {
    console.log(data);
    dispatch(createAccount(data.username, data.password))
      .then(() => {
        navigate("/profile");
        window.location.reload();
      })
      .catch(() => {});
  }
  
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-neutral-content rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-base-100">
            Create your account
          </h1>
          <form className="space-y-4 md:space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username" className='label'>
                <span className="label-text text-neutral font-semibold">Username</span>
              </label>
              <input type="text" name="username" className="input input-bordered w-full" placeholder="YugiMuto" {...register("username", { required: true })}/>
              {errors.username?.type === 'required' && <p role="alert" className='text-error mt-1'>Username is required</p>}
            </div>
            <div>
              <label htmlFor="password" className='label'>
                <span className="label-text text-neutral font-semibold">Password</span>
              </label>
              <input type="password" name="password" placeholder="••••••••" className="input input-bordered w-full" {...register("password", { required: true })}/>
              {errors.password?.type === 'required' && <p role="alert" className='text-error mt-1'>Password is required</p>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <label className="cursor-pointer label">
                  <input id="remember" aria-describedby="remember" type="checkbox" checked="checked" className="checkbox checkbox-primary mr-4" {...register("remember", { required: true })}/>
                  <span className="label-text text-neutral">Remember me</span>
                </label>
              </div>
              <a href="/recoverAccount" className="text-sm font-medium text-neutral hover:underline">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Sign in</button>
            { message && 
              <p role="alert" className='text-error mt-1'>{message}</p>
            }
            <p className="text-sm font-light text-neutral">
              Don't have an account yet? <a href="/createAccount" className="font-medium text-neutral hover:underline">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount