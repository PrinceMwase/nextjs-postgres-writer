export const generateVerificationToken = () => {
  return crypto.randomUUID();
};
