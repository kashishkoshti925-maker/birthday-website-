import BirthdayMusicPlayer from "./BirthdayMusicPlayer";
import { useBirthdayMusic } from "../context/BirthdayMusicContext";

export default function BirthdayMusicDock() {
  const { musicEnabled } = useBirthdayMusic();

  if (!musicEnabled) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[165] w-[min(100%,17.5rem)] sm:bottom-6 sm:right-6"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <BirthdayMusicPlayer embedded />
    </div>
  );
}