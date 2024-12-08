import React from "react";

export default function ShareLink({ isShareLinkOpen, setIsShareLinkOpen }) {
  //console.log("isShareLinkOpen:", isShareLinkOpen);

  return (
    <div>
      <div
        id="crud-modal"
        tabindex="-1"
        aria-hidden="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        class="animate__animated animate__fadeIn flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative p-4 w-full max-w-lg max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
            <div class="flex items-center justify-between p-4 md:p-5">
              <h3 class="text-lg text-gray-500 dark:text-gray-400">
                Share course
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white"
                data-modal-toggle="course-modal"
                onClick={() => setIsShareLinkOpen(false)}
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div class="px-4 pb-4 md:px-5 md:pb-5">
              <label
                for="course-url"
                class="text-sm font-medium text-gray-900 dark:text-white mb-2 block"
              >
                Share the course link below with your friends:
              </label>
              <div class="relative mb-4">
                <input
                  id="course-url"
                  type="text"
                  class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value="https://flowbite.com/docs/components/alerts/"
                  disabled
                  readonly
                />
                <button
                  data-copy-to-clipboard-target="course-url"
                  data-tooltip-target="tooltip-course-url"
                  class="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
                >
                  <span id="default-icon-course-url">
                    <svg
                      class="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                  </span>
                  <span
                    id="success-icon-course-url"
                    class="hidden inline-flex items-center"
                  >
                    <svg
                      class="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id="tooltip-course-url"
                  role="tooltip"
                  class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                >
                  <span id="default-tooltip-message-course-url">
                    Copy to clipboard
                  </span>
                  <span id="success-tooltip-message-course-url" class="hidden">
                    Copied!
                  </span>
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
              <button
                type="button"
                data-modal-hide="course-modal"
                class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => setIsShareLinkOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
