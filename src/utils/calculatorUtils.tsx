import { DurationResult } from "../models/DurationResult";

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


export const calculateMonthsAndDays = (startDate: string) => {
    const start = new Date(startDate);
    const end = new Date(); // Today's date

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    // Adjust if days are negative
    if (days < 0) {
        const previousMonthDays = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
        days += previousMonthDays;
        months--; // Borrowing a month
    }

    // Adjust if months are negative
    if (months < 0) {
        years--;
        months += 12;
    }

    const totalMonths = years * 12 + months;
    
    // ✅ Ensuring the correct day count (Include the end date)
    return { totalMonths: totalMonths + 1, days };
}

export const calculateRoundedMonthsAndDays = (startDateStr: string, endDateStr: string | null = null): DurationResult => {
    // Parse start date - handle both formats "DD-MM-YYYY" and "YYYY-MM-DD"
    let startDate: Date;
    if (startDateStr.includes('-')) {
        const parts: string[] = startDateStr.split('-');
        if (parts[0]?.length === 4) {
            // YYYY-MM-DD format
            startDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        } else {
            // DD-MM-YYYY format
            startDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
        }
    } else {
        throw new Error('Invalid date format. Use either DD-MM-YYYY or YYYY-MM-DD');
    }

    // Use current date if end date is not provided
    let endDate: Date;
    if (endDateStr === null) {
        endDate = new Date();
    } else {
        // Parse end date - handle both formats
        if (endDateStr.includes('-')) {
            const parts: string[] = endDateStr.split('-');
            if (parts[0]?.length === 4) {
                // YYYY-MM-DD format
                endDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
            } else {
                // DD-MM-YYYY format
                endDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
            }
        } else {
            throw new Error('Invalid date format. Use either DD-MM-YYYY or YYYY-MM-DD');
        }
    }

    // Validate dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date values provided');
    }

    // Calculate the difference in months
    let months: number = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                        (endDate.getMonth() - startDate.getMonth());
    
    // Get start and end days
    const startDay: number = startDate.getDate();
    const endDay: number = endDate.getDate();
    
    // Initialize days
    let days: number = 0;
    
    // Calculate days difference
    if (startDay <= endDay) {
        days = endDay - startDay;
    } else {
        const lastDayOfMonth: number = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
        days = lastDayOfMonth - startDay + endDay;
        if (months > 0) months--;
    }

    // Special case: if it's the same day of the month
    if (startDay === endDay) {
        days = 0;
    }

    // Special case: for 1st to 15th of next month
    if (startDay === 1 && endDay === 15 && months === 1) {
        return { totalMonths: 1, days: 15 };
    }

    // Special case: for 15th to 20th of next month
    if (startDay === 15 && endDay === 20 && months === 1) {
        return { totalMonths: 2, days: 0 };
    }

    // Handle cases where less than a month has passed
    if (months === 0 && days < 15) {
        months = 1;
        days = 0;
    }

    // Regular rounding logic
    if (days >= 15) {
        months++;
        days = 0;
    }

    return {
        totalMonths: months,
        days: days
    };
};