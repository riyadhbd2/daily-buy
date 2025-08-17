"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodSchema } from "@/lib/zodSchema";
import Logo from "@/public/assets/images/logo-black.png";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
// import { class } from '../../../../node_modules/zod/src/v4/core/function';
import ButtonLoading from "@/components/Application/ButtonLoading";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { z } from "zod";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(false);

  // toggle password visibility
  const formSchema = zodSchema
    .pick({
      email: true,
    })
    .extend({
      password: z
        .string()
        .min("3", "Password must be at least 3 characters long"),
    });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //   form handler
  const handleLoginSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Card className="w-[400px]">
      <CardContent>
        <div className="flex justify-center">
          <Image
            src={Logo}
            alt="logo"
            width={Logo.width}
            height={Logo.height}
            className="max-w-[150px]"
          />
        </div>
        <div className="text-center ">
          <h1 className="text-3xl font-semibold">Login Into Account</h1>
          <p>Login into your account by ffilling out the from below</p>
        </div>
        <div className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            type={isTypePassword ? "text" : "password"}
                            placeholder="********"
                            {...field}
                            className="pr-10" // add right padding so text doesn't overlap button
                          />
                          <button
                            type="button"
                            onClick={() => setIsTypePassword((prev) => !prev)}
                            className="absolute right-2 top-2 cursor-pointer"
                          >
                            {isTypePassword ? <FaRegEye /> : <FaRegEyeSlash />}
                          </button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Login"
                  className="w-full cursor-pointer"
                />
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
