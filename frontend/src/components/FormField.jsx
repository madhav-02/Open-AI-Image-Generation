import React from 'react'

const FormField = ({labelName,type,name,placeholder,value,handleChange,handleSupriseMe,isSupriseMe}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-800">
            {labelName}
        </label>
        {isSupriseMe && (
          <button type="button"
          onClick={handleSupriseMe}
          className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black">
            Suprise Me
          </button>
        )}
      </div>
      <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={handleChange}
      required className="bg-slate-50 border border-gray-300 text-gray-900 text-sm rounded-lg foucs:ring-[#4649ff] focus:border-[#db7910] outline-none block w-full p-3"/>
    </div>
  )
}

export default FormField