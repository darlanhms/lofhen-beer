import React from 'react';
import { FormControlLabel, Switch as MaterialSwitch, SwitchProps as MaterialSwitchProps } from '@mui/material';

export interface SwitchProps extends MaterialSwitchProps {
  label?: string;
}

export const Switch: React.FunctionComponent<SwitchProps> = ({ label, ...rest }) => {
  return <FormControlLabel control={<MaterialSwitch {...rest} />} label={label} />;
};
