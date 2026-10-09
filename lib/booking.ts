import { addDays, startOfDay } from "date-fns";
import type { GuestSelection } from "@/components/reservation/GuestRoomPicker";
import {
  DEFAULT_GUEST_SELECTION,
  clampRoomGuests,
  MAX_ROOMS,
} from "@/components/reservation/GuestRoomPicker";
import {
  AXISROOMS_BOOKING_URL,
  DEFAULT_PROPERTY_ID,
  ROOM_CATEGORIES,
} from "@/lib/constants";
import { getRoomCategoryById, getRoomCategoryNightlyRate } from "@/lib/rooms";

export type BookingSearch = {
  property: string;
  roomCategoryId: string;
  checkIn: Date;
  checkOut: Date;
  rooms: number;
  adults: number;
  children: number;
  guests: GuestSelection;
};

export function getBookingRoomCategory(booking: BookingSearch) {
  return (
    getRoomCategoryForSlot(booking, 0) ?? ROOM_CATEGORIES[0]
  );
}

export function getRoomCategoryForSlot(booking: BookingSearch, index: number) {
  const roomCategoryId =
    booking.guests[index]?.roomCategoryId ?? booking.roomCategoryId;

  return getRoomCategoryById(roomCategoryId) ?? ROOM_CATEGORIES[0];
}

export function getRoomSelections(booking: BookingSearch): (string | null)[] {
  return booking.guests.map(
    (room) => room.roomCategoryId ?? null,
  );
}

export function areAllRoomsAssigned(booking: BookingSearch): boolean {
  return booking.guests.every((room) => Boolean(room.roomCategoryId));
}

export function calculateStayTotal(
  nightlyRate: number,
  roomCount: number,
  nights: number,
) {
  return nightlyRate * roomCount * Math.max(nights, 1);
}

export function calculateBookingTotal(booking: BookingSearch, nights: number) {
  const stayNights = Math.max(nights, 1);

  return booking.guests.reduce((sum, _room, index) => {
    const category = getRoomCategoryForSlot(booking, index);
    const { nightlyRate } = getRoomCategoryNightlyRate(category);
    return sum + nightlyRate * stayNights;
  }, 0);
}

function parseGuestSelection(
  guestsParam: string | null,
  rooms: number,
  adults: number,
  children: number,
): GuestSelection {
  if (guestsParam) {
    try {
      const parsed = JSON.parse(guestsParam) as GuestSelection;
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        parsed.every(
          (room) =>
            typeof room?.adults === "number" &&
            typeof room?.children === "number" &&
            (room.roomCategoryId === undefined ||
              typeof room.roomCategoryId === "string"),
        )
      ) {
        return parsed.map((room) =>
          clampRoomGuests({
            adults: room.adults,
            children: room.children,
            ...(room.roomCategoryId ? { roomCategoryId: room.roomCategoryId } : {}),
          }),
        );
      }
    } catch {
      // Fall through to reconstructed guest selection.
    }
  }

  if (rooms <= 1) {
    return [
      clampRoomGuests({
        adults: Math.max(adults, 1),
        children: Math.max(children, 0),
      }),
    ];
  }

  const selection: GuestSelection = Array.from({ length: rooms }, () =>
    clampRoomGuests({ adults: 1, children: 0 }),
  );

  selection[0] = clampRoomGuests({
    adults: Math.max(adults, 1),
    children: Math.max(children, 0),
  });

  return selection;
}

export function parseBookingSearchParams(
  searchParams: URLSearchParams,
): BookingSearch | null {
  const property = searchParams.get("property");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  if (!property || !checkIn || !checkOut) {
    return null;
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (
    Number.isNaN(checkInDate.getTime()) ||
    Number.isNaN(checkOutDate.getTime())
  ) {
    return null;
  }

  const rooms = Number(searchParams.get("rooms") ?? 1);
  const adults = Number(searchParams.get("adults") ?? 2);
  const children = Number(searchParams.get("children") ?? 0);
  const fallbackRoomCategoryId =
    searchParams.get("roomCategory") ?? ROOM_CATEGORIES[0].id;
  const parsedGuests = parseGuestSelection(
    searchParams.get("guests"),
    rooms,
    adults,
    children,
  );
  const guests =
    parsedGuests.length === 1
      ? parsedGuests.map((room) => ({
          ...room,
          roomCategoryId: room.roomCategoryId ?? fallbackRoomCategoryId,
        }))
      : parsedGuests;

  return {
    property,
    roomCategoryId: guests[0]?.roomCategoryId ?? fallbackRoomCategoryId,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    rooms: Number.isNaN(rooms) || rooms < 1 ? 1 : rooms,
    adults: Number.isNaN(adults) || adults < 1 ? 2 : adults,
    children: Number.isNaN(children) || children < 0 ? 0 : children,
    guests,
  };
}

export function buildBookingSearchParams(booking: {
  property: string;
  roomCategoryId?: string;
  guests: GuestSelection;
  checkIn: Date;
  checkOut: Date;
}): URLSearchParams {
  const adults = booking.guests.reduce((sum, room) => sum + room.adults, 0);
  const children = booking.guests.reduce((sum, room) => sum + room.children, 0);

  const params: Record<string, string> = {
    property: booking.property,
    rooms: String(booking.guests.length),
    adults: String(adults),
    children: String(children),
    guests: JSON.stringify(booking.guests),
    checkIn: booking.checkIn.toISOString(),
    checkOut: booking.checkOut.toISOString(),
  };

  const primaryRoomCategory =
    booking.guests.find((room) => room.roomCategoryId)?.roomCategoryId ??
    booking.roomCategoryId;

  if (primaryRoomCategory) {
    params.roomCategory = primaryRoomCategory;
  }

  return new URLSearchParams(params);
}

export { buildAxisRoomsBookingHref, submitAxisRoomsBookingSearch } from "@/lib/axisrooms";

export function buildGuestsWithRoomSelections(
  guests: GuestSelection,
  selections: (string | null)[],
): GuestSelection {
  return guests.map((room, index) => ({
    adults: room.adults,
    children: room.children,
    ...(selections[index] ? { roomCategoryId: selections[index]! } : {}),
  }));
}

export function getDefaultGuestSelection(): GuestSelection {
  return DEFAULT_GUEST_SELECTION.map((room) => ({ ...room }));
}

export function getDefaultReservationDates() {
  const checkIn = startOfDay(new Date());
  const checkOut = addDays(checkIn, 1);
  return { checkIn, checkOut };
}

export const BOOKING_OPEN_GUESTS_PARAM = "openGuests";

export function canAddBookingRoom(booking: BookingSearch): boolean {
  return booking.guests.length < MAX_ROOMS;
}

export function buildAddRoomBookingHref(booking: BookingSearch): string | null {
  if (!canAddBookingRoom(booking)) {
    return null;
  }

  const params = buildBookingSearchParams({
    property: booking.property,
    guests: [...booking.guests, { adults: 1, children: 0 }],
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
  });

  params.set(BOOKING_OPEN_GUESTS_PARAM, "1");

  return `/nivaara/booking?${params.toString()}`;
}

export function getDefaultBookingHref(): string {
  return AXISROOMS_BOOKING_URL;
}
