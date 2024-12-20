import { IconType } from "react-icons";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export type TypeField = { name: string, type: string, placeholder: string, icon: IconType }

export const loginFields: TypeField[] = [
    {  name: "username", type: 'text', placeholder: 'username', icon: FaUser},
    {  name: "password", type: 'password', placeholder: '******', icon: RiLockPasswordFill }
]