type BrandTypeProps = {
  /** Header (white) vs footer (navy) */
  variant: "onLight" | "onDark";
  size?: "default" | "sm";
};

/**
 * Renders “রাজশাহী নিউজ ২৪” as live text styled like the original logo
 * (navy + emphatic red ২৪), not as an image.
 */
export function BrandType({ variant, size = "default" }: BrandTypeProps) {
  const isSm = size === "sm";
  const line1 =
    isSm
      ? "text-lg font-extrabold leading-[1.1] sm:text-xl"
      : "text-[1.35rem] font-extrabold leading-tight sm:text-2xl md:text-[1.7rem]";
  const line2Base =
    isSm
      ? "text-base font-extrabold leading-none sm:text-lg"
      : "text-lg font-extrabold leading-[1.05] sm:text-xl md:text-2xl";
  const n24 =
    isSm
      ? "ms-0.5 text-[1.5rem] sm:text-[1.65rem]"
      : "ms-0.5 text-[1.85rem] sm:text-[2.1rem] md:text-[2.35rem]";

  const navy = variant === "onLight" ? "text-navy" : "text-zinc-100";
  const n24Class =
    variant === "onLight"
      ? "font-black text-brand [text-shadow:0_1px_0_#d4af37,0_3px_6px_rgba(0,0,0,0.14)]"
      : "font-black text-red-400 [text-shadow:0_1px_0_#fbbf24,0_2px_4px_rgba(0,0,0,0.35)]";

  return (
    <div className="min-w-0 text-left">
      <span className={`block ${navy} ${line1} tracking-tight`}>রাজশাহী</span>
      <span className={`mt-0.5 block ${navy} ${line2Base}`}>
        <span>নিউজ</span>
        <span className={`${n24Class} ${n24} inline-block align-[-0.1em] tracking-tight`}>
          ২৪
        </span>
      </span>
    </div>
  );
}
