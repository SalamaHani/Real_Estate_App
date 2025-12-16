import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Logo from "../navbar/Logo";
import Continer from "../global/Continer";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-card via-card to-muted border-t border-border/50">
      {/* Main Footer Content */}
      <Continer className="py-12 lg:py-16">
        {/* Top Section - Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Company Info */}
          <div className="space-y-4 text-center sm:text-left">
            <Logo  />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              Premier real estate services delivering exceptional results for buyers and sellers across the region.
            </p>
          </div>

          {/* Column 2: Contact Information */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-foreground flex items-center justify-center sm:justify-start gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Contact Us
            </h3>
            <address className="not-italic text-muted-foreground text-sm space-y-2">
              <p className="leading-relaxed">
                Samson Properties<br />
                6363 Walker Ln Suite 130<br />
                Alexandria, VA 22310
              </p>
              <p className="flex items-center justify-center sm:justify-start gap-2 group">
                <Phone className="w-4 h-4 text-primary" />
                <a
                  href="tel:(703) 763-0949"
                  className="hover:text-primary transition-colors group-hover:underline"
                >
                  (703) 763-0949
                </a>
              </p>
              <p className="flex items-center justify-center sm:justify-start gap-2 group">
                <Mail className="w-4 h-4 text-primary" />
                <a
                  href="mailto:Barry@BarringtonGroupFP.com"
                  className="hover:text-primary transition-colors group-hover:underline truncate"
                >
                  Barry@BarringtonGroupFP.com
                </a>
              </p>
            </address>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/listings"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Listings
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Social */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://barringtongroupfp.com/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://barringtongroupfp.com/terms-of-use/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="pt-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Follow Us</h4>
              <div className="flex gap-3 justify-center sm:justify-start">
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 lg:my-12 border-t border-border/50"></div>

        {/* Bottom Section */}
        <div className="space-y-4">
          {/* Fair Housing Disclaimer */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-muted-foreground bg-muted/30 rounded-lg p-4">
            <Image
              loading="lazy"
              width="50"
              height="25"
              src="https://barringtonteam.virtualresults.com/app/uploads/sites/barringtonteam/2024/03/footer-logo.png"
              alt="Fair Housing Logo"
              className="opacity-70"
            />
            <p className="text-center sm:text-left">
              Barrington Group Fine Properties fully supports the principles of the Fair Housing Act and the Equal Opportunity Act.
            </p>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground pt-2">
            <p className="text-center sm:text-left order-2 sm:order-1">
              © {new Date().getFullYear()} <span className="text-primary font-medium">Barrington Group</span>. All Rights Reserved.
            </p>
            <a
              href="https://virtualresults.com/learnmore/?name=The%20Barrington%20Group%20Trusts"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors order-1 sm:order-2"
            >
              Powered by Virtual Results
            </a>
          </div>
        </div>
      </Continer>
    </footer>
  );
}

export default Footer;

