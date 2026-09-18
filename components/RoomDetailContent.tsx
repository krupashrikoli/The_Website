import Image from "next/image";
import Link from "next/link";
import { RoomGallery } from "@/components/RoomGallery";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ReserveButton } from "@/components/ui/ReserveButton";
import { AXISROOMS_BOOKING_URL, ROYAL_STUDIO } from "@/lib/constants";
import type { RoomCategory } from "@/lib/rooms";
import { sectionBodyClass, sectionHeadingClass } from "@/lib/section-typography";

function DetailBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-l-2 border-[#543119] pl-4">
      <p className="font-body text-[10px] font-medium uppercase tracking-[0.16em] text-grey">
        {label}
      </p>
      <p className="mt-1 font-heading text-lg font-thin text-charcoal sm:text-xl">
        {value}
      </p>
    </div>
  );
}

export function RoomDetailContent({ room }: { room: RoomCategory }) {
  return (
    <>
      <section className="bg-muted pt-16">
        <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[2.2/1]">
          <Image
            src={room.image}
            alt={room.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      <section className="bg-white px-6 py-14 md:py-20 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/rooms"
            className="inline-flex font-body text-xs font-medium uppercase tracking-[0.14em] text-charcoal transition-colors hover:text-[#543119]"
          >
            ← All rooms
          </Link>

          <div className="mt-8">
            <h1 className="font-heading text-4xl font-thin text-charcoal sm:text-5xl">
              {room.name}
            </h1>
          </div>

          <h2 className={sectionHeadingClass(false, "mt-8 text-left")}>
            {room.headline}
          </h2>

          <p className={sectionBodyClass(false, "mt-5 text-left")}>
            {room.description}
          </p>

          <p className="mt-6 font-body text-sm font-medium text-[#543119] sm:text-base">
            {room.highlights.join(" • ")}
          </p>

          <div className="mt-8">
            <ReserveButton
              variant="gold"
              label="Reserve Now"
              href={AXISROOMS_BOOKING_URL}
            />
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <DetailBlock label="Bed" value={room.beds} />
            <DetailBlock
              label="Occupancy"
              value={`Sleeps ${room.sleeps}`}
            />
            <DetailBlock label="Size" value={room.size} />
          </div>

          <div className="mt-12">
            <SectionLabel>Gallery</SectionLabel>
            <h3 className={sectionHeadingClass(false, "mt-3 text-left")}>
              Inside the {room.name}
            </h3>
            <RoomGallery images={room.gallery} variant="strip" className="mt-6" />
          </div>

          <div className="mt-12 border-t border-border pt-12">
            <SectionLabel>Amenities</SectionLabel>
            <h3 className={sectionHeadingClass(false, "mt-3 text-left")}>
              Room comforts
            </h3>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {ROYAL_STUDIO.amenities.map((amenity) => (
                <li
                  key={amenity}
                  className="border border-border bg-muted/30 px-4 py-3 font-body text-sm font-light text-charcoal"
                >
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 border-t border-border pt-12">
            <SectionLabel>During your stay</SectionLabel>
            <h3 className={sectionHeadingClass(false, "mt-3 text-left")}>
              House rules &amp; timings
            </h3>

            <div className="mt-8 border border-border bg-muted/30 p-6 sm:p-8">
              <h4 className="font-body text-xs font-medium uppercase tracking-[0.16em] text-charcoal">
                Timings
              </h4>
              <ul className="mt-4 space-y-3">
                {ROYAL_STUDIO.duringStay.timings.map((timing) => (
                  <li
                    key={timing.label}
                    className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="font-body text-sm font-medium text-charcoal">
                      {timing.label}
                    </span>
                    <span className="text-right font-body text-sm font-light text-grey">
                      {timing.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="mt-6 space-y-3">
              {ROYAL_STUDIO.duringStay.guidelines.map((guideline) => (
                <li
                  key={guideline}
                  className={sectionBodyClass(false, "mt-0 text-left")}
                >
                  {guideline}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <ReserveButton
                variant="gold"
                label="Reserve Now"
                href={AXISROOMS_BOOKING_URL}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
