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
      <nav
        className="fixed w-full z-50 flex justify-center"
        style={{ top: "16px" }}
      >
        <div
          style={{
            width: "1153px",
            height: "62px",
            borderRadius: "18px",
            background: "rgba(10, 54, 105, 1)",
            opacity: 1,
          }}
          className="px-6 py-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Image
              src="/images/icons/text-logo.svg"
              alt="CONSO Logo"
              width={120}
              height={32}
              className="w-auto h-auto"
            />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              style={{
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                color: "rgba(254, 254, 255, 1)",
              }}
              className={`${inter.className} hover:opacity-80 transition`}
            >
              Zapboard
            </a>
            <div className="relative">
              <div
                style={{
                  width: "30px",
                  height: "13px",
                  borderRadius: "8px",
                  background: "rgba(222, 222, 222, 1)",
                  position: "absolute",
                  top: "-10px",
                  left: "80%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "8px",
                    lineHeight: "100%",
                    letterSpacing: "-1%",
                    color: "rgba(0, 0, 0, 1)",
                  }}
                  className={inter.className}
                >
                  Soon
                </span>
              </div>
              <a
                href="#"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "-1%",
                  color: "rgba(254, 254, 255, 1)",
                }}
                className={`${inter.className} hover:opacity-80 transition`}
              >
                Smart campaigns
              </a>
            </div>
            <button
              style={{
                background: "rgba(122, 168, 254, 1)",
                border: "1px solid rgba(168, 198, 255, 1)",
                boxShadow: "2px 2px 0px 0px rgba(236, 243, 255, 1)",
                borderRadius: "8px",
                fontFamily: "Solway",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                color: "rgba(254, 254, 255, 1)",
                padding: "8px 16px",
              }}
              className={solway.className}
            >
              Go to app
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative min-h-[1000px] overflow-hidden pt-20"
        style={{
          backgroundImage: "url(/images/svgs/landingpage/bg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Background decorative elements */}
        {/* Tree on the left */}
        <div className="absolute left-0 bottom-36 z-0">
          <Image
            src="/images/svgs/landingpage/tree-left.svg"
            alt="Tree decoration"
            width={250}
            height={300}
            className="w-auto h-auto"
          />
        </div>

        {/* Main screen on the right */}
        <div className="absolute right-16 bottom-36 z-0">
          <Image
            src="/images/svgs/landingpage/main-screen.svg"
            alt="Main screen illustration"
            width={400}
            height={300}
            className="w-auto h-auto"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pt-20 pb-16 text-center">
          <h1
            style={{
              fontFamily: "Solway",
              fontWeight: 700,
              fontSize: "64px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
              color: "rgba(255, 255, 255, 1)",
              WebkitTextStroke: "1px rgba(0, 0, 0, 1)",
              textShadow: "4px 4px 0px rgba(22, 63, 110, 1)",
              paddingBottom: "16px",
            }}
            className={solway.className}
          >
            Consumer Info-Fi Layer
          </h1>

          <p
            style={{
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "32px",
              letterSpacing: "-1%",
              textAlign: "center",
            }}
            className={`${inter.className} text-gray-600 max-w-3xl mx-auto mb-8`}
          >
            A unified 5D Consumer Passport from your social, gaming, creative,
            and on-chain activity. Earn ZAPs, own your footprint, and unlock
            smarter campaigns.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              style={{
                background: "rgba(225, 225, 225, 1)",
                border: "1px solid rgba(0, 56, 85, 1)",
                borderRadius: "14px",
                fontFamily: "Solway",
                fontWeight: 500,
                fontSize: "24px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                color: "rgba(29, 32, 96, 1)",
                padding: "12px 32px",
              }}
              className={solway.className}
            >
              Get Started
            </button>
            <button
              style={{
                background: "rgba(122, 168, 254, 1)",
                border: "1px solid rgba(26, 35, 52, 1)",
                boxShadow: "4px 4px 0px 0px rgba(55, 110, 174, 1)",
                borderRadius: "16px",
                fontFamily: "Solway",
                fontWeight: 500,
                fontSize: "24px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                color: "rgba(254, 254, 255, 1)",
                padding: "12px 32px",
              }}
              className={solway.className}
            >
              Mint your Passport
            </button>
          </div>
        </div>
      </section>

      {/* Main Bottom Divider */}
      <div className="relative left-0 right-0 z-20 -mt-24 -mb-30">
        <Image
          src="/images/svgs/landingpage/main-bottom.svg"
          alt="Main bottom divider"
          width={1200}
          height={180}
          className="w-full h-auto block"
        />
      </div>

      {/* Data Ownership & Monetization Section */}
      <section
        className="py-30 relative"
        style={{
          backgroundImage: "url(/images/svgs/landingpage/bg-2.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-6">
          <h2
            className={`${solway.className} text-center mb-16`}
            style={{
              fontWeight: 800,
              fontSize: "42px",
              lineHeight: "90px",
              letterSpacing: "-2%",
              color: "rgba(255, 255, 255, 1)",
              textShadow:
                "1px 1px 0px rgba(19, 19, 19, 1), 2px 2px 0px rgba(19, 19, 19, 1), 3px 3px 0px rgba(19, 19, 19, 1), 4px 4px 0px rgba(19, 19, 19, 1)",
              WebkitTextStroke: "1px rgba(19, 19, 19, 1)",
            }}
          >
            Data Ownership & Monetisation
          </h2>
          <div
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            style={{ gap: "64px" }}
          >
            {/* Consumer Graph */}
            <div className="group relative">
              {/* Cloud decoration */}
              <div className="absolute -top-15 left-4 z-10">
                <Image
                  src="/images/svgs/landingpage/cloud.svg"
                  alt="Cloud decoration"
                  width={500}
                  height={180}
                  className="w-[450px]"
                />
              </div>
              <div
                className="relative rounded-2xl p-6 hover:shadow-2xl transition-shadow flex flex-col h-86"
                style={{
                  background: "rgba(203, 225, 237, 1)",
                  border: "2.07px solid rgba(0, 0, 0, 1)",
                  boxShadow: "6.9px 6.9px 0px 0px rgba(0, 0, 0, 1)",
                }}
              >
                <div
                  className="bg-white rounded-2xl mb-4 flex items-center justify-center"
                  style={{
                    width: "423.34px",
                    height: "218.85px",
                    border: "2.21px solid rgba(0, 0, 0, 1)",
                    borderRadius: "16px",
                  }}
                >
                  <Image
                    src="/images/svgs/landingpage/card-1.svg"
                    alt="Consumer Graph"
                    width={150}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <h3
                  className={`${solway.className} text-gray-800 mb-2`}
                  style={{
                    fontWeight: 700,
                    fontSize: "32px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  Consumer Graph
                </h3>
                <p
                  className={`${inter.className} text-[rgba(97,97,97,1)]`}
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>

            {/* Smart Campaigns */}
            <div className="group relative">
              <div
                className="relative rounded-2xl p-6 hover:shadow-2xl transition-shadow flex flex-col h-86"
                style={{
                  background: "rgba(255, 204, 204, 1)",
                  border: "2.07px solid rgba(0, 0, 0, 1)",
                  boxShadow: "6.9px 6.9px 0px 0px rgba(0, 0, 0, 1)",
                }}
              >
                <div
                  className="bg-white rounded-2xl mb-4 flex items-center justify-center"
                  style={{
                    width: "423.34px",
                    height: "218.85px",
                    border: "2.21px solid rgba(0, 0, 0, 1)",
                    borderRadius: "16px",
                  }}
                >
                  <Image
                    src="/images/svgs/landingpage/card-2.svg"
                    alt="Smart Campaigns"
                    width={150}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <h3
                  className={`${solway.className} text-gray-800 mb-2`}
                  style={{
                    fontWeight: 700,
                    fontSize: "32px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  Smart Campaigns
                </h3>
                <p
                  className={`${inter.className} text-[rgba(97,97,97,1)]`}
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>

            {/* Decentralized Storage */}
            <div className="group relative">
              <div
                className="relative rounded-2xl p-6 hover:shadow-2xl transition-shadow flex flex-col h-86"
                style={{
                  background: "rgba(255, 223, 177, 1)",
                  border: "2.07px solid rgba(0, 0, 0, 1)",
                  boxShadow: "6.9px 6.9px 0px 0px rgba(0, 0, 0, 1)",
                }}
              >
                <div
                  className="bg-white rounded-2xl mb-4 flex items-center justify-center relative"
                  style={{
                    width: "423.34px",
                    height: "218.85px",
                    border: "2.21px solid rgba(0, 0, 0, 1)",
                    borderRadius: "16px",
                  }}
                >
                  <Image
                    src="/images/svgs/landingpage/card-3bg.svg"
                    alt="Decentralized Storage Background"
                    width={300}
                    height={150}
                    className="object-contain absolute"
                  />
                  <Image
                    src="/images/svgs/landingpage/card-3.svg"
                    alt="Decentralized Storage"
                    width={150}
                    height={100}
                    className="object-contain relative z-10"
                  />
                </div>
                <h3
                  className={`${solway.className} text-gray-800 mb-2`}
                  style={{
                    fontWeight: 700,
                    fontSize: "32px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  Decentralized Storage
                </h3>
                <p
                  className={`${inter.className} text-[rgba(97,97,97,1)]`}
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>

            {/* Developer API */}
            <div className="group relative">
              {/* Cloud decoration */}
              <div className="absolute -top-15 right-4 z-10">
                <Image
                  src="/images/svgs/landingpage/cloud.svg"
                  alt="Cloud decoration"
                  width={500}
                  height={180}
                  className="w-[450px]"
                />
              </div>
              <div
                className="relative rounded-2xl p-6 hover:shadow-2xl transition-shadow flex flex-col h-86"
                style={{
                  background: "rgba(204, 203, 255, 1)",
                  border: "2.07px solid rgba(0, 0, 0, 1)",
                  boxShadow: "6.9px 6.9px 0px 0px rgba(0, 0, 0, 1)",
                }}
              >
                <div
                  className="bg-white rounded-2xl mb-4 flex items-center justify-center"
                  style={{
                    width: "423.34px",
                    height: "218.85px",
                    border: "2.21px solid rgba(0, 0, 0, 1)",
                    borderRadius: "16px",
                  }}
                >
                  <Image
                    src="/images/svgs/landingpage/card-4.svg"
                    alt="Developer API"
                    width={150}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <h3
                  className={`${solway.className} text-gray-800 mb-2`}
                  style={{
                    fontWeight: 700,
                    fontSize: "32px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  Developer API
                </h3>
                <p
                  className={`${inter.className} text-[rgba(97,97,97,1)]`}
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Divider */}
      <div className="relative -mt-19 z-20">
        <Image
          src="/images/svgs/landingpage/bottom-1.svg"
          alt="Bottom divider"
          width={1200}
          height={120}
          className="w-full h-auto"
        />
      </div>

      {/* Proof of Persona Section */}
      <section className="-mt-36 pt-48 pb-32 bg-gradient-to-b from-orange-100 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Layered card effect */}
              <div
                className="absolute inset-0 rounded-2xl transform translate-x-4 translate-y-4"
                style={{
                  background: "rgba(108, 91, 194, 1)",
                  border: "3px solid rgba(19, 19, 19, 1)",
                }}
              ></div>
              <div
                className="absolute inset-0 rounded-2xl transform translate-x-2 translate-y-2"
                style={{
                  background: "rgba(175, 162, 248, 1)",
                  border: "3px solid rgba(19, 19, 19, 1)",
                }}
              ></div>
              <div
                className="relative rounded-2xl p-16 shadow-2xl min-h-[500px]"
                style={{
                  background: "rgba(208, 208, 255, 1)",
                  border: "3px solid rgba(19, 19, 19, 1)",
                }}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                  <div
                    className="rounded-lg h-96 flex items-center justify-center"
                    style={{
                      background: "rgba(208, 228, 239, 1)",
                      border: "3px solid rgba(19, 19, 19, 1)",
                    }}
                  >
                    <Image
                      src="/images/svgs/landingpage/persona.svg"
                      alt="Persona illustration"
                      width={280}
                      height={280}
                      className="w-auto h-auto max-w-full max-h-full"
                    />
                  </div>
                  <div>
                    <h2
                      className="mb-6 uppercase"
                      style={{
                        fontFamily: "Solway",
                        fontWeight: 800,
                        fontSize: "28px",
                        lineHeight: "40px",
                        letterSpacing: "-1%",
                        color: "rgba(255, 255, 255, 1)",
                        textShadow:
                          "1px 1px 0px rgba(19, 19, 19, 1), 2px 2px 0px rgba(19, 19, 19, 1), 3px 3px 0px rgba(19, 19, 19, 1), 4px 4px 0px rgba(19, 19, 19, 1)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      PROOF OF CREATOR
                    </h2>
                    <p
                      className="mb-6"
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "26px",
                        letterSpacing: "-1%",
                        color: "rgba(109, 109, 109, 1)",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    </p>
                    <button
                      className="px-6 py-3"
                      style={{
                        background: "rgba(251, 231, 244, 1)",
                        border: "2px solid rgba(19, 19, 19, 1)",
                        boxShadow: "4px 4px 0px 0px rgba(78, 64, 147, 1)",
                        borderRadius: "14px",
                        fontFamily: "Solway",
                        fontWeight: 500,
                        fontSize: "24px",
                        lineHeight: "100%",
                        letterSpacing: "-1%",
                        color: "rgba(14, 32, 58, 1)",
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="py-20 bg-gradient-to-b from-blue-100 to-blue-50"
        style={{
          borderTop: "1px solid rgba(0, 0, 0, 1)",
          borderBottom: "1px solid rgba(0, 0, 0, 1)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Layered card effect */}
              <div
                className="absolute inset-0 rounded-2xl transform translate-x-4 translate-y-4"
                style={{
                  background: "rgba(234, 135, 135, 1)",
                  border: "3px solid rgba(19, 19, 19, 1)",
                }}
              ></div>
              <div
                className="absolute inset-0 rounded-2xl transform translate-x-2 translate-y-2"
                style={{
                  background: "rgba(236, 158, 158, 1)",
                  border: "3px solid rgba(19, 19, 19, 1)",
                }}
              ></div>
              <div
                className="relative rounded-2xl p-8 shadow-2xl"
                style={{
                  background: "rgba(255, 204, 204, 1)",
                  border: "3px solid rgba(19, 19, 19, 1)",
                }}
              >
                <h2
                  className="mb-8 uppercase tracking-wider"
                  style={{
                    fontFamily: "Solway",
                    fontWeight: 800,
                    fontSize: "48px",
                    lineHeight: "52px",
                    letterSpacing: "-1%",
                    color: "rgba(255, 255, 255, 1)",
                    WebkitTextStroke: "1px rgba(0, 0, 0, 1)",
                    textShadow: "4px 4px 0px rgba(19, 19, 19, 1)",
                  }}
                >
                  FAQ
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem
                    value="item-1"
                    className="rounded-lg px-4"
                    style={{
                      background: "rgba(255, 255, 255, 1)",
                      border: "3px solid rgba(0, 0, 0, 1)",
                      boxShadow: "4px 4px 0px 0px rgba(205, 143, 143, 1)",
                    }}
                  >
                    <AccordionTrigger
                      className="text-left hover:no-underline"
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 500,
                        fontSize: "20px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      What is CONSO?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      CONSO is a Consumer Info-Fi Layer that simplifies data
                      ownership and monetization for users.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="rounded-lg px-4"
                    style={{
                      background: "rgba(255, 255, 255, 1)",
                      border: "3px solid rgba(0, 0, 0, 1)",
                      boxShadow: "4px 4px 0px 0px rgba(205, 143, 143, 1)",
                    }}
                  >
                    <AccordionTrigger
                      className="text-left hover:no-underline"
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 500,
                        fontSize: "20px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
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
                    className="rounded-lg px-4"
                    style={{
                      background: "rgba(255, 255, 255, 1)",
                      border: "3px solid rgba(0, 0, 0, 1)",
                      boxShadow: "4px 4px 0px 0px rgba(205, 143, 143, 1)",
                    }}
                  >
                    <AccordionTrigger
                      className="text-left hover:no-underline"
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 500,
                        fontSize: "20px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      Who can I integrate?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      Any developer can integrate using our comprehensive API
                      and SDK solutions.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="rounded-lg px-4"
                    style={{
                      background: "rgba(255, 255, 255, 1)",
                      border: "3px solid rgba(0, 0, 0, 1)",
                      boxShadow: "4px 4px 0px 0px rgba(205, 143, 143, 1)",
                    }}
                  >
                    <AccordionTrigger
                      className="text-left hover:no-underline"
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 500,
                        fontSize: "20px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
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
      <section
        className="py-16"
        style={{
          background: "rgba(251, 231, 244, 1)",
          borderBottom: "1px solid rgba(0, 0, 0, 1)",
        }}
      >
        <div className="container mx-auto px-6">
          <h2
            className="text-center mb-12"
            style={{
              fontFamily: "Solway",
              fontWeight: 800,
              fontSize: "48px",
              lineHeight: "52px",
              letterSpacing: "-1%",
              color: "rgba(255, 255, 255, 1)",
              WebkitTextStroke: "1px rgba(0, 0, 0, 1)",
              textShadow: "4px 4px 0px rgba(19, 19, 19, 1)",
            }}
          >
            Our Backers & Partners
          </h2>
          <div className="flex items-center justify-center">
            <div
              className="flex items-center justify-center"
              style={{
                width: "246.45px",
                height: "78.12px",
                border: "1.53px solid rgba(19, 19, 19, 1)",
                borderRadius: "12px",
                background: "white",
                opacity: 1,
              }}
            >
              <Image
                src="/images/svgs/landingpage/walrus.svg"
                alt="Walrus"
                width={200}
                height={60}
                className="w-auto h-auto max-w-full max-h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white py-6">
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/images/icons/text-logo.svg"
                alt="CONSO"
                width={180}
                height={48}
              />
            </div>

            <div className="flex items-center gap-8">
              <a
                href="#"
                className="hover:text-white transition"
                style={{
                  fontFamily: "Satoshi",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "26.67px",
                  letterSpacing: "0px",
                  color: "rgba(169, 169, 169, 1)",
                }}
              >
                Terms & Conditions
              </a>
              <a
                href="#"
                className="hover:text-white transition"
                style={{
                  fontFamily: "Satoshi",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "26.67px",
                  letterSpacing: "0px",
                  color: "rgba(169, 169, 169, 1)",
                }}
              >
                Docs
              </a>
              <a
                href="#"
                className="hover:text-white transition"
                style={{
                  fontFamily: "Satoshi",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "26.67px",
                  letterSpacing: "0px",
                  color: "rgba(169, 169, 169, 1)",
                }}
              >
                APIs
              </a>
              <a
                href="#"
                className="hover:text-white transition"
                style={{
                  fontFamily: "Satoshi",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "26.67px",
                  letterSpacing: "0px",
                  color: "rgba(169, 169, 169, 1)",
                }}
              >
                Contact Us
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a href="#" className="text-white/80 hover:text-white transition">
                <Image
                  src="/images/svgs/landingpage/x.svg"
                  alt="X"
                  width={30}
                  height={30}
                />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition">
                <Image
                  src="/images/svgs/landingpage/telegram.svg"
                  alt="Telegram"
                  width={30}
                  height={30}
                />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 px-1">
            <div
              style={{
                fontFamily: "Satoshi",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "23.11px",
                letterSpacing: "0px",
                color: "rgba(165, 165, 165, 1)",
              }}
            >
              © Copyright 2024. All Rights Reserved.
            </div>
            <div
              className="flex items-center gap-4"
              style={{
                textAlign: "right",
              }}
            >
              <a
                href="#"
                className="hover:text-white transition"
                style={{
                  fontFamily: "Satoshi",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "23.11px",
                  letterSpacing: "0px",
                  color: "rgba(165, 165, 165, 1)",
                }}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-white transition"
                style={{
                  fontFamily: "Satoshi",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "23.11px",
                  letterSpacing: "0px",
                  color: "rgba(165, 165, 165, 1)",
                }}
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
