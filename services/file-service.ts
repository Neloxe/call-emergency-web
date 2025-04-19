export const validateFile = (file: File) => {
  const allowedExtensions = ["xlsx"];
  const allowedMimeTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  const fileType = file.type;

  if (
    fileExtension &&
    allowedExtensions.includes(fileExtension) &&
    allowedMimeTypes.includes(fileType)
  ) {
    return { valid: true, error: null };
  } else {
    return { valid: false, error: "Seuls les fichiers XLSX sont acceptés." };
  }
};
