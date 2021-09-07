export const background = "bg-white dark:bg-gray-800";

export const hover = "hover:bg-gray-100 dark:hover:bg-gray-900";

export const selected = "bg-gray-100 dark:bg-gray-900";

export const rounded = "rounded-lg";
export const base = [
  background,
  "rounded-lg shadow border dark:border-black",
].join(" ");

export const button = [base, hover, "cursor-pointer"].join(" ");

export const textbox = [base, "focus:outline-none p-2 mb-2 w-56"].join(" ");

export const pageBackground = "bg-white dark:bg-gray-900";
export const pageForeground = "text-black dark:text-white";
export const page = [
  "h-screen w-screen grid grid-cols-1 grid-rows-layout p-4 gap-4 justify-between justify-items-center",
  pageBackground,
  pageForeground,
].join(" ");

export const textHover =
  "hover:text-gray-500 dark:hover:text-gray-300 cursor-pointer";

export const combineStyles = (styles: string[]) => {
  return styles.join(" ");
};
