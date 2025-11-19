import { inter } from "@/app/layout";
import { cn } from "@/lib/utils";

interface TextProps {
  text: string;
  className: string;
}

const Text = (props: TextProps) => {
  return (
    <div className={cn(`${inter.className} ${props.className} font-bold mb-6`)}>
      {props.text}
    </div>
  );
};

export default Text;
