const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

function cssVarRgbHelper(cssVariable) {
	return ({ opacityVariable, opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(--${cssVariable}), ${opacityValue})`;
		}
		if (opacityVariable !== undefined) {
			return `rgba(var(--${cssVariable}), var(${opacityVariable}, 1))`;
		}
		return `rgb(var(--${cssVariable}))`;
	};
}

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			'text-primary': cssVarRgbHelper('text-primary'),
			'text-secondary': cssVarRgbHelper('text-secondary'),
			'bg-primary': cssVarRgbHelper('bg-primary'),
			'bg-secondary': cssVarRgbHelper('bg-secondary'),
			'accent-primary': cssVarRgbHelper('accent-primary'),
			'accent-secondary': cssVarRgbHelper('accent-secondary'),
			'brand-primary': cssVarRgbHelper('brand-primary'),
			'brand-secondary': cssVarRgbHelper('brand-secondary'),
			'success-primary': cssVarRgbHelper('success-primary'),
			'success-secondary': cssVarRgbHelper('success-secondary'),
			'error-primary': cssVarRgbHelper('error-primary'),
			'error-secondary': cssVarRgbHelper('error-secondary'),
			'warning-primary': cssVarRgbHelper('warning-primary'),
			'warning-secondary': cssVarRgbHelper('warning-secondary'),
			white: '#fff',
			black: '#000',
			gray: colors.gray,
			transparent: 'transparent',
			currentColor: 'currentColor',
		},
		extend: {
			backgroundColor: {
				primary: cssVarRgbHelper('bg-primary'),
				secondary: cssVarRgbHelper('bg-secondary'),
				black: '#000',
			},
			textColor: {
				primary: cssVarRgbHelper('text-primary'),
				secondary: cssVarRgbHelper('text-secondary'),
			},
			fontSize: {
				xxs: '0.65rem',
			},
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
