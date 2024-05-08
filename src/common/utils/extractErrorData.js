export const extractValidationData = (resultValidation) => {
    let errorMessages;
    let data;
    const hasError = !resultValidation.success;
  
    if(hasError) errorMessages = JSON.parse(resultValidation.error.message);
    if(!hasError) data = resultValidation.data
  
    return {
      hasError,
      errorMessages,
      data
    }
  }