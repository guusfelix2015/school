import * as bcrypt from 'bcrypt'

export const hash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt()
  return await bcrypt.hash(password, salt)
}

export const verifyHash = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash)
}
