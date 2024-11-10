import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import localFont from "next/font/local";
import Image from "next/image";
import { useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} mx-auto max-w-5xl flex flex-col items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 items-center justify-center w-full">
        <Image
          // className="dark:invert"
          className="object-contain mb-10"
          src="/front-slogan.png"
          alt="Offline.cool logo"
          width={300}
          height={300}
          priority
        />

        <TabGroup
          className="w-full"
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
        >
          <TabList className="flex justify-center space-x-2 border-b border-gray-200">
            <Tab
              className={({ selected }) =>
                `${
                  selected
                    ? "bg-red-300 text-white border-red-300"
                    : "bg-white text-gray-700 hover:bg-red-50 border-gray-300"
                } 
              px-4 py-2 rounded-t-lg border-2 font-medium focus:outline-none transition-colors
              ${selected ? "-mb-[2px]" : ""}`
              }
            >
              1. Content
            </Tab>
            <Tab
              className={({ selected }) =>
                `${
                  selected
                    ? "bg-red-300 text-white border-red-300"
                    : "bg-white text-gray-700 hover:bg-red-50 border-gray-300"
                } 
              px-4 py-2 rounded-t-lg border-2 font-medium focus:outline-none transition-colors
              ${selected ? "-mb-[2px]" : ""}`
              }
            >
              2. Integration
            </Tab>
          </TabList>
          <TabPanels className="mt-5">
            <TabPanel className="flex flex-col gap-4">
              <div>
                <div className="text-lg py-2">
                  Enter a piece of content you want to advertise to offline
                  users
                </div>
                <textarea
                  id="message"
                  rows={10}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  placeholder="Write it here..."
                ></textarea>
              </div>

              <div className="flex flex-row justify-end items-center">
                <button
                  type="button"
                  onClick={() => setSelectedIndex(1)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </TabPanel>
            <TabPanel className="flex flex-col gap-4">
              <div>
                <div className="text-lg py-2">
                  1. Copy this file to your site's root directory
                </div>
                <a href="/service-worker.js" download>
                  service-worker.js
                </a>
              </div>
              <div>
                <div className="text-lg py-2">
                  3. Put this one-liner into the &lt;head&gt; of your site
                  frontpage
                </div>
                <CopyBlock
                  text={`<script>if ('serviceWorker' in navigator) { navigator.serviceWorker.register('service-worker.js'); }</script>`}
                  language="javascript"
                  showLineNumbers={false}
                  theme={dracula}
                  codeBlock
                />
              </div>

              <div className="flex flex-row justify-between items-center">
                <button
                  type="button"
                  onClick={() => setSelectedIndex(0)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(0)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  That's it!
                </button>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </main>
    </div>
  );
}
