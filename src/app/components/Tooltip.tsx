import React, { ReactNode, useState } from "react";

type TooltipPosition = "left" | "center" | "right";

type TooltipProps = {
  children: ReactNode;
  text: string;
  position?: TooltipPosition;
} & React.HTMLAttributes<HTMLDivElement>;

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = "left",
}) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const getTooltipStyle = () => {
    const styles: React.CSSProperties = {
      maxWidth: "350px",
      textAlign: position === "center" ? "center" : "left",
    };

    if (position === "left") {
      styles.left = "0";
      styles.transform = "translateX(0)";
    } else if (position === "right") {
      styles.right = "0";
      styles.transform = "translateX(0)";
    } else {
      styles.left = "50%";
      styles.transform = "translateX(-50%)";
    }

    return styles;
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div
          className="absolute bottom-full z-50 mb-2 px-3 py-1 bg-custom-800 text-custom-100 text-xs rounded whitespace-nowrap"
          style={getTooltipStyle()}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
