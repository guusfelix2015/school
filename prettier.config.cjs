/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 100,
}
