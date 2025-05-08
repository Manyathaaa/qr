import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationForm } from "@/components/registration-form";

export default function RegisterPage() {
  return (
    <div className="container max-w-md py-12">
      <Card className="border-none shadow-lg bg-card/70 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Event Registration</CardTitle>
          <CardDescription>
            Enter your details below to register for the event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegistrationForm />
        </CardContent>
      </Card>
    </div>
  );
}