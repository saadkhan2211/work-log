import otpGen from "otp-generator";

export const generateOtp = async () => {
  return await otpGen.generate(6, {
    upperCaseAlphabets: true,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });
};
