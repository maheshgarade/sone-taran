export const calculateAnnualCompoundInterest = (principal: number, annualRate: number, totalMonths: number, totalDays: number) => {
    const years = Math.floor(totalMonths / 12); // Extract full years
    const months = totalMonths % 12; // Extract remaining months
    const rate = annualRate / 100;
    
    let amount = principal;

    // Calculate compound interest for each full year
    for (let i = 0; i < years; i++) {
        const interest = amount * rate; // Interest for the year
        amount += interest; // Add interest to the principal
    }

    // Calculate simple interest for the remaining months
    if (months > 0) {
        const monthlyRate = rate / 12; // Monthly rate
        const interestForMonths = amount * monthlyRate * months; // Simple interest for remaining months
        amount += interestForMonths; // Add interest for the remaining months
    }

    // Calculate simple interest for the remaining days
    if (totalDays > 0) {
        const dailyRate = rate / 365; // Daily rate
        const interestForDays = amount * dailyRate * totalDays; // Simple interest for remaining days
        amount += interestForDays; // Add interest for the remaining days
    }

    return Math.round(amount);
}

// // Example usage
// let customerLoan = 5000;  // Principal
// let annualROI = 36;       // Annual ROI in % (compounded annually)
// let totalMonths = 47;     // Duration in months
// let totalDays = 15;

// let customerDue = calculateAnnualCompoundInterest(customerLoan, annualROI, totalMonths, totalDays);
// console.log("Customer Due:", customerDue);


export const interestBreakdown = (principal: number, annualRate: number, totalMonths: number, totalDays: number) => {
    const years = Math.floor(totalMonths / 12); // Extract full years
    const months = totalMonths % 12; // Extract remaining months
    const rate = annualRate / 100;

    let amount = principal;
    const breakdown = [];

    // Calculate compound interest for each full year
    for (let i = 1; i <= years; i++) {
        const interest = amount * rate; // Interest for the year
        const total = amount + interest; // New principal for next year
        
        breakdown.push({
            duration: i,
            unit: "year",
            principal: Math.round(amount),
            interest: Math.round(interest),
            total: Math.round(total),
        });

        amount = total; // Update principal for next year
    }

    // Calculate simple interest for the remaining months
    if (months > 0) {
        const monthlyRate = rate / 12; // Monthly rate
        const interestForMonths = amount * monthlyRate * months; // Simple interest for remaining months
        const total = amount + interestForMonths;

        breakdown.push({
            duration: months,
            unit: "month",
            principal: Math.round(amount),
            interest: Math.round(interestForMonths),
            total: Math.round(total),
        });

        amount = total; // Update principal for remaining days
    }

    // Calculate simple interest for the remaining days
    if (totalDays > 0) {
        const dailyRate = rate / 365; // Daily rate
        const interestForDays = amount * dailyRate * totalDays; // Simple interest for remaining days
        const total = amount + interestForDays;

        breakdown.push({
            duration: totalDays,
            unit: "days",
            principal: Math.round(amount),
            interest: Math.round(interestForDays),
            total: Math.round(total),
        });

        amount = total; // Final amount
    }

    return breakdown;
}

// // Example usage
// let customerLoan = 5000;  // Principal
// let annualROI = 36;       // Annual ROI in % (compounded annually)
// let totalMonths = 47;     // Duration in months
// let totalDays = 15;       // Additional days

// let breakdown = interestBreakdown(customerLoan, annualROI, totalMonths, totalDays);
// console.log(breakdown);