import { Metadata } from "next";
import Favorites from "@/components/Favorites";
export const metadata: Metadata = {
  title: "best products",
  description: "rated more than 4.8",
}
export default function page() {
  return (<Favorites />)
}
