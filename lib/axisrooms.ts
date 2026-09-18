import { format, startOfDay } from "date-fns";
import type { GuestSelection } from "@/components/reservation/GuestRoomPicker";
import {
  AXISROOMS_BOOKING_ENGINE_ID,
  AXISROOMS_BOOKING_URL,
  AXISROOMS_PRODUCT_ID,
  AXISROOMS_SEARCH_BASE_URL,
} from "@/lib/constants";

/**
 * Official Nivaãra AxisRooms booking engine URL.
 * https://be.axisrooms.com/search?bookingEngineId=5044
 *
 * Search / form fields (when pre-filling dates & occupancy):
 * - paxInfo — pipe-delimited occupancy per room (e.g. `2|0||` = 2 adults, 0 children)
 * - fromdate, todate — DD/MM/YYYY
 * - rooms, productId, bookingEngineId, allHotels, newBe
 */
export const OFFICIAL_AXISROOMS_BOOKING_URL = AXISROOMS_BOOKING_URL;

export type AxisRoomsSearchPayload = {
  guests: GuestSelection;
  checkIn: Date;
  checkOut: Date;
};

function formatAxisRoomsDate(date: Date): string {
  return format(startOfDay(date), "dd/MM/yyyy");
}

/** Default occupancy when no guest data is supplied. */
export function buildAxisRoomsPaxInfo(guests: GuestSelection): string {
  if (guests.length === 0) {
    return "2|0||";
  }

  return guests.map((room) => `${room.adults}|${room.children}||`).join("");
}

function getAxisRoomsSearchFields(booking: AxisRoomsSearchPayload): Record<string, string> {
  return {
    paxInfo: buildAxisRoomsPaxInfo(booking.guests),
    allHotels: "true",
    newBe: "true",
    productId: AXISROOMS_PRODUCT_ID,
    bookingEngineId: AXISROOMS_BOOKING_ENGINE_ID,
    rooms: String(Math.max(booking.guests.length, 1)),
    fromdate: formatAxisRoomsDate(booking.checkIn),
    todate: formatAxisRoomsDate(booking.checkOut),
    dorm: "false",
    searchPageList: "true",
  };
}

export function buildAxisRoomsBookingHref(booking: AxisRoomsSearchPayload): string {
  const url = new URL(AXISROOMS_SEARCH_BASE_URL);
  const fields = getAxisRoomsSearchFields(booking);

  for (const [key, value] of Object.entries(fields)) {
    url.searchParams.set(key, value);
  }

  url.searchParams.set("searchId", "-1");
  url.searchParams.set("searchNumber", "1");

  return url.toString();
}

/** Client-only: POST to AxisRooms so dates and rooms pre-fill the booking engine form. */
export function submitAxisRoomsBookingSearch(booking: AxisRoomsSearchPayload): void {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = `${AXISROOMS_SEARCH_BASE_URL}?bookingEngineId=${AXISROOMS_BOOKING_ENGINE_ID}`;
  form.acceptCharset = "UTF-8";

  const fields = getAxisRoomsSearchFields(booking);

  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}
