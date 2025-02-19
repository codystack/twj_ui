export const isSignedUp = () => {
    return !!localStorage.getItem("emailForOtp");
  };