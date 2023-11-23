<template>
    <GuestLayout>
      <template v-slot:content>
        <div class="flex flex-col gap-3 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#22c55e" class="w-36 h-36">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            <div class="text-2xl">Registration Success</div>
            <Button :class="'w-full'">
                <RouterLink :to="{ name: 'login' }" class="text-white hover:text-white">
                    Login  
                </RouterLink>   
            </Button>
        </div>
      </template>
    </GuestLayout>
</template>
<script setup>
import GuestLayout from '../layouts/GuestLayout.vue';
import Button from '../components/Button.vue';
</script>