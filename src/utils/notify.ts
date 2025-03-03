import { Notify } from 'quasar';

export function notifySuccess(message: string) {
  Notify.create({
    color: 'green',
    message: message,
    actions: [{ icon: 'close', color: 'white' }],
    timeout: 8000,
  });
}

export function notifyError(message: string) {
  Notify.create({
    color: 'red',
    message: message,
    actions: [{ icon: 'close', color: 'white' }],
    timeout: 8000,
  });
}
