import { solway } from "@/app/layout";
import { cn } from "@/lib/utils";

interface HeadingTextProps {
  text: string;
  className: string;
}

const HeadingText = (props: HeadingTextProps) => {
  return (
    <div
      className={cn(
        `${solway.className} ${props.className} font-bold text-white`
      )}
      style={{
        textShadow: `
                      3px 3px 0px #1e3a5f,
                      4px 4px 0px #1e3a5f,
                      5px 5px 0px #1e3a5f,
                      6px 6px 8px rgba(0,0,0,0.3)
                    `,
        WebkitTextStroke: "2px #1e3a5f",
        paintOrder: "stroke fill",
      }}
    >
      {props.text}
    </div>
  );
};

export default HeadingText;
