import { useCallback, useEffect, useState } from "react";
import BirthdayIntro from "./components/BirthdayIntro";
import BirthdayMusicDock from "./components/BirthdayMusicDock";
import Welcome from "./components/Welcome";
import Memories from "./components/Memories";
import StoryJourney from "./components/StoryJourney";
import BirthdayCelebration from "./components/BirthdayCelebration";
import FinalSurprise from "./components/FinalSurprise";
import { useBirthdayMusic } from "./context/BirthdayMusicContext";

function App() {
  const [introOpen, setIntroOpen] = useState(true);
  const { startFromUserGesture } = useBirthdayMusic();

  const dismissIntro = useCallback(() => {
    setIntroOpen(false);
    void startFromUserGesture();
    window.requestAnimationFrame(() => {
      document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth" });
    });
  }, [startFromUserGesture]);

  useEffect(() => {
    document.body.style.overflow = introOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introOpen]);

  return (
    <main className="font-body">
      <BirthdayIntro open={introOpen} onOpen={dismissIntro} />
      <Welcome celebrate={!introOpen} />
      <Memories />
      <StoryJourney />
      <BirthdayCelebration />
      <FinalSurprise />
      <BirthdayMusicDock />
    </main>
  );
}

export default App;