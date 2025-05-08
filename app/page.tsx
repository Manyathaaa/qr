import { ArrowRight, Calendar, QrCode, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Seamless Event Registration with QR Codes
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Streamline your event check-ins with our modern QR code system. Register once, attend effortlessly.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="px-8">
                  <Link href="/register">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px]">
                <Image
                  src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg"
                  alt="Event Registration"
                  fill
                  className="object-cover rounded-lg shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our QR system makes event registration simple, secure, and seamless.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 pt-12">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Register
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Fill out a simple form with your details to register for the event.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  Get Your QR Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Receive your unique QR code instantly after successful registration.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Attend Event
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Present your QR code at the event for a quick and easy check-in.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Join?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Register now and be part of our amazing event. It only takes a minute!
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/register">Register Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}