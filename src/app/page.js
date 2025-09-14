import Link from "next/link";
import PostSection from "./components/PostSection";

export default function Home() {
  return (

    <main className="container  mx-auto p-8 pb-20 items-center justify-center bg-gray-900 text-white relative overflow-hidden">
      <Link href="/about" className="px-4 py-2">About</Link>
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[700px] h-[700px] rounded-full bg-red-400 opacity-25 blur-[160px]"></div>
      </div>
      <nav className="  flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-extrabold mt-9">
          Junior{" "}
          <span className="block text-red-300">FrontEnd Developer</span>
        </h1>

        <p className="text-xl font-bold mt-9 text-gray-300 max-w-2xl mx-auto">
          A junior frontend developer passionate about building clean,
          user-friendly web applications. I enjoy learning best practices for
          responsive design.
        </p>
      </nav>
      <div>
        <PostSection />
      </div>
    </main>
  );
}
