import { Metadata } from "next";
import Cart from "@/components/Cart";
export const metadata: Metadata = {
  title: "best products",
  description: "rated more than 4.8",
}
export default function page() {
  return (<Cart />)
}
