// Función para fetchear los aailings desde la API
// en este caso lo hubiera puesto en un .env la URL por seguridad
// pero para hacerlo más rápido lo dejo así

export async function fetchSailings() {
  const res = await fetch("https://sandbox.cruisebound-qa.com/sailings");
  if (!res.ok) throw new Error("Failed to fetch sailings");
  return res.json();
}
