import { SvgLogin } from "@/assets/icons/SvgLogin";
import { SvgRegister } from "@/assets/icons/SvgRegister";
import { SvgVisibility } from "@/assets/icons/SvgVisibility";
import { SvgVisibilityOff } from "@/assets/icons/SvgVisibilityOff";

export const icons = {
  login: SvgLogin,
  register: SvgRegister,
  visibility: SvgVisibility,
  visibilityOff: SvgVisibilityOff,
} as const;

export type IconName = keyof typeof icons;

export interface PropsIcon {
  size?: number;
  color?: string;
}
