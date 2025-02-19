import Image from "next/image";
import Blog from "./blog/page";
// import styles from "./page.module.css";

export default async function Home() {
  return (
    <div className="main">
      <Blog/>
    </div>
  );
}
