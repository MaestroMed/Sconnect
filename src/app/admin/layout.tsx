import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration | S Connect France",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}




