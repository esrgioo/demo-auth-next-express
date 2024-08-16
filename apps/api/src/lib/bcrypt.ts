import * as bcrypt from 'bcrypt';

export const comparePassword = async (
  candidatePassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

//hashing password user
export const hashPassword = async (password: string): Promise<string> => {
  //semakin tinggi semakin sulit, biasanya 8-10 nilai saltroundya
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
