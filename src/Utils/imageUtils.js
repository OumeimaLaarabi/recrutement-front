export const base64ToUrl = (base64String) => {
  return `data:image/jpeg;base64,${base64String}`;
};

export const urlToBase64 = (url) => {
  const base64String = url.split(",")[1];
  return base64String;
};

export function fileToString(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
