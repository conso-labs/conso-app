import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { solway, inter } from "./layout";
import HeadingText from "@/components/common/HeadingText";
import Text from "@/components/common/Text";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#1e3a5f]/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <span className="text-[#1e3a5f] font-bold text-sm">C</span>
            </div>
            <span className="text-white font-bold text-xl">CONSO</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-white/90 hover:text-white transition text-sm"
            >
              Features
            </a>
            <a
              href="#"
              className="text-white/90 hover:text-white transition text-sm"
            >
              Smart Campaign
            </a>
            <a
              href="#"
              className="text-white/90 hover:text-white transition text-sm"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-white/90 hover:text-white transition text-sm"
            >
              API
            </a>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-full">
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[600px] bg-gradient-to-b from-sky-200 to-sky-100 overflow-hidden pt-20">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          {/* Clouds */}
          <div className="absolute top-20 left-10 w-32 h-16 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-24 left-20 w-24 h-12 bg-white rounded-full opacity-70"></div>
          <div className="absolute top-16 right-32 w-40 h-20 bg-white rounded-full opacity-75"></div>
          <div className="absolute top-20 right-40 w-28 h-14 bg-white rounded-full opacity-65"></div>

          {/* Mountains */}
          <div className="absolute bottom-32 left-0 w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[200px] border-b-[#5a8bb8] opacity-40"></div>
          <div className="absolute bottom-32 left-20 w-0 h-0 border-l-[120px] border-l-transparent border-r-[120px] border-r-transparent border-b-[160px] border-b-[#7aa8cf] opacity-50"></div>
          <div className="absolute bottom-32 right-0 w-0 h-0 border-l-[180px] border-l-transparent border-r-[180px] border-r-transparent border-b-[220px] border-b-[#6b9dc3] opacity-45"></div>

          {/* Snowman */}
          <div className="absolute bottom-36 left-16">
            <div className="relative">
              <div className="w-16 h-16 bg-white rounded-full border-2 border-gray-200"></div>
              <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-200 absolute -top-10 left-2"></div>
              <div className="w-2 h-2 bg-black rounded-full absolute -top-8 left-5"></div>
              <div className="w-2 h-2 bg-black rounded-full absolute -top-8 left-9"></div>
              <div className="w-4 h-1 bg-orange-500 absolute -top-6 left-6"></div>
            </div>
          </div>

          {/* Tree */}
          <div className="absolute bottom-40 left-2">
            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[60px] border-b-[#2d5a3d]"></div>
            <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[70px] border-b-[#1f4029] absolute -top-10 -left-1.5"></div>
            <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[80px] border-b-[#234a31] absolute -top-16 -left-2.5"></div>
          </div>
        </div>

        {/* Social Icons Floating */}
        <div
          className="absolute top-40 right-[20%] w-12 h-12 bg-[#1e3a5f] rounded-full flex items-center justify-center shadow-lg animate-bounce"
          style={{ animationDelay: "0s" }}
        >
          <span className="text-white text-xl">💬</span>
        </div>
        <div
          className="absolute top-60 right-[35%] w-10 h-10 bg-[#0088cc] rounded-full flex items-center justify-center shadow-lg animate-bounce"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="text-white text-lg">✈️</span>
        </div>
        <div
          className="absolute top-52 right-[25%] w-11 h-11 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="text-white text-lg">🌐</span>
        </div>
        <div
          className="absolute top-48 right-[45%] w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg animate-bounce"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="text-white text-xl">🎮</span>
        </div>
        <div
          className="absolute top-56 right-[15%] w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
          style={{ animationDelay: "0.8s" }}
        >
          <span className="text-white text-lg">▶️</span>
        </div>
        <div
          className="absolute top-64 right-[55%] w-11 h-11 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-white text-lg">💬</span>
        </div>
        <div
          className="absolute top-60 right-[10%] w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
          style={{ animationDelay: "1.2s" }}
        >
          <span className="text-white text-xl">🔗</span>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pt-24 pb-16 text-center">
          <HeadingText text="Consumer Info-Fi Layer" className="text-7xl" />

          <Text
            text="Consumer info-fi simplifies to get started. Extra layer of bits nails Sats more blah Lorem Ispum bananas blubboon blah"
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          />
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg rounded-lg shadow-sm"
            >
              Get Started
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-lg shadow-lg">
              Run your plugsign
            </Button>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16"
          >
            <path
              d="M0,60 C300,90 600,30 900,60 C1050,75 1200,60 1200,60 L1200,120 L0,120 Z"
              fill="white"
              opacity="0.8"
            ></path>
            <path
              d="M0,70 C300,100 600,40 900,70 C1050,85 1200,70 1200,70 L1200,120 L0,120 Z"
              fill="white"
              opacity="0.6"
            ></path>
            <path
              d="M0,80 C300,110 600,50 900,80 C1050,95 1200,80 1200,80 L1200,120 L0,120 Z"
              fill="white"
            ></path>
          </svg>
        </div>
      </section>

      {/* Data Ownership & Monetization Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1e3a5f] mb-16">
            Data Ownership & Monetization
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Consumer Graph */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-red-300 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
              <div className="relative bg-gradient-to-br from-red-100 to-red-200 rounded-2xl p-6 border-4 border-red-300 hover:shadow-2xl transition-shadow">
                <div className="bg-gray-200 rounded-lg h-40 mb-4"></div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Consumer Graph
                </h3>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>

            {/* Smart Campaigns */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
              <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 border-4 border-blue-300 hover:shadow-2xl transition-shadow">
                <div className="bg-gray-200 rounded-lg h-40 mb-4"></div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Smart Campaigns
                </h3>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>

            {/* Decentralized Storage */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
              <div className="relative bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-6 border-4 border-yellow-300 hover:shadow-2xl transition-shadow">
                <div className="bg-gray-200 rounded-lg h-40 mb-4"></div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Decentralized Storage
                </h3>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>

            {/* Developer API */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
              <div className="relative bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 border-4 border-purple-300 hover:shadow-2xl transition-shadow">
                <div className="bg-gray-200 rounded-lg h-40 mb-4"></div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Developer API
                </h3>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Icicles Divider */}
      <div className="relative h-16 bg-blue-50">
        <div className="absolute top-0 left-0 right-0 flex justify-around">
          {[...Array(20)].map((_, i) => {
            const height = 20 + (i % 5) * 8;
            const translateY = (i % 3) * 3;
            return (
              <div
                key={i}
                className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[40px] border-t-blue-100 opacity-70"
                style={{
                  height: `${height}px`,
                  transform: `translateY(-${translateY}px)`,
                }}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Proof of Persona Section */}
      <section className="py-20 bg-gradient-to-b from-orange-100 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Layered card effect */}
              <div className="absolute inset-0 bg-blue-400 rounded-2xl transform translate-x-4 translate-y-4"></div>
              <div className="absolute inset-0 bg-blue-500 rounded-2xl transform translate-x-2 translate-y-2"></div>
              <div className="relative bg-gradient-to-br from-blue-100 to-purple-200 rounded-2xl p-12 border-4 border-blue-600 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="bg-gray-200 rounded-lg h-64"></div>
                  <div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-6 uppercase tracking-wider">
                      PROOF OF
                      <br />
                      PERSONA
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Decentrally store encrypted bundles of various online
                      unique person identities. The data can be shared only once
                      it will allow verification without personal info except it
                      when users want to share.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-blue-100 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Layered card effect */}
              <div className="absolute inset-0 bg-red-300 rounded-2xl transform translate-x-4 translate-y-4"></div>
              <div className="absolute inset-0 bg-red-400 rounded-2xl transform translate-x-2 translate-y-2"></div>
              <div className="relative bg-gradient-to-br from-pink-100 to-red-200 rounded-2xl p-8 border-4 border-red-400 shadow-2xl">
                <h2 className="text-4xl font-bold text-gray-800 mb-8 uppercase tracking-wider">
                  FAQ
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem
                    value="item-1"
                    className="bg-white/50 rounded-lg border-2 border-gray-300 px-4"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-800 hover:no-underline">
                      What is CONSO?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      CONSO is a Consumer Info-Fi Layer that simplifies data
                      ownership and monetization for users.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="bg-white/50 rounded-lg border-2 border-gray-300 px-4"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-800 hover:no-underline">
                      What Problems does it Solve
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      It solves data privacy, ownership, and monetization
                      challenges by giving users control over their personal
                      information.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="bg-white/50 rounded-lg border-2 border-gray-300 px-4"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-800 hover:no-underline">
                      Who can I integrate?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      Any developer can integrate using our comprehensive API
                      and SDK solutions.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="bg-white/50 rounded-lg border-2 border-gray-300 px-4"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-800 hover:no-underline">
                      What are Smart Campaigns?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      Smart Campaigns are AI-powered marketing tools that help
                      businesses reach their target audience effectively while
                      respecting user privacy.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Backers & Partners Section */}
      <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#1e3a5f] mb-12">
            Our Backers & Partners
          </h2>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border-2 border-blue-200 shadow-sm">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              <span className="font-bold text-gray-800">WALRUS</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border-2 border-blue-200 shadow-sm">
              <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              <span className="font-bold text-gray-800">vana</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border-2 border-green-200 shadow-sm">
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              <span className="font-bold text-gray-800">HoloHive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
                <span className="text-[#1e3a5f] font-bold">C</span>
              </div>
              <span className="font-bold text-2xl">CONSO</span>
            </div>
            <div className="flex items-center gap-8">
              <a
                href="#"
                className="text-white/80 hover:text-white transition text-sm"
              >
                About & Investors
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition text-sm"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition text-sm"
              >
                API
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition text-sm"
              >
                Contact us
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/80 hover:text-white transition">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white/80 hover:text-white transition">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
