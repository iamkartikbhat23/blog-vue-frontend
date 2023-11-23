<template class="p-4 md:p-8">
    <div class="max-h-screen w-full flex justify-center items-center">
      <div class="border border-gray-400 rounded-xl shadow-md w-96 h-auto">
          <div class="max-w-lg mx-auto p-5">
              <div class="flex justify-center space-x-5">
                  <h2 class="leading-2 text-xl md:text-3xl">
                    <slot name="title"></slot>
                  </h2>
              </div>
              <div class="divide-y divide-gray-200">
                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <slot name="content" ></slot>
                </div>
                <!-- <div class="pt-4 flex items-center space-x-4">
                    <button class="bg-purple-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create</button>
                </div> -->
              </div>
          </div>  
      </div>
    </div>
</template>