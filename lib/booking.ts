import { addDays, startOfDay } from "date-fns";
import type { GuestSelection } from "@/components/reservation/GuestRoomPicker";
import { DEFAULT_GUEST_SELECTION } from "@/components/reservation/GuestRoomPicker";
import { AXISROOMS_BOOKING_URL } from "@/lib/constants";

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

export function getDefaultGuestSelection(): GuestSelection {
  return DEFAULT_GUEST_SELECTION.map((room) => ({ ...room }));
}

export function getDefaultReservationDates() {
  const checkIn = startOfDay(new Date());
  const checkOut = addDays(checkIn, 1);
  return { checkIn, checkOut };
}

export function getDefaultBookingHref(): string {
  return AXISROOMS_BOOKING_URL;
}
