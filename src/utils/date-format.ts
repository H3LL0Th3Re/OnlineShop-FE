export function formatDateString(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
