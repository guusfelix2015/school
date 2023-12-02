export type SurveyScreenType = 'welcome' | 'thankYou'

export type SurveyScreens = Record<SurveyScreenType, SurveyScreen>

export interface SurveyScreen {
  isActive: boolean
  title: string
  description: string
  buttonText: string
  buttonLink?: string
}

export interface SurveyTheme {
  logo?: string
  backgroundColor?: string
  textColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
  inputBorderColor?: string
  favicon?: string
}
