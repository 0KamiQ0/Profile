import fullLogo from "../assets/full-logo.png";
import bgMntGold from "../assets/bg_mnt_gold.png";
import audioPic from "../assets/audioicon.png";
import {MapPinIcon} from "@phosphor-icons/react";
import SocialLink from "./SocialLink";
import { siDiscord, siInstagram, siSpotify } from "simple-icons";
import AudioPlayer from "./AudioPlayer";

type MainPageProps = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

export default function MainPage({ audioRef } : MainPageProps) {
    return (
        <div className="mainPage">
            <div className="crtOverlay" />
            <img src={bgMntGold} alt="Background Mountain Gold" className="bgImage" />

            <div className="profile-card">
                <img src={fullLogo} alt="logo" className="avatarImg" />
                
                <h1 className="displayName" data-text="KamiQ">KamiQ</h1>
                <svg style={{position: "absolute", width: 0, height: 0}}>
                    <filter id="wave">
                        <feTurbulence
                            type="turbulence"
                            baseFrequency="0.00 0.75"
                            numOctaves="1"
                            seed="2"
                        >
                            <animate 
                                attributeName="seed"
                                values="1;2;3;4;5;6;7;8"
                                dur=".25s"
                                repeatCount="indefinite"
                            />
                        </feTurbulence>

                        <feDisplacementMap in="SourceGraphic" scale="10"/>
                    </filter>
                </svg>

                <p className="bio">『 the body achieves what the mind believes 』</p>

                <div className="loc">
                    <MapPinIcon size={20} weight="fill" className="mapIcon"/>
                    <span>Portugal</span>
                </div>

                <div className="socials">
                    <SocialLink href="https://discord.gg/a2GJesXKvb" icon={siDiscord.path} size={32} color="#f4bc4a" className="slink"/>
                    <SocialLink href="https://open.spotify.com/user/21bextaaquxmnivdlleh3bmey" icon={siSpotify.path} size={32} color="#f4bc4a" className="slink"/>
                    <SocialLink href="https://www.instagram.com/d.marques.05/" icon={siInstagram.path} size={32} color="#f4bc4a" className="slink"/>
                </div>
            </div>

            <AudioPlayer audioRef={audioRef} title="MY EYES - Travis Scott" icon={audioPic}/>
        </div>
    );
}