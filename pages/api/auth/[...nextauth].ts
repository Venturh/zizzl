import NextAuth, { User as NextAuthUser } from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'lib/prisma';

interface NextAuthUserWithStringId extends NextAuthUser {
	id: string;
}

export default NextAuth({
	// https://next-auth.js.org/configuration/providers
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			// https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
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
			// sendVerificationRequest: ({
			// 	identifier: email,
			// 	url,
			// 	token,
			// 	baseUrl,
			// 	provider,
			// }) => {
			// 	console.log(
			// 		'🚀 ~ file: [...nextauth].ts ~ line 43 ~ identifier',
			// 		email,
			// 		url,
			// 		token,
			// 		provider,
			// 	);
			// },
		}),
	],
	// Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
	// https://next-auth.js.org/configuration/databases
	//
	// Notes:
	// * You must install an appropriate node_module for your database
	// * The Email provider requires a database (OAuth providers do not)
	database: process.env.DATABASE_URL,

	// The secret should be set to a reasonably long random string.
	// It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
	// a separate secret is defined explicitly for encrypting the JWT.
	secret: process.env.COOKIE_SECRET,

	session: {
		// Use JSON Web Tokens for session instead of database sessions.
		// This option can be used with or without a database for users/accounts.
		// Note: `jwt` is automatically set to `true` if no database is specified.
		jwt: false,

		// Seconds - How long until an idle session expires and is no longer valid.
		// maxAge: 30 * 24 * 60 * 60, // 30 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		// updateAge: 24 * 60 * 60, // 24 hours
	},

	// JSON Web tokens are only used for sessions if the `jwt: true` session
	// option is set - or by default if no database is specified.
	// https://next-auth.js.org/configuration/options#jwt
	jwt: {
		// A secret to use for key generation (you should set this explicitly)
		// secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
		// Set to true to use encryption (default: false)
		// encryption: true,
		// You can define your own encode/decode functions for signing and encryption
		// if you want to override the default behaviour.
		// encode: async ({ secret, token, maxAge }) => {},
		// decode: async ({ secret, token, maxAge }) => {},
	},

	// You can define custom pages to override the built-in ones. These will be regular Next.js pages
	// so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
	// The routes shown here are the default URLs that will be used when a custom
	// pages is not specified for that route.
	// https://next-auth.js.org/configuration/pages
	pages: {
		signIn: '/auth/login', // Displays signin buttons
		// signOut: '/auth/signout', // Displays form with sign out button
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // Used for check email page
		// newUser: null // If set, new users will be directed here on first sign in
	},

	// Callbacks are asynchronous functions you can use to control what happens
	// when an action is performed.
	// https://next-auth.js.org/configuration/callbacks
	callbacks: {
		// async signIn(user, account, profile) { return true },
		async redirect(url, baseUrl) {
			console.log('redirect', url, baseUrl);
			return baseUrl;
		},
		// async session(session, user) { return session },
		// async jwt(token, user, account, profile, isNewUser) { return token }
	},

	// Events are useful for logging
	// https://next-auth.js.org/configuration/events
	events: {
		createUser: async (user: any) => {
			if (user.image === null) {
				await prisma.user.update({
					where: { id: user.id },
					data: {
						image: `https://api.multiavatar.com/${user.name ?? user.email}.png`,
					},
				});
			}
		},
	},

	// Enable debug messages in the console if you are having problems
	debug: false,
	adapter: PrismaAdapter(prisma),
});
