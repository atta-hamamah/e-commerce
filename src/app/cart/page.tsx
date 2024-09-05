import { Metadata } from "next";
import Cart from "@/components/Cart";
export const metadata: Metadata = {
  title: "cart products",
  description: "your cart",
}
export default function page() {
  return (<Cart />)
}
