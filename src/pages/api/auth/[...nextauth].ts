import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
// import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import db from 'lib/prisma';

export interface NextAuthUserWithStringId extends NextAuthUser {
	id: string;
}

const createOptions = (req: NextApiRequest): NextAuthOptions => ({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			profile(profile: any) {
				return {
					id: profile.id.toString(),
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
				} as NextAuthUserWithStringId;
			},
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
		}),
		// EmailProvider({
		// 	server: {
		// 		host: 'smtp.sendgrid.net',
		// 		port: '587',
		// 		auth: {
		// 			user: 'apikey',
		// 			pass: process.env.EMAIL_API_KEY,
		// 		},
		// 	},
		// 	from: process.env.EMAIL_FROM,
		// }),
	],
	secret: process.env.COOKIE_SECRET,

	session: {
		strategy: 'database',
	},

	callbacks: {
		async redirect({ baseUrl }) {
			return baseUrl;
		},
		async session({ session, user }) {
			const userAgent = req.headers['user-agent'];
			const sessionToken =
				req.cookies['__Secure-next-auth.session-token'] || req.cookies['next-auth.session-token'];

			if (sessionToken && !session.userAgent && !userAgent.includes('node-fetch')) {
				await db.session.update({
					where: { sessionToken },
					data: { userAgent },
				});
			}
			if (session!.user) {
				session.user.id = user.id;
				session.id = (await db.session.findUnique({ where: { sessionToken } })).id;
			}
			return session;
		},
	},

	events: {
		createUser: async ({ user }) => {
			if (user.image === null) {
				await db.user.update({
					where: { id: user.id },
					data: {
						image: `https://api.multiavatar.com/${user.name ?? user.email}.png`,
					},
				});
			}
		},
	},

	debug: false,
	adapter: PrismaAdapter(db),
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, createOptions(req));
