import Navigation from '../Navigation';
type Props = {
	children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
	return (
		<>
			<div className="px-4 mx-auto space-y-6 text-base lg:px-6 lg:text-lg ">
				<Navigation />
				<main className="flex flex-col flex-auto w-full h-full mx-auto lg:max-w-6xl">
					{children}
				</main>
			</div>
		</>
	);
};
