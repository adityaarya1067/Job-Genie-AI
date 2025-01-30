import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "./dashboard/_components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="main-container relative bg-black w-screen h-screen overflow-hidden">
        <div className="blur-circle1 absolute left-[10%] top-[20%] w-[200px] h-[200px] bg-gradient-to-b from-white to-pink rounded-full blur-[120px]"></div>

        {/* Start Landing Page */}
        <div className="landing-page">
          <Header />

          <div className="flex justify-center items-center p-8">
            <div className=" info  mt-20 md:text-left text-center mb-4 md:mb-0">
              <h1 className="text-[44px] text-gray-400 mb-3">
                Prepare for Your Next Interview
              </h1>
              <p className="text-[15px] leading-[] text-gray-400 mb-3">
                Practice with mock interviews and receive detailed feedback to
                understand where you stand.
              </p>
              <Link href={"/dashboard"}>
                <Button className="mt-4 px-6 py-6 bg-orangeCustom text-black rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300"
>
                  Get Started
                </Button>
              </Link>
            </div>

            <video
              className="w-[50%] h-[50%] object-contain"
              controls
              autoPlay
              loop
              muted
              poster="ai/public/video1-thumbnail.jpg"
            >
              <source src="/video1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        {/* End Landing Page */}
      </div>
    </div>
  );
}
