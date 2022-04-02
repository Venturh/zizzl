import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormProps } from 'react-hook-form';
import { InferType, ObjectSchema, TypeOf } from 'yup';

interface Props<T extends ObjectSchema<any>> extends UseFormProps<TypeOf<T>> {
	schema: T;
}

export const useFormValidation = <T extends ObjectSchema<any>>({ schema, ...rest }: Props<T>) => {
	return useForm<InferType<typeof schema>>({
		resolver: yupResolver(schema),
		mode: 'all',
		...rest,
	});
};
