import {
  GUEST_CARE_CONTACT,
  HOTEL_CHECK_IN_TIME,
  HOTEL_CHECK_OUT_TIME,
  HOTEL_POOL_HOURS,
  NIVAARA_CONTACT,
  SITE,
} from "@/lib/constants";
import type { LegalDocument } from "@/lib/legal-document";

export const TERMS_AND_CONDITIONS: LegalDocument = {
  title: "Hotel Policy & Booking Conditions",
  summaryTitle: "GHD Hotels LLP · Nivaãra by GHD Hotels, Nerul, Goa",
  contactEmail: SITE.email,
  contactEmailHref: SITE.emailHref,
  website: NIVAARA_CONTACT.website,
  websiteHref: NIVAARA_CONTACT.websiteHref,
  dateLabel: "Effective",
  lastUpdated: "June 2026",
  closingNote:
    "These Terms & Conditions are effective from June 2026 and supersede all previous versions.",
  sections: [
    {
      id: "check-in-check-out",
      title: "1. Check-In & Check-Out Policy",
      callouts: [
        `Check-In: ${HOTEL_CHECK_IN_TIME}`,
        `Check-Out: ${HOTEL_CHECK_OUT_TIME}`,
      ],
      paragraphs: [],
      subsections: [
        {
          title: "Mandatory Identification",
          paragraphs: [
            "All guests must present valid identification at the time of check-in:",
          ],
          bullets: [
            "Government-issued photo identification for Indian nationals.",
            "Valid Passport and Visa for foreign nationals, in accordance with applicable government regulations.",
          ],
        },
        {
          title: "Early Check-In & Late Check-Out",
          paragraphs: [
            "Early check-in and late check-out are subject to room availability and shall attract additional charges, as applicable.",
            "Guests are requested to inform the Front Desk in advance. Approval and any applicable fees shall be at the sole discretion of hotel management.",
          ],
        },
      ],
    },
    {
      id: "child-policy",
      title: "2. Child Policy",
      paragraphs: [],
      subsections: [
        {
          title: "Children below 6 years",
          paragraphs: [
            "Complimentary stay when sharing existing bedding with parents (without an extra mattress).",
          ],
        },
        {
          title: "Children between 6–11 years",
          paragraphs: [
            "Charged as per the applicable contracted child rate, including one extra mattress.",
          ],
        },
        {
          title: "Children aged 12 years and above",
          paragraphs: ["Considered adults and charged accordingly."],
        },
      ],
    },
    {
      id: "extra-bed-occupancy",
      title: "3. Extra Bed & Occupancy Policy",
      paragraphs: [
        "The standard occupancy is of two adults per room.",
        "One extra bed or mattress may be provided upon prior request, subject to room category and availability, at an additional charge.",
        "Only one additional adult may be accommodated in eligible room categories. Under no circumstances shall the maximum permitted occupancy of the room be exceeded.",
        "Maximum of 3 adults and 1 child (without extra mattress) can be accommodated in one room.",
      ],
    },
    {
      id: "booking-procedure",
      title: "4. Booking Procedure",
      paragraphs: [],
      bullets: [
        "All reservations must be made through email or an approved booking platform.",
        "Reservations shall be considered confirmed only after written confirmation from Nivaãra by GHD Hotels.",
        "Voucher number and complete guest details are mandatory.",
        "Last-minute reservations are subject to room availability.",
      ],
      footer: `Reservation Email: ${NIVAARA_CONTACT.reservationEmail}\nReservation No.: ${NIVAARA_CONTACT.reservationPhones[0].display}\nWebsite: ${NIVAARA_CONTACT.website}`,
    },
    {
      id: "cancellation-retention",
      title: "5. Cancellation & Retention Policy",
      paragraphs: [
        `All cancellation requests must be submitted in writing via email to ${NIVAARA_CONTACT.reservationEmail}.`,
        "The following cancellation charges shall apply:",
      ],
      bullets: [
        "More than 72 hours prior to the scheduled check-in: 100% refund of the booking amount.",
        "Between 72 hours and 48 hours prior to check-in: 50% retention of the total booking value (50% refund).",
        "Less than 48 hours prior to check-in: 100% retention (no refund).",
        "No Show: 100% retention.",
        "Early Check-Out: No refund shall be applicable for unused room nights.",
        "Refunds, where applicable, shall be processed through the original mode of payment within the standard processing timelines.",
      ],
    },
    {
      id: "amendment-policy",
      title: "6. Amendment Policy",
      paragraphs: ["Guests may amend their reservation subject to the following conditions:"],
      bullets: [
        "A booking may be amended only once.",
        "Amendments must be requested at least 72 hours prior to the scheduled check-in.",
        "The revised check-in date must fall within 60 days from the original check-in date.",
        "Requests to amend beyond the 60-day window shall be treated as a cancellation.",
        "A second amendment request for the same reservation will not be permitted and shall be treated as a cancellation.",
        "Amendment requests received less than 72 hours before check-in shall be governed by the Cancellation & Retention Policy stated above.",
        `All amendment requests must be submitted in writing to ${NIVAARA_CONTACT.reservationEmail} and remain subject to room availability and applicable rate differences.`,
      ],
    },
    {
      id: "parking",
      title: "7. Parking",
      paragraphs: [
        "Parking is available in the vicinity of the property, subject to availability.",
        "Guests are requested to contact the Front Desk approximately 10–15 minutes prior to arrival for parking assistance.",
        "All vehicles are parked solely at the owner's risk. Guests are entirely responsible for the safety, security, and contents of their vehicles. GHD Hotels LLP shall not be liable for any loss, theft, damage, accident, or claims arising in relation to vehicles parked on or near the hotel premises, regardless of the cause.",
      ],
    },
    {
      id: "special-requests",
      title: "8. Special Requests",
      paragraphs: [
        "Nivaãra by GHD Hotels will make every reasonable effort to accommodate special requests received at the time of booking, including room preferences, bedding preferences, dietary requirements, and celebration arrangements.",
        "However, all such requests are subject to availability upon arrival and cannot be guaranteed. Failure to accommodate any special request shall not constitute grounds for compensation or cancellation without applicable charges.",
      ],
    },
    {
      id: "personal-belongings",
      title: "9. Personal Belongings",
      paragraphs: [
        "Guests are solely responsible for the safekeeping of their personal belongings, valuables, cash, jewellery, electronic devices, and luggage during their stay.",
        "GHD Hotels shall not be liable for any loss, theft, or damage occurring within guest rooms, public areas, or parking facilities. Guests are encouraged to use in-room safes where available.",
      ],
    },
    {
      id: "cctv-surveillance",
      title: "10. CCTV Surveillance",
      paragraphs: [
        "For the safety and security of guests, visitors, employees, and hotel assets, CCTV surveillance operates in designated public and common areas throughout the property.",
        "By entering the premises, guests acknowledge and consent to such monitoring. CCTV cameras are not installed inside guest rooms or other private areas.",
        "Recorded footage may be retained and used where required for security, operational, or legal purposes, in accordance with applicable laws.",
      ],
    },
    {
      id: "property-damage",
      title: "11. Hotel Property & Damage Policy",
      paragraphs: [
        "Guests shall be responsible for any loss, damage, or excessive cleaning required as a result of their actions or those of their invitees during their stay.",
      ],
      subsections: [
        {
          title: "Room Key Card",
          paragraphs: [
            "The electronic room key card remains the property of GHD Hotels LLP at all times and is issued solely for the guest's convenience during their stay. Guests are requested to return the key card to the Front Desk upon check-out or when vacating the room. The hotel reserves the right to levy a replacement charge for any lost, damaged, or unreturned key card.",
          ],
        },
        {
          title: "Damage to Hotel Property",
          paragraphs: [
            "Guests shall be responsible for any loss, damage, misuse, or breakage of hotel property, including but not limited to guest rooms, fixtures, fittings, furniture, furnishings, equipment, appliances, linen, décor, and amenities, caused by themselves or any person associated with their stay.",
            "The hotel reserves the right to assess the extent of the damage and recover the full cost of repair, replacement, restoration, or deep cleaning, including any consequential losses arising from damage caused to hotel property, furnishings, fixtures, equipment, or linen, as determined by the hotel. Such charges shall be payable immediately upon demand or, at the latest, prior to check-out.",
            "Any damage resulting in a room being temporarily unavailable for sale may also attract additional charges for the resulting loss of revenue, where applicable.",
            "Any illegal activity, misuse of hotel facilities, deliberate damage, theft, vandalism, or violation of applicable laws may result in immediate termination of the stay without refund and may be reported to the appropriate law enforcement authorities.",
          ],
        },
      ],
    },
    {
      id: "visitor-policy",
      title: "12. Visitor Policy",
      paragraphs: [
        "For the safety, privacy, and comfort of all guests:",
      ],
      bullets: [
        "Visitors who are not registered occupants are permitted only up to the Reception/Lobby area.",
        "Visitors are not permitted inside guest rooms or residential areas of the property.",
        "Any exceptions shall be solely at the discretion of hotel management and may require visitor registration and valid identification.",
      ],
    },
    {
      id: "force-majeure",
      title: "13. Force Majeure",
      paragraphs: [
        "GHD Hotels shall not be responsible for any failure or delay in fulfilling its obligations where such failure arises due to events beyond its reasonable control, including but not limited to natural disasters, floods, storms, fire, pandemics, epidemics, acts of terrorism, civil disturbances, labour disputes, government restrictions, war, or other force majeure events.",
        "Each party shall bear its own costs arising from such events.",
      ],
    },
    {
      id: "house-rules",
      title: "14. General House Rules & Guest Conduct",
      paragraphs: [
        "To ensure a comfortable and enjoyable stay for all guests, the following rules shall apply:",
      ],
      subsections: [
        {
          title: "Outside Food & Liquor",
          paragraphs: [
            "Guests may bring outside food and alcoholic beverages onto the property.",
            "However:",
          ],
          bullets: [
            "Consumption of outside food and alcoholic beverages is strictly permitted only inside the guest's room.",
            "Consumption in corridors, lobby, pool areas, restaurants, parking areas, or any other common or public area of the property is strictly prohibited.",
            "The hotel reserves the right to request removal of such items from public areas.",
          ],
        },
        {
          title: "Smoking Policy",
          paragraphs: [
            "Smoking is permitted only on the private balcony attached to the guest room, where applicable.",
            "Smoking is strictly prohibited inside guest rooms and throughout all indoor and common areas of the property.",
            "Any violation may attract cleaning, deodorization, and damage recovery charges.",
          ],
        },
        {
          title: "Quiet Hours",
          paragraphs: [
            "Quiet hours are observed from 10:00 PM to 8:00 AM daily. During this period, guests are expected to keep noise to a minimum in guest rooms, corridors, balconies, and all common areas so that every guest may rest undisturbed.",
          ],
        },
        {
          title: "Noise & Behaviour",
          paragraphs: [
            "Outside of quiet hours, guests are still expected to maintain reasonable noise levels at all times.",
            "The hotel reserves the right to refuse service or terminate a stay without refund in cases of disorderly conduct, excessive noise, intoxication causing disturbance, illegal activities, or behaviour that affects the comfort, safety, or privacy of other guests.",
          ],
        },
        {
          title: "Pets",
          paragraphs: [
            "Pets are not permitted unless expressly approved in writing by GHD Hotels prior to arrival.",
          ],
        },
      ],
    },
    {
      id: "pool-rules",
      title: "15. Swimming Pool Rules & Regulations",
      paragraphs: [],
      bullets: [
        `Pool timings must be strictly followed: ${HOTEL_POOL_HOURS.replace("–", "to")}.`,
        "Shower before entering the pool.",
        "Proper swimwear is compulsory.",
        "No entry in regular clothes or shoes.",
        "Children must be accompanied by parents or guardians.",
        "No diving in shallow areas.",
        "Running, pushing, or rough play is not allowed near the pool.",
        "No food or drinks inside the pool area.",
        "Glass items are strictly prohibited.",
        "Smoking and alcohol consumption are not allowed near the pool.",
        "Use the pool at your own risk.",
        "Guests with skin infections or open wounds should not enter the pool.",
        "Spitting or urinating in the pool is strictly prohibited.",
        "Keep the pool area clean and use dustbins.",
        "Follow staff instructions at all times.",
        "Management is not responsible for loss of personal belongings.",
        "In case of emergency, contact Reception immediately.",
        "The pool may be closed for maintenance or bad weather without prior notice.",
        "Loud music or disturbing other guests is not allowed.",
        "Respect other guests and enjoy safely.",
      ],
    },
    {
      id: "amendments",
      title: "16. Amendments to These Terms & Conditions",
      paragraphs: [
        "GHD Hotels LLP reserves the right to modify, amend, or update these Terms & Conditions at any time without prior notice.",
        `The latest version shall always be available at ${NIVAARA_CONTACT.website}.`,
        "Continued use of our services constitutes acceptance of the revised Terms & Conditions.",
      ],
    },
    {
      id: "guest-feedback",
      title: "17. Guest Feedback & Care",
      paragraphs: [
        "At Nivaãra by GHD Hotels, we value your feedback and continuously strive to improve our guest experience.",
        "For any compliments, suggestions, feedback, or concerns regarding your stay, please contact us at:",
        `Guest Care Email: ${GUEST_CARE_CONTACT.email}`,
        "We appreciate every opportunity to serve you better and will make every effort to respond to your feedback in a timely manner.",
      ],
    },
    {
      id: "contact-reservations",
      title: "18. Contact & Reservations",
      paragraphs: [
        "GHD Hotels LLP",
        `Reservation Email: ${NIVAARA_CONTACT.reservationEmail}`,
        `Reservation No.: ${NIVAARA_CONTACT.reservationPhones[0].display}`,
        `Website: ${NIVAARA_CONTACT.website}`,
      ],
    },
  ],
};
