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
      // English
      en: {
        translation: {
          // Login Page
          loginPage: {
            loginText: "Sign in",
            phoneNumber: "Phone Number",
            sendOtp: "Send OTP",
            or: "or",
            SignInEmail: "Sign in with email",
            error: {
              phoneRequired: "Phone number is required",
              phoneLength: "Phone number must be exactly 10 digits"
            }
          },

          // Email Page
          emailPage: {
            emalLoginText: "Sign in",
            Email: "Email",
            sendOtp: "Send OTP",
            or: "or",
            SignInPhone: "Sign in with Phone Number",
            error: {
              emailRequired: "Email is required",
              emailValidate: "Invalid email format"
            }
          },

          // Otp Page
          OtpPage: {
            OtpText: "Sign in",
            otp: "Otp",
            resendOtp: "Resend OTP",
            verifyOtp: "Verify",
            or: "or",
            error: {
              otpRequired: "OTP is required",
              otpLength: "Invalid OTP",
            }
          },

          // Breadcrums
          menuItems: {
            dashboard: "Dashboard",
            kalam: "Kalams",
            customer: "Customers",
            settings: "Settings",
            calculator: "Calculators"
          },

          // Kalam 
          kalamPage: {
            sr: "Sr",
            id: "ID",
            customer: "Customer",
            kalam: "Kalam",
            startDate: "Start Date",
            loanAmt: "Loan Amt",
            amtDue: "Amt Due",
            customerROI: "Customer ROI",
            merchant: "Merchant",
            todayValue: "Today's Value",
            validity: "Validity",
            viewProfile: "View Profile"
          },

          // Customer
          customerPage: {
            sr: "Sr",
            id: "ID",
            name: "Name",
            contact: "Contact",
            address: "Address",
            validity: "Validity",
            viewProfile: "View Profile"
          },

          // Kalam details
          kalamDetailsPage: {
            kalam: {
              itemName: "Item name",
              materialType: "Material type",
              goldRate: "Gold rate",
              grossWeight: "Gross weight",
              netWeight: "Net weight",
              purity: "Purity",
              quantity: "Quantity",
            },
            Loan: {
              loanStartDate: "Loan start date",
              customerAmt: "Customer amount",
              customerROI: "Customer ROI",
              dukandarAmt: "Dukandar amount",
              dukandarROI: "Dukandar ROI",
              totalAmt: "Total amount",
              validity: "Validity"
            }
          }
        }
      },

      // Marathi
      mr: {
        translation: {
          // Login Page
          loginPage: {
            loginText: "साइन इन करा",
            phoneNumber: "फोन नंबर",
            sendOtp: "Otp पाठवा",
            or: "किंवा",
            SignInEmail: "ईमेलसह साइन इन करा",
            error: {
              phoneRequired: "फोन नंबर आवश्यक आहे",
              phoneLength: "फोन नंबर अगदी १० अंकांचा असावा."
            }
          },

          // Email Page
          emailPage: {
            emalLoginText: "साइन इन करा",
            Email: "ईमेल",
            sendOtp: "Otp पाठवा",
            or: "किंवा",
            SignInPhone: "फोन नंबर वापरून साइन इन करा",
            error: {
              emailRequired: "ईमेल आवश्यक आहे",
              emailValidate: "अवैध ईमेल स्वरूप"
            }
          },

          // Otp Page
          OtpPage: {
            OtpText: "साइन इन करा",
            otp: "Otp",
            resendOtp: "ओटीपी पुन्हा पाठवा",
            verifyOtp: "पडताळणी करा",
            or: "किंवा",
            error: {
              otpRequired: "OTP आवश्यक आहे",
              otpLength: "अवैध OTP"
            }
          },

          // Breadcrums 
          menuItems: {
            dashboard: "डॅशबोर्ड",
            kalam: "कलम ",
            customer: "ग्राहक",
            settings: "सेटिंग्ज",
            calculator: "कॅल्क्युलेटर"
          },

          // Kalam 
          kalamPage: {
            sr: "Sr",
            id: "ID",
            customer: "ग्राहक",
            kalam: "कलम",
            startDate: "प्रारंभ तारीख",
            loanAmt: "कर्जाची रक्कम",
            amtDue: "देय रक्कम",
            customerROI: "ग्राहक व्याज दर",
            merchant: "व्यापारी",
            todayValue: "आजचे मूल्य",
            validity: "वैधता",
            viewProfile: "प्रोफाइल पहा"
          },

          // Customer
          customerPage: {
            sr: "Sr",
            id: "ID",
            name: "नाव",
            contact: "संपर्क",
            address: "पत्ता",
            validity: "वैधता",
            viewProfile: "प्रोफाइल पहा"
          },

          // Kalam Details
          kalamDetailsPage: {
            kalam: {
              itemName: "वस्तूचे नाव",
              materialType: "साहित्य प्रकार",
              goldRate: "सोन्याचा दर",
              grossWeight: "एकूण वजन",
              netWeight: "निव्वळ वजन",
              purity: "शुद्धता",
              quantity: "प्रमाण",
            },
            Loan: {
              loanStartDate: "कर्ज सुरू होण्याची तारीख",
              customerAmt: "ग्राहकाची रक्कम",
             customerROI: "ग्राहक व्याज दर",
              dukandarAmt: "दुकानदार रक्कम ",
              dukandarROI: "दुकानदार व्याज दर",
              totalAmt: "पूर्ण रकम ",
              validity: "वैधता",
            }
            
          }
        }
      }
    }
  });

export default i18n;
