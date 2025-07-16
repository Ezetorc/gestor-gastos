import { SvgLogin } from "@/assets/icons/SvgLogin";
import { SvgRegister } from "@/assets/icons/SvgRegister";


export const icons = {
  login: SvgLogin,
  register: SvgRegister
} as const;

export type IconName = keyof typeof icons;

export interface PropsIcon {
  size?: number;
  color?: string;
}