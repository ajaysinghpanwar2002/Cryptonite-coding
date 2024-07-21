export const formatINR = (number: any) => {
  if (number >= 1e7) { // For Crore
    return `${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(number / 1e7)} Crore`;
  } else if (number >= 1e5) { // For Lakh
    return `${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number / 1e5)} Lakh`;
  } else {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number);
  }
};