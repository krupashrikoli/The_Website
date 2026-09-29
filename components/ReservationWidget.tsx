"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LuxurySelect } from "@/components/reservation/LuxurySelect";
import { DateRangePicker } from "@/components/reservation/DateRangePicker";
import {
  DEFAULT_GUEST_SELECTION,
  GuestRoomPicker,
  type GuestSelection,
} from "@/components/reservation/GuestRoomPicker";
import {
  reservationDividerClass,
  searchSegmentClass,
} from "@/components/reservation/fieldStyles";
import { submitAxisRoomsBookingSearch, buildBookingSearchParams, getDefaultReservationDates } from "@/lib/booking";
import { AVAILABLE_PROPERTIES, DEFAULT_PROPERTY_ID } from "@/lib/constants";
import { cn } from "@/lib/utils";

const defaultPropertyOptions = AVAILABLE_PROPERTIES.map((p) => ({
  value: p.id,
  label: p.name,
}));

function getValidationErrors(
  property: string,
  checkIn: Date | undefined,
  checkOut: Date | undefined,
) {
  const errors: string[] = [];

  if (!property) {
    errors.push("Please select a hotel.");
  }
  if (!checkIn) {
    errors.push("Please select a check-in date.");
  }
  if (!checkOut) {
    errors.push("Please select a check-out date.");
  }

  return errors;
}

type PropertyOption = { value: string; label: string };

type ReservationBarProps = {
  className?: string;
  initialProperty?: string;
  initialGuests?: GuestSelection;
  initialCheckIn?: Date;
  initialCheckOut?: Date;
  guestsPickerOpen?: boolean;
  onGuestsPickerOpenChange?: (open: boolean) => void;
  onSearch?: (params: URLSearchParams) => void;
  propertyOptions?: readonly PropertyOption[];
  propertyPlaceholder?: string;
  resolvePropertyId?: (value: string) => string;
  bookingRedirect?: "internal" | "axisrooms";
  /** Location-only bar (corporate homepage): destination + Visit */
  fields?: "full" | "location";
  submitLabel?: string;
  onVisit?: (property: string) => void;
};

type ReservationFormProps = {
  property: string;
  guests: GuestSelection;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  validationErrors: string[];
  onPropertyChange: (value: string) => void;
  onGuestsChange: (value: GuestSelection) => void;
  onDatesChange: (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  onSubmit: () => void;
  onDismissErrors: () => void;
  guestsPickerOpen?: boolean;
  onGuestsPickerOpenChange?: (open: boolean) => void;
  variant?: "hero" | "booking";
  propertyOptions: readonly PropertyOption[];
  propertyPlaceholder: string;
  fields?: "full" | "location";
  submitLabel?: string;
};

function ReservationForm({
  property,
  guests,
  checkIn,
  checkOut,
  validationErrors,
  onPropertyChange,
  onGuestsChange,
  onDatesChange,
  onSubmit,
  onDismissErrors,
  guestsPickerOpen,
  onGuestsPickerOpenChange,
  variant = "hero",
  propertyOptions,
  propertyPlaceholder,
  fields = "full",
  submitLabel = "Search",
}: ReservationFormProps) {
  const isHero = variant === "hero";
  const locationOnly = fields === "location";

  return (
    <div
      className={cn(
        "reservation-ui uppercase group/reservation relative z-20 mx-auto w-full overflow-visible rounded-md transition-all duration-500 ease-out",
        isHero
          ? "bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl hover:bg-white/65 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          : "border border-border bg-white shadow-[0_12px_40px_rgba(17,17,17,0.08)]",
      )}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex h-[4.25rem] w-full min-w-0 flex-nowrap overflow-visible md:h-[5rem]"
      >
        <LuxurySelect
          placeholder={propertyPlaceholder}
          value={property}
          options={propertyOptions}
          onChange={(value) => {
            onDismissErrors();
            onPropertyChange(value);
          }}
          variant={isHero ? "hero" : "default"}
          className={locationOnly ? "min-w-0 flex-1" : "md:flex-[1.1]"}
        />

        {!locationOnly ? (
          <>
            <div className={reservationDividerClass} aria-hidden />

            <DateRangePicker
              checkIn={checkIn}
              checkOut={checkOut}
              onChange={(range) => {
                onDismissErrors();
                onDatesChange(range);
              }}
              variant={isHero ? "hero" : "default"}
              className="md:flex-[1.6]"
            />

            <div className={reservationDividerClass} aria-hidden />

            <GuestRoomPicker
              value={guests}
              onChange={onGuestsChange}
              open={guestsPickerOpen}
              onOpenChange={onGuestsPickerOpenChange}
              variant={isHero ? "hero" : "default"}
              className="md:flex-[1.2]"
            />
          </>
        ) : null}

        <div
          className={cn(
            searchSegmentClass,
            "relative z-30",
            locationOnly ? "w-auto shrink-0 flex-none" : "md:flex-1",
          )}
        >
          {validationErrors.length > 0 ? (
            <div className="absolute bottom-[calc(100%+0.625rem)] right-0 z-[60] flex flex-col items-end">
              <div
                role="alert"
                className="w-48 rounded-none border border-border bg-white px-3 py-2.5 text-left normal-case shadow-[0_10px_28px_rgba(17,17,17,0.14)] sm:w-56"
              >
                <ul className="space-y-1">
                  {validationErrors.map((error) => (
                    <li
                      key={error}
                      className="font-body text-[0.65rem] font-normal leading-snug text-red-600 sm:text-xs"
                    >
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="-mt-px mr-6 h-2.5 w-2.5 rotate-45 border-r border-b border-border bg-white shadow-[2px_2px_4px_rgba(17,17,17,0.06)]"
                aria-hidden
              />
            </div>
          ) : null}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "inline-flex h-10 shrink-0 items-center justify-center rounded-none px-5 font-body text-[0.7rem] font-normal uppercase tracking-[0.08em] transition-colors duration-500 ease-out sm:h-11 sm:px-6",
              isHero
                ? "bg-white text-charcoal hover:bg-white/90 group-hover/reservation:bg-charcoal group-hover/reservation:text-white group-hover/reservation:hover:bg-charcoal/90"
                : "bg-[#E8D9B0] text-[#2D2D2D] hover:bg-[#DFCFA0]",
            )}
          >
            {submitLabel}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export function ReservationBar({
  className,
  initialProperty = DEFAULT_PROPERTY_ID,
  initialGuests = DEFAULT_GUEST_SELECTION,
  initialCheckIn,
  initialCheckOut,
  guestsPickerOpen,
  onGuestsPickerOpenChange,
  onSearch,
  propertyOptions = defaultPropertyOptions,
  propertyPlaceholder = "Search Hotels",
  resolvePropertyId = (value) => value,
  bookingRedirect = "internal",
  variant = "hero",
  fields = "full",
  submitLabel = "Search",
  onVisit,
}: ReservationBarProps & { variant?: "hero" | "booking" }) {
  const router = useRouter();
  const defaultDates = getDefaultReservationDates();
  const [property, setProperty] = useState(initialProperty);
  const [guests, setGuests] = useState<GuestSelection>(initialGuests);
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    initialCheckIn ?? defaultDates.checkIn,
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    initialCheckOut ?? defaultDates.checkOut,
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    const dates = getDefaultReservationDates();
    setProperty(initialProperty);
    setGuests(initialGuests);
    setCheckIn(initialCheckIn ?? dates.checkIn);
    setCheckOut(initialCheckOut ?? dates.checkOut);
    setValidationErrors([]);
  }, [initialProperty, initialGuests, initialCheckIn, initialCheckOut]);

  const handleSearch = () => {
    if (fields === "location") {
      if (!property) {
        setValidationErrors(["Please select a hotel."]);
        return;
      }

      setValidationErrors([]);
      const propertyId = resolvePropertyId(property);

      if (onVisit) {
        onVisit(propertyId);
        return;
      }

      router.push(`/${propertyId}`);
      return;
    }

    const errors = getValidationErrors(property, checkIn, checkOut);

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);

    const params = buildBookingSearchParams({
      property: resolvePropertyId(property),
      guests,
      checkIn: checkIn!,
      checkOut: checkOut!,
    });

    if (onSearch) {
      onSearch(params);
      return;
    }

    if (bookingRedirect === "axisrooms") {
      submitAxisRoomsBookingSearch({
        guests,
        checkIn: checkIn!,
        checkOut: checkOut!,
      });
      return;
    }

    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className={className}>
      <ReservationForm
        property={property}
        guests={guests}
        checkIn={checkIn}
        checkOut={checkOut}
        validationErrors={validationErrors}
        onPropertyChange={setProperty}
        onGuestsChange={setGuests}
        onDatesChange={({ from, to }) => {
          setCheckIn(from);
          setCheckOut(to);
        }}
        onSubmit={handleSearch}
        onDismissErrors={() => setValidationErrors([])}
        guestsPickerOpen={guestsPickerOpen}
        onGuestsPickerOpenChange={onGuestsPickerOpenChange}
        variant={variant}
        propertyOptions={propertyOptions}
        propertyPlaceholder={propertyPlaceholder}
        fields={fields}
        submitLabel={submitLabel}
      />
    </div>
  );
}

export function ReservationWidget() {
  return <ReservationBar />;
}
