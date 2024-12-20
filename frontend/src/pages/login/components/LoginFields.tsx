import { UseFormRegister } from "react-hook-form"
import { loginFields } from "../../../../libs/fields/login.field"
import { loginSchemaType } from "../../../../libs/schema/login.schema"

export default function LoginFields({ register, errors }: { register: UseFormRegister<loginSchemaType>, errors: any  }){
   return loginFields.map((field, index)=>{
                return (
                    <div className="input-field relative" key={index}>
                        <label htmlFor={field.name} className="text-[20px] capitalize font-normal">{field.name}</label>
                        <field.icon size={21} className='absolute top-[47px] left-2 opacity-50'/>
                        <input {...register(field.name === "username" ? "username" : "password")} type={field.type} name={field.name} placeholder={field.placeholder} className=" w-full text-[20px] py-3 px-4 border-b-2 border-third bg-primary"/>
                        <p className="text-red-600 text-[13px] mt-1 italic">{ errors.username && field.name === "username" ? errors.username.message : errors.password && field.name === "password" ? errors.password.message : false }</p>
                    </div>
                )
    })
}