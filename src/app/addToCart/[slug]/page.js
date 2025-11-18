import { db } from "../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

// ✅ Metadata for OG tags
export async function generateMetadata({ params }) {
  const slug = params.slug;
  const id = slug.split("-").pop();

  const docRef = doc(db, "beats", id);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    return {
      title: "Beat not found | UrbeatHub",
      description: "This beat does not exist.",
      openGraph: {
        title: "Beat not found | UrbeatHub",
        description: "This beat does not exist.",
        images: ["https://urbeathub.com/default_og.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Beat not found | UrbeatHub",
        description: "This beat does not exist.",
        images: ["https://urbeathub.com/default_og.png"],
      },
    };
  }

  const beat = snap.data();

  return {
    title: `${beat.title} | ${beat.username}`,
    description: "Listen and buy high-quality beats.",
    openGraph: {
      title: `${beat.title} | ${beat.username}`,
      description: "Listen and buy high-quality beats.",
      images: [beat.coverUrl || "https://urbeathub.com/default_og.png"],
      url: `https://urbeathub.com/addToCart/${slug}`,
      type: "music.song",
    },
    twitter: {
      card: "summary_large_image",
      title: `${beat.title} | ${beat.username}`,
      description: "Listen and buy high-quality beats.",
      images: [beat.coverUrl || "https://urbeathub.com/default_og.png"],
    },
  };
}

// ✅ Server-side redirect to your React AddToCart page
export default async function AddToCartPage({ params }) {
  const slug = params.slug;
  const reactUrl = `https://urbeathub.com/addToCart/${slug}`;

  // Redirect immediately on the server
  redirect(reactUrl);
}
