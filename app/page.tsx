import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <p>
      <Link href={"/dashboard"} className="underline hover:text-blue-500">
        goto dashboard
      </Link>
    </p>
  );
}
