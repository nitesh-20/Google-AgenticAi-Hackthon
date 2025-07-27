// src/UtilityTools/agroaiApi.js

// Text chat
export async function sendAgroAIText(query) {
  const formData = new FormData();
  formData.append('query', query);
  const res = await fetch('http://localhost:8002/agroai_chat', {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

// Image chat
export async function sendAgroAIImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('http://localhost:8002/image', {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

// Voice chat
export async function sendAgroAIVoice(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('http://localhost:8002/voice', {
    method: 'POST',
    body: formData,
  });
  return res.json();
}
