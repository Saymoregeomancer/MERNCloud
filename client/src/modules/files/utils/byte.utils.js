export function formatBytes(bytes) {
    if (bytes < 1024) {
      return bytes + " Bt";
    } else if (bytes < 1048576) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else if (bytes < 1073741824) {
      return (bytes / 1048576).toFixed(2) + " MB";
    } else if (bytes < 1099511627776) {
      return (bytes / 1073741824).toFixed(2) + " GB";
    } else {
      return (bytes / 1099511627776).toFixed(2) + " TB";
    }
  }