import type { MenuItem } from "@/lib/menu";
import { formatPrice } from "@/lib/format";

export function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <article className="py-4">
      <div className="dotted-price">
        <h3 className="font-display text-[1.05rem] font-normal tracking-wide uppercase">
          {item.name}
          {item.portion ? (
            <span className="ml-2 font-sans text-[0.7rem] font-normal tracking-normal text-bark/50 normal-case">
              {item.portion}
            </span>
          ) : null}
        </h3>
        <span className="font-medium tabular-nums">
          {item.price == null ? "Consulte" : formatPrice(item.price)}
        </span>
      </div>
      {item.description ? (
        <p className="mt-1.5 max-w-2xl text-[0.95rem] leading-relaxed text-bark/70">
          {item.description}
        </p>
      ) : null}
      {item.note ? (
        <p className="mt-1 text-xs tracking-wide text-ember uppercase">{item.note}</p>
      ) : null}
    </article>
  );
}
