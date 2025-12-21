export function generateRandomSixDigitNumber() {
  // Generates a random number in the range [100000, 999999]
  return Math.floor(100000 + Math.random() * 900000).toString();
}
