import Image from "next/image";
import Link from "next/link";
import type { GuestSelection } from "@/components/reservation/GuestRoomPicker";
import type { RoomCategory } from "@/lib/rooms";
import { RoomFromPrice } from "@/components/RoomFromPrice";
import {
  formatRoomGuests,
  formatRoomRate,
  formatRoomSize,
  getRoomCategoryNightlyRate,
} from "@/lib/rooms";
import { sectionBodyClass } from "@/lib/section-typography";
import { cn } from "@/lib/utils";

type BookingRoomCategoryCardProps = {
  room: RoomCategory;
  guests: GuestSelection;
  nights: number;
  assignedRoomIndexes: number[];
  selected: boolean;
  onSelect: () => void;
  selectable?: boolean;
};

function formatOccupancy(room: { adults: number; children: number }): string {
  const parts = [`${room.adults} adult${room.adults === 1 ? "" : "s"}`];
  if (room.children > 0) {
    parts.push(`${room.children} child${room.children === 1 ? "" : "ren"}`);
  }
  return parts.join(", ");
}

export function BookingRoomCategoryCard({
  room,
  guests,
  nights,
  assignedRoomIndexes,
  selected,
  onSelect,
  selectable = true,
}: BookingRoomCategoryCardProps) {
  const rate = getRoomCategoryNightlyRate(room);
  const stayNights = Math.max(nights, 1);
  const assignedCount = assignedRoomIndexes.length;
  const totalCost = rate.nightlyRate * assignedCount * stayNights;
  const showAssignmentDetails = assignedCount > 0;

  return (
    <article
      className={cn(
        "overflow-hidden border bg-white shadow-[0_8px_30px_rgba(17,17,17,0.06)] transition-colors",
        selected ? "border-[#543119] ring-1 ring-[#543119]/30" : "border-border",
      )}
    >
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[14rem] overflow-hidden bg-muted sm:min-h-[18rem] md:min-h-[22rem]">
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <h2 className="font-heading text-2xl font-thin leading-[1.15] text-charcoal sm:text-[2rem]">
              {room.name}
            </h2>

            <p className="mt-3 font-body text-sm text-charcoal/70">
              {formatRoomGuests(room.sleeps)} · {room.beds}
            </p>

            <p className="mt-1 font-body text-sm text-charcoal/70">
              {formatRoomSize(room.sizeSqFt)}
            </p>

            <p className={sectionBodyClass(false, "mt-4 line-clamp-3 text-left")}>
              {room.summary}
            </p>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <RoomFromPrice amount={rate.nightlyRate} />

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {selectable ? (
                <button
                  type="button"
                  onClick={onSelect}
                  className={cn(
                    "inline-flex items-center justify-center rounded-none border px-6 py-2.5 font-body text-xs lowercase tracking-[0.08em] transition-colors",
                    selected
                      ? "border-[#543119] bg-[#543119] text-white"
                      : "border-charcoal bg-white text-charcoal",
                  )}
                >
                  {selected ? "Selected" : "Select room"}
                </button>
              ) : null}

              <Link
                href={`/nivaara/rooms/${room.id}`}
                className="font-body text-xs lowercase tracking-[0.08em] text-charcoal underline underline-offset-4"
              >
                View details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showAssignmentDetails ? (
        <div className="space-y-4 border-t border-border px-6 py-5 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className="font-body text-xs text-grey sm:text-sm">
              <span className="font-medium uppercase tracking-[0.08em] text-charcoal">
                Stay total:
              </span>{" "}
              {formatRoomRate(rate.nightlyRate)} / room / night · fees &amp; taxes
              incl.
            </p>

            <div className="text-right">
              <p className="font-heading text-2xl font-thin text-charcoal sm:text-3xl">
                {formatRoomRate(totalCost)}
              </p>
              <p className="mt-1 font-body text-xs text-grey">
                For {stayNights} night{stayNights === 1 ? "" : "s"} and{" "}
                {assignedCount} room{assignedCount === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div>
            <p className="font-body text-xs font-medium uppercase tracking-[0.12em] text-grey">
              Rooms assigned to this category
            </p>

            <ul className="mt-3 space-y-3">
              {assignedRoomIndexes.map((index) => {
                const guestRoom = guests[index];
                if (!guestRoom) return null;

                const pax = guestRoom.adults + guestRoom.children;

                return (
                  <li
                    key={`${room.id}-guest-${index}`}
                    className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <div>
                      <p className="font-body text-sm font-medium text-charcoal">
                        Room {index + 1} · {pax} pax
                      </p>
                      <p className="mt-0.5 font-body text-xs text-grey sm:text-sm">
                        {formatOccupancy(guestRoom)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </article>
  );
}
