import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { RoomDetailContent } from "@/components/RoomDetailContent";
import { Footer } from "@/components/Footer";
import { getAllRoomSlugs, getRoomCategoryById } from "@/lib/rooms";

type RoomDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllRoomSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: RoomDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomCategoryById(slug);

  if (!room) {
    return { title: "Room | Nivaãra by GHD Hotels" };
  }

  const seoTitlePrefix =
    room.id === "luxury-studio"
      ? "Luxury Studio Room in Nerul, Goa"
      : room.id === "luxury-valley-room"
        ? "Valley View Room in Nerul, Goa"
        : "Palms & Coastal View Room in Nerul, Goa";

  return {
    title: `${seoTitlePrefix} | Nivaãra by GHD Hotels`,
    description: room.description,
  };
}

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { slug } = await params;
  const room = getRoomCategoryById(slug);

  if (!room) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <RoomDetailContent room={room} />
      </main>
      <Footer />
    </>
  );
}
