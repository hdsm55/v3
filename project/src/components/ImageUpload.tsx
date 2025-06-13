import React from 'react'

interface ImageUploadProps {
  onChange: (file: File) => void
  value: string | null
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange(file)
    }
  }

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
      >
        {value ? (
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-gray-400 mb-2">Click to upload image</div>
            <div className="text-sm text-gray-500">PNG, JPG up to 5MB</div>
          </div>
        )}
      </label>
    </div>
  )
}
