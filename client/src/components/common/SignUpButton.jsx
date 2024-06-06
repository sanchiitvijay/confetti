
const SignUpButton = (props) => {
  return (
    <label className="w-full text-white">

        <input
          required
          type="text"
          name={props.name}
          // value={email}
          // onChange={handleOnChange}
          placeholder={`Enter ${props.name}`}
          
          className="w-full text-white bg-transparent border-transparent focus:border-transparent focus:ring-0 placeholder-white rounded-[0.5rem]  p-[12px] "
        />
        <div className='h-[1px] w-full bg-white'></div>
      </label>
  )
}

export default SignUpButton