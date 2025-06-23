import Swal from "sweetalert2";

export const alertSuccess = async (message) => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
  });
};

export const alertError = async (message) => {
  return Swal.fire({
    icon: "error",
    title: "Ups!",
    text: message,
  });
};

export const alertWarning = async (message) => {
  return Swal.fire({
    icon: "warning",
    title: "Warning",
    text: message,
  });
};

export const alertInfo = async (message) => {
  return Swal.fire({
    icon: "info",
    title: "Info",
    text: message,
  });
};

export const alertConfirm = async (message) => {
  const result = await Swal.fire({
    icon: "question",
    title: "Are you sure?",
    text: message,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#d33",
    cancelButtonText: "Cancel",
    cancelButtonColor: "#3085d6",
  });
  return result.isConfirmed;
};
