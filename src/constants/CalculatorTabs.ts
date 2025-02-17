import GoldValuation from "../calculators/gold-valuation/GoldValuation";
import InterestCalculator from "../calculators/interest-calculator/InterestCalculator";
import LoanDurationCalculator from "../calculators/loan-duration-calculator/LoanDurationCalculator";

export const calculatorTabs = [
  { tabName: "Loan Duration", component: LoanDurationCalculator },
  { tabName: "Gold Valuation", component: GoldValuation },
  { tabName: "Interest Calculator", component: InterestCalculator },
];
