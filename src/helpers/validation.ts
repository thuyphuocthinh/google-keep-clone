export const validation = (object: Record<string, any>, arr: string[]) => {
  let isValid: Boolean = true;
  const arrErrors: string[] = [];
  for (const field of arr) {
    
    if (!object[field]) {
      isValid = false;
      arrErrors.push(field);
    }
  }
  return {
    isValid,
    arrErrors,
  };
};
