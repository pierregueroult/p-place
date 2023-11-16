"use client";

import { useState, useEffect } from "react";

const serverUrl = "https://placewebsocket.pierregueroult.dev";

export default function IsOnline() {
  const [online, setOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkServer() {
      try {
        const res = await fetch(serverUrl + "/health");
        if (res.status === 200) setOnline(true);
      } catch (e) {
        setOnline(false);
      } finally {
        setLoading(false);
      }
    }

    checkServer();
  }, []);

  return loading ? (
    <>Chargement ... </>
  ) : online ? (
    <>Le serveur est en ligne</>
  ) : (
    <>Le serveur est hors ligne</>
  );
}
