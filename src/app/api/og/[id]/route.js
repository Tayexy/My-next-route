import { app } from "../../../firebase/clientApp"; // fix here
import { ImageResponse } from "next/og";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);

export async function GET(req, { params }) {
  const { id } = params;

  const songSnap = await getDoc(doc(db, "beats", id));

  if (!songSnap.exists()) {
    return new Response("Not found", { status: 404 });
  }

  const song = songSnap.data();

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 50,
          background: "black",
          color: "white",
          width: "1200px",
          height: "630px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={song.coverUrl}
          width="1200"
          height="630"
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            fontSize: 70,
            textShadow: "3px 3px 11px black",
          }}
        >
          {song.title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
