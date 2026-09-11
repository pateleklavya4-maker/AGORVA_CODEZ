const FARMERS_KEY = "agriyield.demo.farmers.v1";
const SESSION_KEY = "agriyield.demo.session.v1";

const readFarmers = () => {
  try {
    return JSON.parse(localStorage.getItem(FARMERS_KEY) || "[]");
  } catch {
    return [];
  }
};
const normalize = (value) => value.replace(/[\s()-]/g, "").toLowerCase();
const saveSession = (farmer) => localStorage.setItem(SESSION_KEY, farmer.id);

export function currentFarmer() {
  const id = localStorage.getItem(SESSION_KEY);
  return readFarmers().find((farmer) => farmer.id === id) || null;
}

export function registerFarmer(name, phone) {
  const cleanName = name.trim();
  const cleanPhone = normalize(phone);
  if (!cleanName) throw new Error("name");
  if (!cleanPhone || cleanPhone.replace(/\D/g, "").length < 7)
    throw new Error("phone");
  const existing = readFarmers().find(
    (farmer) => normalize(farmer.phone) === cleanPhone,
  );
  if (existing) {
    saveSession(existing);
    return existing;
  }
  const farmer = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    name: cleanName,
    phone: phone.trim(),
    farmerId: `AGY-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(FARMERS_KEY, JSON.stringify([...readFarmers(), farmer]));
  saveSession(farmer);
  return farmer;
}

export function findFarmer(identifier) {
  const value = normalize(identifier);
  const farmer = readFarmers().find(
    (item) =>
      normalize(item.phone) === value || item.farmerId.toLowerCase() === value,
  );
  if (!farmer) throw new Error("not-found");
  saveSession(farmer);
  return farmer;
}

export function signOutFarmer() {
  localStorage.removeItem(SESSION_KEY);
}
