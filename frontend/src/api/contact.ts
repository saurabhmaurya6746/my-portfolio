import { API_BASE_URL } from "./client";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export async function sendContactMessage(data: ContactFormData): Promise<ContactApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(resData.error || `Contact API error (${response.status})`);
  }

  return resData;
}

