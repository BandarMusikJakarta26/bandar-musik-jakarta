import { IoIosArrowDropdown } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { FaSackDollar } from "react-icons/fa6";
import { IconType } from "react-icons";

type TypeDesk = {
  icon: IconType | string, text: string
}

export const desks: TypeDesk[] = [
  { icon: '100%', text: 'Original' },
  { icon: MdVerified, text: 'Terpercaya' },
  { icon: IoIosArrowDropdown, text: 'Explore' },
  { icon: BsHandThumbsUpFill, text: 'Terlengkap' },
  { icon: FaSackDollar, text: 'Bersahabat' },
]