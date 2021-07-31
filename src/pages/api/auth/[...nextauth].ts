import NextAuth, { User as NextAuthUser } from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'lib/prisma';

export interface NextAuthUserWithStringId extends NextAuthUser {
	id: string;
}

export default NextAuth({
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			scope: 'read:user',
			profile(profile: any) {
				return {
					id: profile.id.toString(),
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
				} as NextAuthUserWithStringId;
			},
		}),
		Providers.Discord({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
		}),
		Providers.Email({
			server: {
				host: 'smtp.sendgrid.net',
				port: '587',
				auth: {
					user: 'apikey',
					pass: process.env.EMAIL_API_KEY,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
	],
	database: process.env.DATABASE_URL,

	secret: process.env.COOKIE_SECRET,

	session: {
		jwt: false,
	},

	jwt: {},

	pages: {},

	callbacks: {
		async redirect(url, baseUrl) {
			console.log('redirect', url, baseUrl);
			return baseUrl;
		},
		async session(session, userOrToken) {
			if (session?.user) {
				session.user = Object.assign({}, session.user, {
					id: userOrToken.id || session.user.id,
				});
			}
			return session;
		},
	},

	events: {
		createUser: async (user: NextAuthUser) => {
			if (user.image === null) {
				await prisma.user.update({
					where: { id: user.id },
					data: {},
				});
			}
		},
	},

	debug: false,
	adapter: PrismaAdapter(prisma),
});
