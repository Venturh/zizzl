import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormProps } from 'react-hook-form';
import { ZodSchema, TypeOf } from 'zod';

interface Props<T extends ZodSchema<any>> extends UseFormProps<TypeOf<T>> {
	schema: T;
}

export const useFormValidation = <T extends ZodSchema<any>>({ schema, ...rest }: Props<T>) => {
	return useForm({
		resolver: zodResolver(schema),
		mode: 'all',
		...rest,
	});
};
