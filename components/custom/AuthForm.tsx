"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
   const router = useRouter() 
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      ssn: "",
      postalCode: "",
      dateOfBirth: "",
      state: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
        //based on type logically perform the correct auth
        if(type === "sign-up"){
            const userData = {
                firstName: values.firstName!,
                lastName: values.lastName!,
                address1: values.address1!,
                city: values.city!,
                state: values.state!,
                postalCode: values.postalCode!,
                dateOfBirth: values.dateOfBirth!,
                ssn: values.ssn!,
                email: values.email,
                password: values.password
            }
            const newUser = await signUp(userData);
            setUser(newUser)

        }

        if(type === "sign-in"){
                const response = await signIn({
                    email: values.email,
                    password: values.password
                })

                if(response) router.push('/')
        }


    } catch (error) {
        console.log('eerrrr', error)
        
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer items-center flex gap-4">
          <Image
            src="/icons/logo.svg"
            height={34}
            width={34}
            alt="Logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal  text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* plaid link */}</div>
      ) : (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                      type="string"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your first name"
                      type="string"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your specific address"
                    type="string"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                    type="string"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Example: NY"
                      type="string"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Example: 11101"
                      type="string"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                      type="string"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="Example: 1234"
                      type="string"
                    />
                  </div>
                </>
              )}
              <CustomInput
                type="email"
                control={form.control}
                label={"Email"}
                placeholder={"Enter your email"}
                name="email"
              />
              <CustomInput
                type="password"
                control={form.control}
                label={"Password"}
                placeholder={"Enter your Password"}
                name="password"
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...{" "}
                    </>
                  ) : type === "sign-in" ? (
                    "Sign in"
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-2 mt-4">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </div>
      )}
    </section>
  );
};

export default AuthForm;
