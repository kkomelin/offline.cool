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
  const [offlineMessage, setOfflineMessage] = useState("");

  const handleDownloadOfflineHtml = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're offline but that's Okay</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      color: #444;
      font-size: 20px;
    }
    h2 {
      background: linear-gradient(to right, #6366f1, #a855f7, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: bold;
    }
  </style>
</head>

<body style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;padding:1rem;">
  <h2 style="text-align: center;">You're offline<br /> but look what we have for you...</h2>
  <div style="max-width: 40rem;">
  ${offlineMessage}
  </div>
</body>
</html>
`;

    downloadFile("offline.html", content);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOfflineMessage(e.target.value);
  };

  const handleDone = () => {
    setSelectedIndex(0);
    setOfflineMessage("");
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} mx-auto max-w-5xl flex flex-col items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 items-center justify-center w-full">
        <Image
          // className="dark:invert"
          className="object-contain mb-2"
          src="/front-slogan.png"
          alt="Offline.cool logo"
          width={200}
          height={200}
          priority
        />

        <div className="md:mt-4">
          <p className="text-center text-2xl font-semibold text-red-500 max-w-2xl">
            Educate, entertain or convert your users to smth else with your
            own Cool offline page
          </p>
        </div>

        <TabGroup
          className="w-full mt-10"
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
        >
          <TabList className="flex justify-center space-x-2 border-b border-red-200">
            <Tab
              className={({ selected }) =>
                `${
                  selected
                    ? "bg-red-300 text-white border-red-300"
                    : "bg-white text-gray-700 hover:bg-red-50 border-red-200 border-b-0"
                } 
              px-4 py-2 rounded-t-lg border-2 font-medium focus:outline-none transition-colors`
              }
            >
              1. Content
            </Tab>
            <Tab
              className={({ selected }) =>
                `${
                  selected
                    ? "bg-red-300 text-white border-red-300"
                    : "bg-white text-gray-700 hover:bg-red-50 border-red-200 border-b-0"
                } 
              px-4 py-2 rounded-t-lg border-2 font-medium focus:outline-none transition-colors`
              }
            >
              2. Installation
            </Tab>
          </TabList>
          <TabPanels className="mt-5">
            <TabPanel className="flex flex-col gap-4">
              <div>
                <div className="text-lg py-2">
                  First, enter a piece of content you want to advertise to
                  offline users
                </div>
                <textarea
                  value={offlineMessage}
                  id="message"
                  rows={10}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-red-50 rounded-lg border border-red-300 focus:ring-red-500 focus:border-red-500 placeholder-red-400"
                  placeholder="Put it here..."
                  onChange={handleContentChange}
                ></textarea>
              </div>

              <div className="flex flex-row justify-end items-center mt-6">
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
                  Now, copy these files to your site's root directory
                </div>
                <ul className="list-disc pl-4 ml-4 text-gray-600">
                  <li className="my-2">
                    <a href="/service-worker.js" download className="underline">
                      service-worker.js
                    </a>
                  </li>
                  <li className="my-2">
                    <a
                      href="#"
                      onClick={handleDownloadOfflineHtml}
                      download
                      className="underline"
                    >
                      offline.html
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-lg py-2">
                  And finally, put this one-liner into the &lt;head&gt; of your
                  site frontpage
                </div>
                <CopyBlock
                  text={`<script>if ('serviceWorker' in navigator) { navigator.serviceWorker.register('service-worker.js'); }</script>`}
                  language="javascript"
                  showLineNumbers={false}
                  theme={dracula}
                  codeBlock
                />
              </div>

              <div className="flex flex-row justify-between items-center mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedIndex(0)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={handleDone}
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

function downloadFile(filename: string, text: string) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
