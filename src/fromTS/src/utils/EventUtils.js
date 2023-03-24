/* eslint-disable no-shadow */
const handleKeyPressEnter = (event, callback) => {
  if (event.key === 'Enter' && callback) {
    callback();
  }
};

export const downloadPDFFile = (link, fileName) => {
  fetch(link, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
};

export default {
  handleKeyPressEnter,
  downloadPDFFile,
};
