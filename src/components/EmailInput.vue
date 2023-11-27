
    <template>
        <div class="flex flex-col items-start">
            <LabelText :labelText="'Email Address'" />
            <input 
                type="text" 
                class="px-4 py-2 border focus:ring-gray-500 focus:border-purple-400 focus:shadow-sm focus:shadow-purple-400 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 dark:text-gray-100 dark:bg-slate-600" 
                :class="errors.emailAddress ? 'border-red-500' : ''"
                placeholder="Enter your email address"
                autocomplete="off"
                v-model="emailInput"
                @keyup="validateEmail"
                @blur="validateEmail"
                @input="$emit('update:modelValue', $event.target.value)"
            />
            <div class="p-2 text-sm text-red-500" v-if="errors.emailAddress">
            {{ errors.emailAddress }}
            </div>
        </div>
</template>
<script setup>
    import { ref } from "vue";
    import LabelText from "./Label.vue";
    import useFormValidation from "../modules/useFormValidation";
    let emailInput = ref("");
    const { validateEmailField, errors } = useFormValidation();
    const validateEmail = () => {
        validateEmailField("emailAddress", emailInput.value);
    };
</script>