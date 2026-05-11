import MainPage from "./components/Page";
import "./index.css";
import logo from "./assets/logo.svg";
import { useEffect, useRef, useState } from "react";

export default function App() {

    /**
     * Handle splash screen and typewriter effect
     */
    const titleText = "KamiQ";
    const musicRef = useRef<HTMLAudioElement | null>(null);

    const [entered, setEntered] = useState(false);
    const [entering, setEntering] = useState(false);
    const [titleIndex, setTitleIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentTitle = titleText.slice(0, titleIndex);

            document.title = currentTitle || "|";

            if (!deleting && titleIndex < titleText.length) {
            setTitleIndex(titleIndex + 1);
            } else if (!deleting && titleIndex === titleText.length) {
            setDeleting(true);
            } else if (deleting && titleIndex > 0) {
            setTitleIndex(titleIndex - 1);
            } else {
            setDeleting(false);
            }
        }, deleting ? 250 : 500);

        return () => clearTimeout(timeout);
    }, [titleIndex, deleting]);

    useEffect(() => {
        if (!entered) return;

        const music = musicRef.current;
        if (!music) return;

        music.volume = 0.35;
        music.play();
    }, [entered]);

    function handleEnter() {
        if (entering) return;

        setEntering(true);

        const enterSound = new Audio("/sounds/enter.mp3");
        enterSound.volume = 0.6;
        enterSound.play();

        setTimeout(() => {
        setEntered(true);
        }, 900);
    }

    if (entered) {
        return (
            <>
                <audio
                    ref={musicRef}
                    src="/bgmusic.mp3"
                    loop
                />

                <MainPage audioRef={musicRef}/>
            </>
        );
    }

    return (
        <main className={`introScreen ${entering ? "introLeaving" : ""}`} onClick={handleEnter}>
            <img src={logo} alt="Logo" className="introLogo" />

            <p className="introText">Click to Enter</p>
        </main>
    );
}