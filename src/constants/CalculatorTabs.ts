import GoldValuation from '../features/calculators/gold-valuation/GoldValuation';
import InterestCalculator from '../features/calculators/interest-calculator/InterestCalculator';
import LoanDurationCalculator from '../features/calculators/loan-duration-calculator/LoanDurationCalculator';
import WholesaleValueCalculator from '../features/calculators/wholesale-value-calculator/WholesaleValueCalculator';

export const calculatorTabs = [
  { tabName: 'Wholesale Value', component: WholesaleValueCalculator },
  { tabName: 'Loan Duration', component: LoanDurationCalculator },
  { tabName: 'Gold Valuation', component: GoldValuation },
  { tabName: 'Interest Calculator', component: InterestCalculator },
];
