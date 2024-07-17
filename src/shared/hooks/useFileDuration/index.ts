import { UploadFile } from "antd";

export const getFileDuration = <T>(file: UploadFile): Promise<T> =>
  new Promise((resolve, reject) => {
    try {
      let audio = document.createElement("audio");
      audio.preload = "metadata";

      audio.onloadedmetadata = function () {
        resolve(this as T);
      };

      audio.onerror = function () {
        reject("Invalid audio. Please select a audio file.");
      };

      audio.src = window.URL.createObjectURL(file as unknown as File);
    } catch (e) {
      reject(e);
    }
  });
