import React, { useState } from 'react';

interface InputWithClearInsideProps {
  tags: string[];
  onChange: (value: string) => void;
  onAddTag: (tag: string) => void;
  onClear: (index: number) => void;
}

const InputWithClearInside: React.FC<InputWithClearInsideProps> = ({
  tags,
  onChange,
  onAddTag,
  onClear,
}) => {
  const [inputValue, setInputValue] = useState<string>(''); // Nilai input yang sedang diketik

  // Fungsi untuk menangani perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value); // Memanggil fungsi onChange dari props
  };

  // Fungsi untuk menangani submit (tekan enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      onAddTag(inputValue.trim()); // Memanggil fungsi untuk menambahkan tag dengan nilai input
      setInputValue(''); // Mengosongkan input setelah memasukkan nilai
    }
  };

  // Fungsi untuk menghapus tag
  const handleClear = (index: number) => {
    onClear(index); // Memanggil fungsi untuk menghapus tag
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
        minHeight: '40px',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Menampilkan tag yang sudah dimasukkan */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {tags.map((tag, index) => (
          <span
            key={index}
            style={{
              background: '#e0e0e0',
              padding: '4px 8px',
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>{tag}</span>
            <button
              onClick={() => handleClear(index)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              &#10005;
            </button>
          </span>
        ))}
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Masukkan sesuatu..."
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: 'none',
          minWidth: '150px',
          flexGrow: 1, // Agar input field tetap menyesuaikan dengan sisa space
          outline: 'none',
          marginTop: '4px', // Agar input sedikit lebih rapi dan tidak menabrak tag
        }}
      />
    </div>
  );
};

export default InputWithClearInside;
