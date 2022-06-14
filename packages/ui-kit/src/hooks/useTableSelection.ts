/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

type MultiTableSelectionReturn = [
  ReadonlyArray<string>,
  React.Dispatch<React.SetStateAction<ReadonlyArray<string>>>,
];

type SingleTableSelectionReturn = [
  string | undefined,
  React.Dispatch<React.SetStateAction<string | undefined>>,
];

type SelectionType = 'multi' | 'single';

type ConditionalDefaultValue<T extends SelectionType> = T extends 'multi'
  ? ReadonlyArray<string>
  : T extends 'single'
  ? string | undefined
  : never;

type ConditionalReturnValue<T extends SelectionType> = T extends 'multi'
  ? MultiTableSelectionReturn
  : T extends 'single'
  ? SingleTableSelectionReturn
  : never;

export function useTableSelection<T extends SelectionType>(
  type: T,
  defaultValue?: ConditionalDefaultValue<T>,
): ConditionalReturnValue<T> {
  if (type === 'multi') {
    return useState<ReadonlyArray<string>>((defaultValue || []) as any) as any;
  }

  return useState<string | undefined>(defaultValue as any) as any;
}
