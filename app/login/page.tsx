"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useNotification } from "../components/Notification";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // const { showNotification } = useNotification();
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      // showNotification(result.error, "error");
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: result.error,
      })
    } else {
      // showNotification("Login successful!", "success");
      toast({
        title: "Login Successful! ✅",
        description: "Welcome back!",
      })
      router.push("/");
    }
  };


  return (
    <div className="flex items-center justify-center py-10">
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              // className="text-neutral"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              // className="text-neutral"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <p className="text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:text-blue-600">
            Register
          </Link>
        </p>
        </div>
      </form>
      </CardContent>
    </Card>
    </div>
  );
}