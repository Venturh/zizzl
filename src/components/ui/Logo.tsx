import Link from 'next/link';

export default function Logo() {
	return (
		<Link href="/">
			<a className="inline-flex items-center text-xl font-bold md:text-2xl">Zizzl</a>
		</Link>
	);
}
