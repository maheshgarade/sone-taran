import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "mr",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translation: {
          loginPage: {
            loginText: "Sign in",
            phoneNumber: "Phone Number",
            sendOtp: "Send OTP",
            or: "or",
            SignInEmail: "Sign in with email",
          },
          OtpPage: {
            OtpText: "Sign in",
            otp: "Otp",
            sendOtp: "Otp",
            or: "किंवा",
            SignInEmail: "ईमेलसह साइन इन करा",
          }
        }
      },
      mr: {
        translation: {
          loginPage: {
            loginText: "साइन इन करा",
            phoneNumber: "फोन नंबर",
            sendOtp: "Otp पाठवा",
            or: "किंवा",
            SignInEmail: "ईमेलसह साइन इन करा",
          },
          OtpPage: {
            OtpText: "साइन इन करा",
            otp: "Otp",
            sendOtp: "Otp पाठवा",
            or: "किंवा",
            SignInEmail: "ईमेलसह साइन इन करा",
          }
        }
      }
    }
  });

export default i18n;
