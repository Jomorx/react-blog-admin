import request from "@/config";

export const upload = (file: FormData) =>
  request.post("/upload/", file, {
    headers: {
      "Content-Type": '"form-data"',
    },
  });
