import { capitalizeFirstLetter } from '@lofhen/utils';
import { Prisma } from '@prisma/client';

type ModelName = 'user';

type UpperCaseModelName = 'User';

type UserFields = typeof Prisma.UserScalarFieldEnum[keyof typeof Prisma.UserScalarFieldEnum];

type Fields<T extends ModelName> = T extends 'user' ? UserFields : never;

type RemoveFields<T extends ModelName, F extends Array<Fields<T>>> = F extends Array<infer U>
  ? Record<Exclude<Fields<T>, U>, boolean>
  : never;

export const excludeFields = <T extends ModelName, F extends Array<Fields<T>>>(
  modelName: T,
  fields: F,
): RemoveFields<T, F> => {
  const scalarEnumKey: `${UpperCaseModelName}ScalarFieldEnum` = `${
    capitalizeFirstLetter(modelName) as UpperCaseModelName
  }ScalarFieldEnum`;

  const modelFields = {
    ...Prisma[scalarEnumKey],
  };

  fields.forEach(field => delete modelFields[field]);

  Object.keys(modelFields).forEach(key => {
    (modelFields as any)[key] = true;
  });

  return modelFields as any;
};
