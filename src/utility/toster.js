import toast from "react-hot-toast";

const baseStyle = {
  borderRadius: "8px",
  padding: "14px 18px",
  fontWeight: "500",
  background: "#003670",
  color: "#fff",
};

const firebaseErrorMessages = {
  "auth/invalid-email": "Please enter a valid email address",
  "auth/user-not-found": "No account found with this email",
  "auth/wrong-password": "Incorrect password. Please try again",
  "auth/invalid-credential":
    "Invalid login credentials. Please check your email and password",
  "auth/too-many-requests":
    "Too many login attempts. Please try again later",
  "auth/network-request-failed":
    "Network error. Please check your connection",
};

export const showToast = {
  custom: (message) =>
    toast(message, {
      style: baseStyle,
    }),

  firebaseError: (errorCode) => {
    const message =
      firebaseErrorMessages[errorCode] ||
      "Something went wrong. Please try again";

    toast(message, {
      style: baseStyle,
    });
  },

  loginRequired: () =>
    toast("Please login to post an ad", {
      style: baseStyle,
    }),

  adPosted: () =>
    toast("Ad posted successfully", {
      style: baseStyle,
    }),

  logoutSuccess: () =>
    toast("Logged out successfully", {
      style: baseStyle,
    }),
};