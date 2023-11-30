<template class="p-4 md:p-8 ">
    <div class="w-full flex justify-end">
      <div class="flex items-center gap-2">
          <svg @click="toggleDark()" v-show="isDark" xmlns="http://www.w3.org/2000/svg" title="light mode" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 cursor-pointer fill-gray-200">
              <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
          </svg>
          <svg @click="toggleDark()" v-show="!isDark" xmlns="http://www.w3.org/2000/svg" title="dark mode" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 cursor-pointer fill-gray-800">
              <path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clip-rule="evenodd" />
          </svg>
        </div>
    </div>
    <div class="max-h-screen w-full flex justify-center items-center">
      <div class="border border-gray-400 rounded-xl shadow-md w-96 h-auto dark:bg-gray-700">
          <div class="max-w-lg mx-auto p-5">
              <div class="flex justify-center space-x-5">
                  <h2 class="leading-2 text-xl md:text-3xl dark:text-gray-400">
                    <slot name="title"></slot>
                  </h2>
              </div>
              <div class="divide-y divide-gray-200">
                <div class="py-8 text-base leading-6 space-y-4 dark:text-gray-100 text-gray-700 sm:text-lg sm:leading-7">
                    <slot name="content" ></slot>
                </div>
              </div>
          </div>  
      </div>
    </div>
</template>
<script setup>
import { useDark, useToggle } from '@vueuse/core' ;
const isDark = useDark() ;
const toggleDark = useToggle(isDark) ;
</script>