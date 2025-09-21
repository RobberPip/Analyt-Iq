"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  type User,
} from "@stream-io/video-react-sdk";
import { useParticipantCount } from "@stream-io/video-react-bindings/src/hooks/callStateHooks";

export default function HomePage() {
  const apiKey = "h82bqdm4gk6u";
  const userId = "JohnDoe";

  // Токен должен быть сгенерирован на сервере и соответствовать userId
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcl9pZCI6IkpvaG5Eb2UiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ.UO_lOr1ltI33Gp0-PfaizAmcBdyRa6qb2Gs7UBl_VHo";

  const user: User = { id: userId };

  const [client] = useState(
    () => new StreamVideoClient({ apiKey, user, token }),
  );
  const [call, setCall] = useState<ReturnType<typeof client.call> | null>(null);

  useEffect(() => {
    const currentCall = client.call("default", "testttt1");
    setCall(currentCall);
    currentCall.join({ create: false }).catch(console.error);

    return () => {
      currentCall.leave();
      client.disconnectUser();
    };
  }, [client]);

  if (!call) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to public page!</h1>
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout />
          <CallRatingForm />
        </StreamCall>
      </StreamVideo>
      <p>No session check here.</p>
    </div>
  );
}

export const MyUILayout = () => {
  const call = useCall();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();

  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Call "{call?.id}" has {participantCount} participants
    </div>
  );
};

export const CallRatingForm = () => {
  const call = useCall();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = useCallback(() => {
    if (!call) return;
    call
      .submitFeedback(rating, {
        reason: feedback,
        custom: { submittedAt: new Date().toISOString() },
      })
      .catch(console.error);
  }, [call, rating, feedback]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Оцените качество звонка</h3>
      <div
        style={{
          display: "flex",
          gap: "8px",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{ color: star <= rating ? "gold" : "grey" }}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        placeholder="Ваш отзыв (не обязательно)"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        style={{ width: "100%", height: "60px", marginTop: "10px" }}
      />
      <button
        onClick={handleSubmit}
        disabled={rating === 0}
        style={{ marginTop: "10px", padding: "8px 16px" }}
      >
        Отправить отзыв
      </button>
    </div>
  );
};
