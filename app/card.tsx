import { CONFIG } from "./config";

interface CardProps {
  width?: number;
  height?: number;
  id: number;
  title: string;
  sourceName: string;
  sourceIcon: string;
}

export default function Card({
  width = 700,
  height = 700,
  id,
  title,
  sourceName,
  sourceIcon,
}: CardProps) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height,
        width,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
        fontSize: width / 12,
        letterSpacing: -width / 220,
        fontWeight: 700,
        whiteSpace: "wrap",
      }}
    >
      <div
        style={{ letterSpacing: "0.05px" }}
        tw="w-full flex justify-start text-3xl px-10 text-[#ed7c0b]"
      >
        {id} /{CONFIG.POSTS.LIMIT}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "40px 40px",
          width: "100%",
          textAlign: "start",
          backgroundImage:
            "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",

          backgroundClip: "text",
          color: "transparent",
          fontSize: "40px",
          letterSpacing: "0.1px",
        }}
        tw="[-webkit-background-clip:text]"
      >
        <p tw="m-0">{title}</p>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          textAlign: "start",
          padding: "0px 40px",
        }}
      >
        <span
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(237, 124, 11), rgb(255, 77, 77))",
            // "linear-gradient(90deg, rgb(255, 77, 77), rgb(237, 124, 11))",
            backgroundClip: "text",
            fontSize: "30px",
            letterSpacing: "0.01em",
          }}
          tw="[-webkit-background-clip:text] text-transparent mt-6 whitespace-nowrap"
        >
          Source: {sourceName}
        </span>
      </div>
      {/* <div
        style={{
          padding: "5px 40px",
          width: "auto",
          textAlign: "center",
          backgroundImage:
              "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
          backgroundClip: "text",
          color: "transparent",
        }}
        className="[-webkit-background-clip:text]"
      >
        from your Browser
      </div> */}
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/alphaday-news-logo.png`}
        alt="logo"
        tw="w-full h-full absolute opacity-10 self-start"
      />
    </div>
  );
}
