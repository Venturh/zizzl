/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['avatars.githubusercontent.com', 'api.multiavatar.com', 'cdn.discordapp.com'],
	},
};

module.exports = nextConfig;
