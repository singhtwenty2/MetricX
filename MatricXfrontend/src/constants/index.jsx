import { ChartLine } from "lucide-react";
import { Headset } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { Globe } from "lucide-react";
import { TriangleAlert } from "lucide-react";
import { MonitorCheck } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const StarRating4_5 = () => (
  <>
    <FaStar />
    <FaStar />
    <FaStar />
    <FaStar />
    <FaStarHalfAlt />
  </>
);
const StarRating4 = () => (
  <>
    <FaStar />
    <FaStar />
    <FaStar />
    <FaStar />
    <FaStar />
  </>
);
const StarRating5 = () => (
  <>
    <FaStar />
    <FaStar />
    <FaStar />
    <FaStar />
    <FaStar />
  </>
);

export const navItems = [
  { label: "Home", href: "#" },
  { label: "Hero", href: "#Hero" },
  { label: "Features", href: "#Features" },
  { label: "Workflow", href: "#Workflow" },
  { label: "Testimonials", href: "#Testimonials" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "E-commerce Business Owner, ShopSmar",
    image: user1,
    text: "The real-time data and instant alerts have been a game-changer for our website. We were able to detect and resolve issues before they impacted our users and our business. I highly recommend this service !",
    Rating: <StarRating4 />,
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "Integrating our site with this monitoring platform was a breeze. We received actionable recommendations that helped optimize our website, and the proactive issue detection is a life-saver. ",
    Rating: <StarRating4_5 />,
  },
  {
    user: "David Johnson",
    company: "Digital Marketing Specialist",
    image: user3,
    text: "Thanks to the proactive monitoring, we avoided significant downtime. The automated response feature quickly resolved issues without us having to lift a finger. It’s an invaluable tool for keeping our site up and running smoothly.",
    Rating: <StarRating5 />,
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "The instant alerts are spot-on! We’re notified immediately whenever something goes wrong, allowing us to respond quickly. This platform has greatly improved our site’s reliability and our ability to provide a seamless user experience !",
    Rating: <StarRating4 />,
  },
  {
    user: "Michael Wilson",
    company: "Content Manager, TrendyDigital",
    image: user5,
    text: "The detailed reports and optimization recommendations have been invaluable. We’ve seen a noticeable improvement in our website’s performance and user engagement. This platform is a must-have for any serious business .",
    Rating: <StarRating5 />,
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "Proactive monitoring and automated fixes have kept our site running smoothly and prevented major downtime",
    Rating: <StarRating4_5 />,
  },
];

export const features = [
  {
    icon: <MonitorCheck />,
    text: " Real-Time Monitoring",
    description:
      "Continuously monitor your website’s uptime and performance in real-time, ensuring you're always aware of any issues as they happen.",
  },
  {
    icon: <TriangleAlert />,
    text: "Instant Alerts",
    description:
      "Receive immediate notifications via email, SMS, or Slack, so you can address problems before they impact your user.",
  },
  {
    icon: <ChartLine />,
    text: " Detailed Analytics & Reporting",
    description:
      "Access in-depth reports on uptime, response times, and performance metrics, helping you optimize your website’s reliability.",
  },
  {
    icon: <Headset />,
    text: "24/7 Support",
    description:
      "Access 24/7 expert support from our dedicated team, always prepared to assist you with personalized solutions and guidance.",
  },
  {
    icon: <ShieldCheck />,
    text: "Advanced Security ",
    description:
      "Ensure your website's security with 24/7 monitoring for potential threats, including DDoS attacks, malware, and unauthorized access.",
  },
  {
    icon: <Globe />,
    text: "Global Monitoring Locations",
    description:
      "Monitor your website’s performance from multiple locations around the world, ensuring it’s accessible to users everywhere.",
  },
];

export const checklistItems = [
  {
    title: "Setup and Integration",
    description:
      "Easily integrate your website with our platform and start monitoring instantly.",
  },
  {
    title: " Real-Time Data Collection",
    description:
      "Continuously gather real-time data to track your website's uptime and performance.",
  },
  {
    title: "Proactive Issue Detection",
    description:
      "Detect potential issues early to prevent them from affecting your users.",
  },
  // {
  //   title: "Detailed Reporting and Insights",
  //   description:
  //     "Access in-depth reports and insights to analyze your website’s performance.",
  // },
  {
    title: "Optimization Recommendations",
    description:
      "Get actionable recommendations to enhance your website’s speed and efficiency",
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
