import { reactive } from "@vue/reactivity";
import useValidators from './validators'
const errors = reactive({});

export default function useFormValidation() {
    const { isEmpty, minLength, isEmail } = useValidators();
    const validateNameField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 4)
    }
    const validateEmailField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue)
    }
    const validatePasswordField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 8)
    }
    const validateConfirmPasswordField = (fieldName, fieldValue, password) => {
        errors[fieldName] = fieldValue!==password ? 'not matching with password' : '' ;
    }
    return { errors, validateNameField, validateEmailField, validatePasswordField, validateConfirmPasswordField  }
}