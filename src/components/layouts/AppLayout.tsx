import clsx from 'clsx';

import Seo from 'components/ui/Seo';
import DefaultNavigation from 'components/navigation/DefaultNavigation';

type Props = {
	children: React.ReactNode;
	aside?: React.ReactNode;
	asideReverse?: boolean;
	mobileReverse?: boolean;
	title: string;
	description?: string;
};

export default function AppLayout({
	children,
	aside,
	asideReverse,
	mobileReverse,
	title,
	description = 'No description provided',
}: Props) {
	return (
		<>
			<Seo title={title} description={description} />
			<div className="flex min-h-screen mb-24 ">
				<div className="flex flex-col flex-1">
					<header className="w-full">
						<DefaultNavigation />
					</header>

					<div className="px-4 lg:px-0 mx-auto sm:max-w-md md:max-w-2xl lg:max-w-[60rem] xl:max-w-[80rem] w-full">
						<div
							className={clsx(
								'flex  mt-4 ',
								{ 'lg:max-w-7xl lg:grid-cols-12 lg:gap-8': aside },
								mobileReverse ? 'flex-col lg:grid' : 'flex-col-reverse lg:grid',
							)}
						>
							<main
								className={clsx('lg:col-span-8', {
									'lg:row-span-6': asideReverse,
								})}
							>
								{children}
								<div className="mt-4 lg:hidden" id="mobile-side"></div>
							</main>
							{aside && (
								<aside
									className={clsx('lg:col-span-4 ', {
										'lg:row-start-1': asideReverse,
									})}
								>
									<div
										className={clsx(
											'sticky top-0 space-y-4 md:mb-0 max-w-md border-accent-primary',
											asideReverse ? 'lg:border-r' : '',
											mobileReverse ? 'my-4 md:my-0' : 'mb-4 md:mb-0',
										)}
									>
										{aside}
									</div>
								</aside>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
