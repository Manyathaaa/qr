"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().regex(phoneRegex, {
    message: "Please enter a valid phone number.",
  }),
});

export function RegistrationForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would send this data to your backend
    console.log(values);
    
    // Show success toast
    toast({
      title: "Registration successful!",
      description: "You've been registered for the event.",
    });
    
    // Generate a unique ID for this registration
    const registrationId = `reg_${Date.now().toString(36)}`;
    
    // Store in localStorage for demo purposes
    localStorage.setItem(
      "eventRegistration", 
      JSON.stringify({
        id: registrationId,
        ...values,
        registeredAt: new Date().toISOString(),
        checkedIn: false,
      })
    );
    
    // Redirect to success page with the registration ID
    router.push(`/success?id=${registrationId}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormDescription>
                Your name as it should appear on the event badge.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" type="email" {...field} />
              </FormControl>
              <FormDescription>
                We'll send your event details to this email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 123-4567" {...field} />
              </FormControl>
              <FormDescription>
                For event updates and emergency communications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">Register for Event</Button>
      </form>
    </Form>
  );
}