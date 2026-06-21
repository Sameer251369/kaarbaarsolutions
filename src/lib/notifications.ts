import { toast } from 'react-toastify';

export interface NotificationOptions {
  duration?: number;
  autoClose?: number;
}

/**
 * Show a success notification
 */
export function notifySuccess(message: string, options: NotificationOptions = {}) {
  toast.success(message, {
    position: 'top-right',
    autoClose: options.autoClose || 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

/**
 * Show an error notification
 */
export function notifyError(message: string, options: NotificationOptions = {}) {
  toast.error(message, {
    position: 'top-right',
    autoClose: options.autoClose || 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

/**
 * Show an info notification
 */
export function notifyInfo(message: string, options: NotificationOptions = {}) {
  toast.info(message, {
    position: 'top-right',
    autoClose: options.autoClose || 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

/**
 * Show a warning notification
 */
export function notifyWarning(message: string, options: NotificationOptions = {}) {
  toast.warning(message, {
    position: 'top-right',
    autoClose: options.autoClose || 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

/**
 * Handle API error with notification
 */
export function handleApiError(error: any, fallbackMessage = 'Something went wrong') {
  const message = error?.message || error?.response?.data?.message || fallbackMessage;
  notifyError(message);
}
