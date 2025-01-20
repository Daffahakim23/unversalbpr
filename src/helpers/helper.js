export const Helper = {
    required: (value) => !!value,
    isNumber: (value) => /^\d+$/.test(value),
    isEmail: (value) => /\S+@\S+\.\S+/.test(value),
    minLength: (value, length) => value.length >= length,
    hasAlphabetical: (value) => /[a-zA-Z]/.test(value),
    hasUppercase: (value) => /[A-Z]/.test(value),
    hasNumeric: (value) => /\d/.test(value),
    hasSpecialChar: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value)
  };