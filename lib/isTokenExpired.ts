export function isTokenExpired(expiryTimestamp: string | number | Date) {
    const currentTimestamp = Date.now(); // Get the current timestamp in milliseconds
    const tokenExpiry = new Date(expiryTimestamp).getTime(); // Convert expiry timestamp to milliseconds
  
    return currentTimestamp > tokenExpiry;
  }
