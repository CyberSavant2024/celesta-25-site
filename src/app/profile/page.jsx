"use client";

import { useEffect, useState, useRef, useCallback, memo } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import {
  User,
  Mail,
  Calendar,
  CreditCard,
  Download,
  Share2,
} from "lucide-react";

import { useAuth } from "@/context/AuthUserContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/ProfileCard";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/ui";
import styles from "./Profile.module.css";

// Info item component
const Info = memo(function Info({ icon, label, value, highlight }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md">
      <div
        className={`p-2 rounded-lg ${
          highlight
            ? "bg-indigo-500/20 text-indigo-300"
            : "bg-white/20 text-white/70"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-white/60">{label}</p>
        <p className="text-sm font-medium break-all">{value || "—"}</p>
      </div>
    </div>
  );
});

// QR Actions component
const QRActions = memo(function QRActions({ onDownload, onShare }) {
  return (
    <div className="flex gap-3 mt-6">
      <Button size="sm" variant="outline text-black" onClick={onDownload}>
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
      <Button size="sm" variant="outline text-black" onClick={onShare}>
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
    </div>
  );
});

export default function Profile() {
  const { authUser, loading } = useAuth();
  const qrRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    dob: "",
    celestaId: "",
    qrEnabled: false,
  });
  const [qrValue, setQrValue] = useState("");

  // Fetch profile data
  useEffect(() => {
    async function fetchProfile() {
      if (!authUser) return;

      try {
        const token = await authUser.getIdToken(true);
        const res = await axios.get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setProfile({
            name: res.data.user.displayName,
            email: res.data.user.email,
            dob: res.data.user.dob,
            celestaId: res.data.user.celestaId,
            qrEnabled: res.data.user?.qrEnabled,
          });
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    }

    fetchProfile();
  }, [authUser]);

  // Fetch QR code
  useEffect(() => {
    if (!authUser || !profile.qrEnabled) return;

    async function fetchQR() {
      try {
        const token = await authUser.getIdToken(true);
        const res = await axios.get("/api/qr/generate", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQrValue(JSON.stringify(res.data));
      } catch (err) {
        console.error("QR fetch error:", err);
      }
    }

    fetchQR();
  }, [authUser, profile.qrEnabled]);

  // Convert QR SVG to blob for download/share
  const qrToBlob = useCallback(async () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return null;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = 400;
    canvas.height = 400;

    return new Promise((resolve) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 400, 400);
        canvas.toBlob(resolve);
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    });
  }, []);

  // Download QR code
  const downloadQR = useCallback(async () => {
    const blob = await qrToBlob();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.celestaId}_QR.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, [qrToBlob, profile.celestaId]);

  // Share QR code
  const shareQR = useCallback(async () => {
    const blob = await qrToBlob();
    if (!blob) return;

    const file = new File([blob], "celesta-qr.png", { type: "image/png" });

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Celesta Entry QR",
        text: `Entry QR for ${profile.name}`,
      });
    } else {
      downloadQR();
    }
  }, [qrToBlob, profile.name, downloadQR]);

  if (loading) {
    return <LoadingPage message="Loading profile..." />;
  }

  return (
    <div className={styles.background}>
      <Card
        className="
          w-full max-w-5xl
          bg-white/10 backdrop-blur-2xl
          border border-white/20
          shadow-[0_0_40px_rgba(255,255,255,0.08)]
          text-white
          overflow-hidden
        "
      >
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-xl font-semibold tracking-wide">
            Profile
          </CardTitle>
          <CardDescription className="text-white/60 text-sm">
            Celesta 2026 · IIT Patna
          </CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-6">
          {/* Profile Info */}
          <div className="space-y-4">
            <Info icon={<User />} label="Name" value={profile.name} />
            <Info icon={<Mail />} label="Email" value={profile.email} />
            <Info icon={<Calendar />} label="DOB" value={profile.dob} />
            <Info
              icon={<CreditCard />}
              label="Celesta ID"
              value={profile.celestaId}
              highlight
            />
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm text-white/70 mb-4 tracking-wide">
              ENTRY QR PASS
            </p>

            <div
              ref={qrRef}
              className={`
                relative p-6 rounded-3xl
                ${profile.qrEnabled ? "bg-white" : "bg-white/80"}
                transition-all duration-300
                shadow-[0_0_30px_rgba(99,102,241,0.25)]
              `}
            >
              {profile.qrEnabled ? (
                qrValue ? (
                  <QRCodeSVG value={qrValue} size={260} />
                ) : (
                  <div className="w-[260px] h-[260px] flex items-center justify-center text-gray-400">
                    Loading QR...
                  </div>
                )
              ) : (
                <>
                  <img
                    src="/images/dummyqr.png"
                    alt="QR Locked"
                    className="w-[260px] h-[260px] object-cover rounded-xl blur-sm opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 px-4 py-2 rounded-lg text-center">
                      <p className="text-xs text-white font-medium">
                        Register in any event
                      </p>
                      <p className="text-[11px] text-white/70">to unlock QR</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {profile.qrEnabled ? (
              <QRActions onDownload={downloadQR} onShare={shareQR} />
            ) : (
              <p className="mt-4 text-xs text-white/50 text-center max-w-[220px]">
                QR unlocks after registering for at least one event
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="justify-center text-xs text-white/50">
          Scan QR at Celesta entry gates
        </CardFooter>
      </Card>
    </div>
  );
}
