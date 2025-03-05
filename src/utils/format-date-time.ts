export default function formatDateTime(dateTime: string): string {
  const date = new Date(dateTime);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  };

  const formatted = new Intl.DateTimeFormat('id-ID', options).format(date);
  return formatted.replace(' pukul', ' -') + ' WIB';
}

// Contoh penggunaan
console.log(formatDateTime('2023-09-24T12:00+07:00'));
// Output: "24 September 2023 - 12:00 WIB"
