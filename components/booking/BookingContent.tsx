"use client";

import { differenceInCalendarDays } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookingLayout,
  useBookingFromParams,
  useBookingQueryString,
} from "@/components/booking/BookingLayout";
import { BookingRoomAssignmentList } from "@/components/booking/BookingRoomAssignmentList";
import { BookingRoomCategoryCard } from "@/components/booking/BookingRoomCategoryCard";
import { SectionIntro } from "@/components/ui/SectionIntro";
import {
  buildGuestsWithRoomSelections,
  calculateBookingTotal,
} from "@/lib/booking";
import { formatRoomRate, getAllRoomCategories } from "@/lib/rooms";

function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const booking = useBookingFromParams();
  const query = useBookingQueryString();

  const [roomSelections, setRoomSelections] = useState<(string | null)[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(() =>
    searchParams.get("roomCategory"),
  );

  useEffect(() => {
    if (!booking) {
      setRoomSelections([]);
      return;
    }

    setRoomSelections((current) =>
      booking.guests.map(
        (guest, index) => guest.roomCategoryId ?? current[index] ?? null,
      ),
    );

    if (booking.guests.length === 1) {
      setSelectedRoomId(
        booking.guests[0]?.roomCategoryId ?? searchParams.get("roomCategory"),
      );
    }
  }, [booking, searchParams]);

  const nights = booking
    ? Math.max(differenceInCalendarDays(booking.checkOut, booking.checkIn), 1)
    : 1;
  const isMultiRoom = (booking?.guests.length ?? 0) > 1;
  const allRoomsAssigned = isMultiRoom
    ? roomSelections.length === booking?.guests.length &&
      roomSelections.every(Boolean)
    : Boolean(selectedRoomId);

  const previewBooking =
    booking && isMultiRoom
      ? {
          ...booking,
          guests: buildGuestsWithRoomSelections(booking.guests, roomSelections),
        }
      : booking;

  const totalCost =
    previewBooking && isMultiRoom
      ? calculateBookingTotal(previewBooking, nights)
      : 0;

  function handleRoomAssignmentChange(index: number, roomCategoryId: string) {
    setRoomSelections((current) => {
      const next = [...current];
      next[index] = roomCategoryId;
      return next;
    });
  }

  function handleProceed() {
    if (!booking || !allRoomsAssigned) return;

    const params = new URLSearchParams(query);
    const guestsWithCategories = isMultiRoom
      ? buildGuestsWithRoomSelections(booking.guests, roomSelections)
      : buildGuestsWithRoomSelections(booking.guests, [selectedRoomId]);

    params.set("guests", JSON.stringify(guestsWithCategories));

    const primaryCategory =
      guestsWithCategories.find((room) => room.roomCategoryId)?.roomCategoryId ??
      selectedRoomId;

    if (primaryCategory) {
      params.set("roomCategory", primaryCategory);
    }

    router.push(`/nivaara/booking/details?${params.toString()}`);
  }

  return (
    <BookingLayout step={1}>
      {booking ? (
        <div className="mx-auto max-w-4xl">
          <SectionIntro
            label="Select a room"
            title={
              isMultiRoom
                ? "Choose a category for each room"
                : "Choose Your Room Category at Nivaãra"
            }
            description={
              isMultiRoom
                ? `You have ${booking.guests.length} rooms in this stay. Pick a view category for each room below, then continue when every room is assigned.`
                : "Thoughtfully designed rooms at Nivaãra by GHD Hotels — offered across three honest view categories. Select one to continue."
            }
            align="left"
            titleAs="h2"
            className="text-left"
          />

          {isMultiRoom ? (
            <>
              <div className="mt-8 md:mt-10">
                <BookingRoomAssignmentList
                  guests={booking.guests}
                  selections={roomSelections}
                  nights={nights}
                  onChange={handleRoomAssignmentChange}
                />
              </div>

              {allRoomsAssigned ? (
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border border-border bg-muted/20 px-5 py-4 sm:px-6">
                  <div>
                    <p className="font-body text-xs font-medium uppercase tracking-[0.12em] text-grey">
                      Stay total
                    </p>
                    <p className="mt-1 font-heading text-2xl font-thin text-charcoal sm:text-3xl">
                      {formatInr(totalCost)}
                    </p>
                  </div>
                  <p className="font-body text-sm text-charcoal/70">
                    {formatRoomRate(totalCost / Math.max(nights, 1) / booking.guests.length)}{" "}
                    avg / room / night · fees &amp; taxes incl.
                  </p>
                </div>
              ) : null}

              <div className="mt-10">
                <h3 className="font-heading text-xl font-thin text-charcoal sm:text-2xl">
                  Explore room categories
                </h3>
                <p className="mt-2 font-body text-sm text-charcoal/70">
                  Compare layouts, views, and in-room details before you assign
                  each room above.
                </p>

                <div className="mt-6 flex flex-col gap-8 md:gap-10">
                  {getAllRoomCategories().map((room) => (
                    <BookingRoomCategoryCard
                      key={room.id}
                      room={room}
                      guests={booking.guests}
                      nights={nights}
                      assignedRoomIndexes={roomSelections
                        .map((selection, index) =>
                          selection === room.id ? index : -1,
                        )
                        .filter((index) => index >= 0)}
                      selectable={false}
                      selected={false}
                      onSelect={() => {}}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="mt-8 flex flex-col gap-8 md:mt-10 md:gap-10">
              {getAllRoomCategories().map((room) => (
                <BookingRoomCategoryCard
                  key={room.id}
                  room={room}
                  guests={booking.guests}
                  nights={nights}
                  assignedRoomIndexes={
                    selectedRoomId === room.id ? [0] : []
                  }
                  selected={selectedRoomId === room.id}
                  onSelect={() => setSelectedRoomId(room.id)}
                />
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-end">
            <button
              type="button"
              onClick={handleProceed}
              disabled={!allRoomsAssigned}
              className="inline-flex h-12 min-w-[15rem] items-center justify-center rounded-none bg-[#543119] px-8 font-body text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#543119]/90 disabled:cursor-not-allowed disabled:opacity-60 sm:text-xs"
            >
              Proceed
            </button>
          </div>
        </div>
      ) : null}
    </BookingLayout>
  );
}
