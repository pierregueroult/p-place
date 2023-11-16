import Image from "next/image";
import IsOnline from "@/components/is-online";

export default function Home() {
  return (
    <main className="gradient-main flex-grow">
      <h1 className="text-center mt-32 text-6xl font-bold ">p/place :</h1>
      <p>
        <IsOnline />
      </p>
    </main>
  );
}
