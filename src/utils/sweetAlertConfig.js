import Swal from 'sweetalert2';

/**
 * Custom SweetAlert2 configuration dengan neon cyan theme
 * Untuk Laboratory features
 */

// Base configuration untuk semua alerts
const baseConfig = {
  background: '#0a0a0a',
  color: '#e5e5e5',
  confirmButtonColor: '#00d4ff',
  cancelButtonColor: '#7f1d1d',
  customClass: {
    popup: 'swal-laboratory-popup',
    title: 'swal-laboratory-title',
    htmlContainer: 'swal-laboratory-content',
    confirmButton: 'swal-laboratory-confirm',
    cancelButton: 'swal-laboratory-cancel',
    input: 'swal-laboratory-input'
  }
};

/**
 * Success Alert
 */
export const showSuccess = (title, text) => {
  return Swal.fire({
    ...baseConfig,
    icon: 'success',
    title,
    text,
    iconColor: '#00d4ff',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
};

/**
 * Error Alert
 */
export const showError = (title, text) => {
  return Swal.fire({
    ...baseConfig,
    icon: 'error',
    title,
    text,
    iconColor: '#ef4444',
    confirmButtonText: 'OK'
  });
};

/**
 * Warning Alert
 */
export const showWarning = (title, text) => {
  return Swal.fire({
    ...baseConfig,
    icon: 'warning',
    title,
    text,
    iconColor: '#f59e0b',
    confirmButtonText: 'OK'
  });
};

/**
 * Info Alert
 */
export const showInfo = (title, text) => {
  return Swal.fire({
    ...baseConfig,
    icon: 'info',
    title,
    text,
    iconColor: '#00d4ff',
    confirmButtonText: 'Got it!'
  });
};

/**
 * Confirmation Dialog
 */
export const showConfirm = (title, text, confirmText = 'Yes, delete it!', cancelText = 'Cancel') => {
  return Swal.fire({
    ...baseConfig,
    icon: 'warning',
    title,
    text,
    iconColor: '#f59e0b',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true
  });
};

/**
 * Delete Confirmation (specific for delete actions)
 */
export const showDeleteConfirm = (itemName = 'this item') => {
  return Swal.fire({
    ...baseConfig,
    icon: 'warning',
    title: 'Are you sure?',
    text: `You won't be able to revert this! Delete ${itemName}?`,
    iconColor: '#ef4444',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  });
};

/**
 * Input Dialog
 */
export const showInput = (title, inputPlaceholder, inputType = 'text') => {
  return Swal.fire({
    ...baseConfig,
    title,
    input: inputType,
    inputPlaceholder,
    showCancelButton: true,
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel',
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write something!';
      }
    }
  });
};

/**
 * Loading Alert
 */
export const showLoading = (title = 'Processing...', text = 'Please wait') => {
  return Swal.fire({
    ...baseConfig,
    title,
    text,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

/**
 * Close any open alert
 */
export const closeAlert = () => {
  Swal.close();
};

/**
 * Toast notification (bottom-right corner)
 */
export const showToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#0a0a0a',
    color: '#e5e5e5',
    iconColor: icon === 'success' ? '#00d4ff' : icon === 'error' ? '#ef4444' : '#f59e0b',
    customClass: {
      popup: 'swal-toast-popup'
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  return Toast.fire({
    icon,
    title
  });
};

/**
 * Custom styled alert dengan HTML content
 */
export const showCustom = (config) => {
  return Swal.fire({
    ...baseConfig,
    ...config
  });
};

// Export default Swal untuk custom usage
export default Swal;
