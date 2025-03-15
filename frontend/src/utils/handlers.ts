
import { notifications } from '@mantine/notifications';

export const handleError = (message: string) => {
	notifications.show({
		title: 'Error',
		color: 'red',
		message: message,
		autoClose: 1500,
	})
}

export const handleSuccess = (message: string) => {
	notifications.show({
		title: 'Success',
		color: 'green',
		message: message,
		autoClose: 1500,
	})
}