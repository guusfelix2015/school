import originalHexToRgba from 'hex-to-rgba'

export const hexToRgba = (hex: string) => {
  return originalHexToRgba(hex).replaceAll(' ', '')
}
