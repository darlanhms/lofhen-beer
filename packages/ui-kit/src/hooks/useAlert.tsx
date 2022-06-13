import React, { createContext, useCallback, useContext } from 'react';

import { FaTimes } from 'react-icons/fa';

import { useSnackbar, VariantType } from 'notistack';
import { IconButton } from '@mui/material';

interface AlertContextProps {
  successAlert: (message: string) => void;
  infoAlert: (message: string) => void;
  warningAlert: (message: string) => void;
  errorAlert: (message: string) => void;
}

const AlertContext = createContext({} as AlertContextProps);

export const AlertProvider = ({ children }: React.PropsWithChildren): React.ReactElement => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showAlert = useCallback((variant: VariantType, message: string) => {
    enqueueSnackbar(message, {
      variant,
      action: key => (
        <IconButton size="small" onClick={() => closeSnackbar(key)}>
          <FaTimes />
        </IconButton>
      ),
    });
  }, []);

  const successAlert = useCallback((message: string) => {
    showAlert('success', message);
  }, []);

  const infoAlert = useCallback((message: string) => {
    showAlert('info', message);
  }, []);

  const warningAlert = useCallback((message: string) => {
    showAlert('warning', message);
  }, []);

  const errorAlert = useCallback((message: string) => {
    showAlert('error', message);
  }, []);

  return (
    <AlertContext.Provider value={{ successAlert, infoAlert, warningAlert, errorAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export function useAlert(): AlertContextProps {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('Alert must be used within a provider');
  }

  return context;
}
