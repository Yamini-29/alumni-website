import imageCompression from "browser-image-compression";

export async function fileToBase64(file: File): Promise<string> {
  const compressed = await imageCompression(file, {
    maxWidthOrHeight: 1400,
    maxSizeMB: 0.8,
    useWebWorker: true,
  });

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(compressed);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}
export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
