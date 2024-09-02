import { memo } from "react"

const SignUpInput =memo(function SignUpInput({name,type,value,register,error,required}){
 
  return (
    <label className="w-full text-white">

        <input
          type={type}
          name={value}
          {...register(value,{required})}
          placeholder={`Enter ${name}`}
          className="w-full text-white bg-transparent border-transparent focus:border-transparent focus:ring-0 placeholder-white rounded-[0.5rem]  p-[12px] "
        />
        
        <div className='h-[1px] w-full bg-white'></div>
        {error && <span className="text-sm">{error.message?(error.message):(error.name)}</span>
        }
      </label>
  )
})

export default SignUpInput