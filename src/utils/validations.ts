export const RULES = {
  required: (val: string) => !!val || 'Field is required',
  minLength: (length: number) => (val: string) =>
    val.length >= length || `Min length is ${length}`,
  maxLength: (length: number) => (val: string) =>
    val.length <= length || `Max length is ${length}`,
  email: (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email address',
  sameAs: (comparison: string, errorMessage: string) => (val: string) =>
    val === comparison || errorMessage,
};
