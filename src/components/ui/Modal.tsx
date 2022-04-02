import { Transition, Dialog } from '@headlessui/react';
import { ArrowLeftIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import React, { Fragment, useRef } from 'react';

export type ModalProps = {
	children?: React.ReactChild;
	open: boolean;
	setOpen: (val: boolean) => void;
	title?: string;
	titleSlot?: React.ReactNode;
	description?: string;
	descriptionSlot?: React.ReactNode;
	actionSlot?: React.ReactNode;
	closable?: boolean;
	back?: boolean;
	backCallback?: () => void;
	className?: string;
};

export default function Modal({
	children,
	open,
	setOpen,
	title,
	titleSlot,
	description,
	descriptionSlot,
	actionSlot,
	closable = false,
	back = false,
	backCallback,
	className,
}: ModalProps) {
	const initialFocusRef = useRef<HTMLDivElement>(null);
	return (
		<Transition.Root as={Fragment} show={open}>
			<Dialog
				as="div"
				className="fixed inset-0 z-10 overflow-y-auto"
				open={open}
				onClose={setOpen}
				initialFocus={initialFocusRef}
			>
				<Transition.Child
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Dialog.Overlay className="fixed inset-0 transition-opacity bg-opacity-50 bg-secondary" />
				</Transition.Child>
				<span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
					&#8203;
				</span>
				{children && (
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="fixed inset-x-0 bottom-0 z-40 max-h-screen m-auto overflow-hidden rounded-lg shadow-lg dark:ring sm:max-w-lg md:top-1/2 md:bottom-auto md:-translate-y-1/2 bg-primary dark:ring-bg-secondary">
							{closable && (
								<div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
									<button
										type="button"
										className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										onClick={() => setOpen(false)}
									>
										<span className="sr-only">Close</span>
										<XIcon className="w-6 h-6" aria-hidden="true" />
									</button>
								</div>
							)}
							<div className="flex flex-col justify-between flex-1 h-full p-2 md:p-4">
								<div className="">
									<div className="flex items-center justify-center w-full pt-2 pb-4 lg:hidden">
										<div className="flex justify-center w-12 h-1 text-center rounded-lg bg-accent-secondary" />
									</div>
									{(title || titleSlot) && (
										<Dialog.Title className="flex items-center justify-between py-2">
											<div className="flex items-center ">
												{back && (
													<button type="button" onClick={() => backCallback!()}>
														<ArrowLeftIcon className="w-5 h-5 mr-2 text-primary" />
													</button>
												)}
												<h3 className="text-lg font-medium leading-6 text-left lg:text-xl text-primary">
													{title}
												</h3>
											</div>
											{titleSlot}
										</Dialog.Title>
									)}
									{(description || descriptionSlot) && (
										<div className="space-y-2">
											<span>{description}</span>
											{descriptionSlot}
										</div>
									)}
									<div ref={initialFocusRef} className={clsx('px-1 mt-2', className)}>
										{children}
									</div>
								</div>
								<div className="p-1 mt-2 overflow-x-scroll">{actionSlot}</div>
							</div>
						</div>
					</Transition.Child>
				)}
			</Dialog>
		</Transition.Root>
	);
}
