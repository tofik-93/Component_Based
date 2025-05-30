import { Button } from '@repo/ui-components'
import { useState } from 'react'

export function AvatarUpload() {
  const [preview, setPreview] = useState<string | null>(null)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="flex items-center gap-4">
      {preview ? (
        <img 
          src={preview} 
          alt="Preview" 
          className="w-16 h-16 rounded-full object-cover border" 
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image</span>
        </div>
      )}
      <Button asChild>
        <label className="cursor-pointer">
          Upload Avatar
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
      </Button>
    </div>
  )
}
