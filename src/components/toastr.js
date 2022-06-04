import toastr from 'toastr'

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export function showMessage(title, message, type) {
    toastr[type](message, title)
}

export function ErrorMessage(message) {
    showMessage("Error:", message, "error")
}

export function SuccessMessage(message) {
    showMessage("Success:", message, "success")
}

export function AlertMessage(Message) {
    showMessage("Alert:", message, "warning")
}