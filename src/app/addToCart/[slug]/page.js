// ⬅ paste generateMetadata here
import { db } from "@/firebase/clientapp";
import { doc, getDoc } from "firebase/firestore";

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const id = slug.split("-").pop();

  const docRef = doc(db, "beats", id);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    return {
      title: "Beat not found | UrbeatHub",
      description: "This beat does not exist.",
    };
  }

  const beat = snap.data();

  return {
    title: `${beat.title} | ${beat.username}`,
    description: "Listen and buy high-quality beats.",
    openGraph: {
      title: `${beat.title} | ${beat.username}`,
      description: "Listen and buy high-quality beats.",
      images: [
        beat.coverUrl || "https://urbeathub.com/default_og.png",
      ],
      url: `https://urbeathub.com/addToCart/${slug}`,
      type: "music.song",
    },
    twitter: {
      card: "summary_large_image",
      title: `${beat.title} | ${beat.username}`,
      description: "Listen and buy high-quality beats.",
      images: [beat.coverUrl],
    },
  };
}

// ⬇ Below this, your actual AddToCart page component
export default function AddToCartPage({ params }) {
  return (
    <div>
      {/* Your page code here */}
    </div>
  );
}
