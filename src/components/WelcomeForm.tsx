"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { saveUser } from "@/lib/leaderboard";
import { Play } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export default function WelcomeForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    saveUser(data.name);
    router.push("/game");
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Game Instructions</CardTitle>
        <CardDescription>
          Ready for a trip down memory lane? Let's see how fast you can navigate the old university registration system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc space-y-2 pl-5 mb-6 text-sm text-muted-foreground">
            <li>Follow the on-screen prompts to register for your course.</li>
            <li>A timer will start as soon as you enter your name.</li>
            <li>Complete the registration as quickly as possible to get on the leaderboard!</li>
        </ul>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Alex" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Play className="mr-2 h-4 w-4" /> Start Game
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
