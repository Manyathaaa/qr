import Link from "next/link";
import { QrCode } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t py-6 md:py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          <span className="text-sm font-medium">EventQR</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link 
            href="/privacy" 
            className="hover:text-primary transition-colors"
          >
            Privacy
          </Link>
          <Link 
            href="/terms" 
            className="hover:text-primary transition-colors"
          >
            Terms
          </Link>
          <Link 
            href="/contact" 
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EventQR. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;