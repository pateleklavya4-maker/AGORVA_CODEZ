const ALERTS_KEY = "agriyield.demo.sms-alerts.v1";

export function readSmsAlerts() {
  try {
    return JSON.parse(localStorage.getItem(ALERTS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function sendSmsAlert(phoneNumber, message) {
  const record = {
    id: `${Date.now()}`,
    phoneNumber,
    message,
    sentAt: new Date().toISOString(),
    provider: "mock",
  };
  console.info("[MOCK SMS]", phoneNumber, message);
  localStorage.setItem(
    ALERTS_KEY,
    JSON.stringify([record, ...readSmsAlerts()].slice(0, 8)),
  );
  return record;
}
