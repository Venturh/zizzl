import { enumType } from 'nexus';

export enum ResultType {
	'SUCCESS' = 'SUCCESS',
}

export const ResultResolver = enumType({ name: 'Result', members: ResultType });
