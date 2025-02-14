import GoldValuation from "../calculators/gold-valuation/GoldValuation";
import LoanDurationCalculator from "../calculators/loan-duration-calculator/LoanDurationCalculator";

export const calculatorTabs = [
  { tabName: "Gold Valuation", component: GoldValuation },
  { tabName: "Loan Duration", component: LoanDurationCalculator },
];
