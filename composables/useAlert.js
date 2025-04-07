import { ref } from 'vue';

const showAlert = ref(false);
const alertMessage = ref('');

function triggerAlert(message) {
  alertMessage.value = message;
  showAlert.value = true;
}

function hideAlert() {
  showAlert.value = false;
  alertMessage.value = '';
}

export function useAlert() {
  return {
    showAlert,
    alertMessage,
    triggerAlert,
    hideAlert,
  };
}
