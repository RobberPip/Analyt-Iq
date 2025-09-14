"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-lg">
        <CardHeader className="mt-15">
          <CardTitle className="text-3xl text-center">
            Добро пожаловать
          </CardTitle>
          <CardDescription className="text-lg text-center">
            Введите данные для входа
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Почта</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Пароль</Label>
                  <a
                    // biome-ignore lint/a11y/useValidAnchor: <explanation>
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Забыли пароль?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Вход
          </Button>
          <Separator className="my-5" />
          <Button
            variant="outline"
            onClick={() => {
              signIn("google", { redirectTo: "/" });
            }}
            className="w-12 h-12 p-2 rounded-full flex items-center justify-center"
          >
            <Image
              src="/icons/google-icon.svg"
              alt="Google"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
