import { IconType } from "react-icons";
import { FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

export type TypeField = {
    name: string, type: string, placeholder: string, icon: IconType
}

export const fields: TypeField[] = [
    {  name: 'username', type: 'text', placeholder: 'username', icon: FaUser },
    {  name: 'email', type: 'text', placeholder: 'username@gmail.com', icon: MdOutlineAlternateEmail },
    {  name: 'password', type: 'password', placeholder: '******', icon: RiLockPasswordFill },
]
