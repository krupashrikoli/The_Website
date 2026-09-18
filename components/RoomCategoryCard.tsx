import Image from "next/image";
import Link from "next/link";
import { ReserveButton } from "@/components/ui/ReserveButton";
import { AXISROOMS_BOOKING_URL } from "@/lib/constants";
import type { RoomCategory } from "@/lib/rooms";
import { formatRoomGuests, formatRoomSize } from "@/lib/rooms";
import { sectionBodyClass } from "@/lib/section-typography";

export function RoomCategoryCard({ room }: { room: RoomCategory }) {
  return (
    <article className="overflow-hidden border border-border bg-white shadow-[0_8px_30px_rgba(17,17,17,0.06)]">
      <div className="grid md:grid-cols-2">
        <Link
          href={`/rooms/${room.id}`}
          className="group relative block min-h-[14rem] overflow-hidden bg-muted sm:min-h-[18rem] md:min-h-[22rem]"
        >
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </Link>

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <h2 className="font-heading text-2xl font-thin leading-[1.15] text-charcoal sm:text-[2rem]">
              {room.name}
            </h2>

            <p className="mt-3 font-body text-sm text-charcoal/70">
              {formatRoomGuests(room.sleeps)}
            </p>

            <p className="mt-1 font-body text-sm text-charcoal/70">
              {formatRoomSize(room.sizeSqFt)}
            </p>

            <p className={sectionBodyClass(false, "mt-4 line-clamp-3 text-left")}>
              {room.summary}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
            <Link
              href={`/rooms/${room.id}`}
              className="inline-flex items-center justify-center rounded-none border border-charcoal bg-white px-6 py-2.5 font-body text-xs lowercase tracking-[0.08em] text-charcoal"
            >
              show room
            </Link>
            <ReserveButton
              variant="gold"
              label="Reserve"
              href={AXISROOMS_BOOKING_URL}
              className="px-6 py-2.5 text-xs tracking-[0.08em]"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
