import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
	const posts = [
		{
			title: 'Mollit exercitation tempor magna.',
			text: 'Ad elit cupidatat laborum nostrud mollit magna eiusmod nostrud amet.Ad elit cupidatat laborum nostrud mollit magna eiusmod nostrud amet.',
		},
		{
			title: 'Culpa eiusmod eiusmod.',
			text: 'Ad elit cupidatat laborum nostrud mollit magna eiusmod nostrud amet.Ad elit cupidatat laborum nostrud mollit magna eiusmod nostrud amet.',
		},
		{
			title: 'Culpa eiusmod eiusmod.',
			text: 'Ad elit cupidatat laborum nostrud mollit magna eiusmod nostrud amet.Ad elit cupidatat laborum nostrud mollit magna eiusmod nostrud amet.',
		},
	];

	await db.post.deleteMany();
	await db.post.createMany({
		data: posts,
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await db.$disconnect();
	});
