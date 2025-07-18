import { icons, type IconName } from "@/types/icons";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 15,
  color = "#fff",
  ...props
}) => {
  const SvgIcon = icons[name];

  if (!SvgIcon) {
    console.warn(`El icono "${name}" no existe.`);
    return null;
  }

  return <SvgIcon size={size} color={color} {...props} />;
};

export default Icon;
