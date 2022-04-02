import { useEffect, useRef } from 'react';

export default function useUpdateEffect(callback: () => void, dependencies = []) {
	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			return callback();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);
}
