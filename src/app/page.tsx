"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function HomePage() {
  const { setTheme } = useTheme()
  return (
    <main>
      <h1>Welcome to the public page!</h1>
      <p>Это обычная стартовая страница Next.js</p>
      <Button onClick={() => setTheme("dark")}>dark</Button>
      <Button onClick={() => setTheme("light")}>light</Button>
    </main >
  );
}
