import Toast from '@cindi/aria-lit/Toast';
import { MessageLevel } from '@pixdif/model/Message';

import './Toast.scss';

export default function makeToast(text: string, level: MessageLevel = 'normal'): void {
	const toast = new Toast();
	toast.classList.add(level);
	toast.viewport = '#toast-viewport';
	toast.textContent = text;
	toast.publish();
}
