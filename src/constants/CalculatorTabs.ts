import GoldValuation from "../features/calculators/gold-valuation/GoldValuation";
import InterestCalculator from "../features/calculators/interest-calculator/InterestCalculator";
import LoanDurationCalculator from "../features/calculators/loan-duration-calculator/LoanDurationCalculator";

export const calculatorTabs = [
  { tabName: "Loan Duration", component: LoanDurationCalculator },
  { tabName: "Gold Valuation", component: GoldValuation },
  { tabName: "Interest Calculator", component: InterestCalculator },
];
