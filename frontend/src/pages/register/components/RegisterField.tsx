import { fields } from '../../../../libs/fields/register.field'

export default function RegisterField({ register, errors }: any){
    return fields.map((field, index)=>{
        return (
            <div className="input-field relative" key={index}>
                <field.icon size={21} className='absolute top-[47px] left-2 opacity-50'/>
                <label htmlFor={field.name} className="text-[20px] capitalize font-normal">{field.name}</label>
                <input {...register(field.name === "username" ? "username" : field.name === "email" ? "email" : "password")} type={field.type} name={field.name} placeholder={field.placeholder} className=" w-full text-[20px] py-3 px-4 bg-primary border-b-2 border-third"/>
                <p className="text-red-600 text-[13px] mt-1 italic">{ errors.username && field.name === "username" ? errors.username.message : errors.email && field.name === "email" ? errors.email.message : errors.password && field.name === "password" ? errors.password.message : false}</p>
            </div>
        )
    })
}  