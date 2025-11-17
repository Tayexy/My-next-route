"use client";

import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { FaPlay, FaShareAlt } from "react-icons/fa";

// Firebase
import { db } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";

export default function AddToCartPage({ params }) {
  const { slug } = params;

  // Extract song ID from slug: beat-title-here-ABC123
  const songId = slug.split("-").pop();

  const [song, setSong] = useState(null);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Fetch beat data from Firestore
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const ref = doc(db, "beats", songId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setSong({ id: snap.id, ...snap.data() });
        } else {
          console.error("Beat not found in Firestore");
        }
      } catch (err) {
        console.error("Error fetching beat:", err);
      }
    };

    fetchSong();
  }, [songId]);

  const handlePlay = () => {
    if (!playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setPlaying(!playing);
  };

  if (!song) return <p style={{ padding: 30 }}>Loading beat...</p>;

  return (
    <>
      {/* META TAGS FOR SOCIAL MEDIA SHARE */}
      <Head>
        <title>{song.title} | UrbeatHub</title>
        <meta
          name="description"
          content={`Buy and download "${song.title}" by ${song.username}. High-quality instrumental available instantly.`}
        />

        {/* Open Graph for WhatsApp / Facebook */}
        <meta property="og:title" content={`${song.title} | ${song.username}`} />
        <meta property="og:description" content="Instant beat purchase + preview." />
        <meta property="og:image" content={song.coverUrl} />
        <meta property="og:url" content={`https://urbeathub.com/add-to-cart/${slug}`} />
        <meta property="og:type" content="music.song" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${song.title} | ${song.username}`} />
        <meta name="twitter:description" content="Instant beat purchase + preview." />
        <meta name="twitter:image" content={song.coverUrl} />
      </Head>

      {/* PAGE CONTENT */}
      <div style={{ padding: 20, maxWidth: 700, margin: "auto" }}>
        <h1>{song.title}</h1>

        {/* COVER ART */}
        <Image
          src={song.coverUrl || "/default-cover.jpg"}
          width={600}
          height={600}
          alt={song.title}
          style={{
            borderRadius: 10,
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />

        {/* AUDIO PLAYER */}
        <div style={{ marginTop: 20 }}>
          <button
            onClick={handlePlay}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              background: "#111",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FaPlay />
            {playing ? "Pause" : "Play"}
          </button>

          <audio ref={audioRef} src={song.musicUrls?.taggedMp3}></audio>
        </div>

        {/* SHARE BUTTON */}
        <button
          style={{
            marginTop: 20,
            padding: "10px 20px",
            borderRadius: 8,
            background: "#0070f3",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
          onClick={() =>
            navigator.share?.({
              title: song.title,
              text: "Check this beat on UrbeatHub!",
              url: `https://urbeathub.com/add-to-cart/${slug}`,
            })
          }
        >
          <FaShareAlt /> Share Beat
        </button>
      </div>
    </>
  );
}
