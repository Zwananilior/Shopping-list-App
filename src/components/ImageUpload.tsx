import React from 'react'

type Props = { value?: string; onChange: (dataUrl: string) => void }

export default function ImageUpload({ value, onChange }: Props){
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(String(reader.result))
    reader.readAsDataURL(file)
  }
  return (
    <div>
      <label>Image</label>
      <input type="file" accept="image/*" onChange={onFile} />
      {value && <div style={{marginTop:8}}><img src={value} alt="preview" style={{maxHeight:120, borderRadius:8}}/></div>}
    </div>
  )
}
