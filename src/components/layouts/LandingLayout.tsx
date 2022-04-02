import DefaultNavigation from 'components/navigation/DefaultNavigation';
import Seo from 'components/ui/Seo';

type Props = {
	children: React.ReactNode;
	title: string;
	description: string;
};

export default function LandingLayout({ title, description, children }: Props) {
	return (
		<>
			<Seo title={title} description={description} />
			<main className="flex flex-col flex-1">
				<DefaultNavigation />
				<div className="flex flex-col flex-auto mx-auto mt-12 w-full max-w-[22rem] h-full sm:max-w-md md:max-w-2xl lg:max-w-[60rem] xl:max-w-7xl">
					{children}
				</div>
			</main>
		</>
	);
}
