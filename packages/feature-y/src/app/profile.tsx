import { Button, Input, Label } from '@repo/ui-components'
import { validateEmail } from '@repo/utils'
import { useState } from 'react'

export function ProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [errors, setErrors] = useState({ email: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Invalid email address' })
      return
    }
    alert(`Profile saved: ${JSON.stringify(formData, null, 2)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      <Button type="submit">Save Profile</Button>
    </form>
  )
}
