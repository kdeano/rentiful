import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const navLinks = [
  { href: '/about', text: 'About us' },
  { href: '/contact', text: 'Contact us' },
  { href: '/faq', text: 'FAQ' },
  { href: '/terms', text: 'Terms' },
  { href: '/privacy', text: 'Privacy' },
];

const socialLinks = [
  { icon: faFacebook, href: 'https://www.facebook.com/rentiful', label: 'Facebook' },
  { icon: faInstagram, href: 'https://www.instagram.com/rentiful', label: 'Instagram' },
  { icon: faTwitter, href: 'https://www.twitter.com/rentiful', label: 'Twitter' },
  { icon: faYoutube, href: 'https://www.youtube.com/rentiful', label: 'Youtube' },
  { icon: faLinkedin, href: 'https://www.linkedin.com/rentiful', label: 'Linkedin' },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4">
            <Link href="/" className="text-xl font-bold" scroll={false}>
              RENTIFUL
            </Link>
          </div>
          <nav className="mb-4">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex space-x-4 mb-4">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-label={link.label}
                className="hover:text-primary-600"
              >
                <FontAwesomeIcon icon={link.icon} className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500 flex justify-center space-x-4">
          <span>&copy; RENTIFUL. All rights reserved.</span>
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms of service</Link>
          <Link href="/cookies">Cookie policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
