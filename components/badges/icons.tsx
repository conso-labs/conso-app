import Image from "next/image";

// Platform icon components
const YouTubeIcon = () => (
  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
    <svg
      className="w-10 h-10 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  </div>
);

const TwitchIcon = () => (
  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
    <svg
      className="w-10 h-10 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
    </svg>
  </div>
);

const XIcon = () => (
  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
    <svg
      className="w-10 h-10 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  </div>
);

const RedditIcon = () => (
  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
    <svg
      className="w-10 h-10 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  </div>
);

const FarcasterIcon = () => (
  <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center">
    <svg
      className="w-10 h-10 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M19.5 2h-15A2.5 2.5 0 0 0 2 4.5v15A2.5 2.5 0 0 0 4.5 22h15a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 19.5 2zM18 17.5h-2v-7h-3v-2h5v9zm-6-9v9H9.5v-6h-2v-3H12z" />
    </svg>
  </div>
);

const InstagramIcon = () => (
  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center">
    <svg
      className="w-10 h-10 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  </div>
);

const DiscordIcon = () => (
  <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center">
    <svg
      className="w-10 h-10 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  </div>
);

const TelegramIcon = () => (
  <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center">
    <svg
      className="w-10 h-10 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  </div>
);

const PlaystationIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/playstation.png"
        alt="PlayStation Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const XboxIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/xbox.png"
        alt="PlayStation Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const SteamIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/steam.png"
        alt="PlayStation Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const GooglePlayIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/googleplay.png"
        alt="PlayStation Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const RobloxIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/roblox.jpg"
        alt="PlayStation Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const ChessIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/chess.png"
        alt="PlayStation Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const EpicGamesIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/epicgames.png"
        alt="PlayStation Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const RetroachievementsIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/retroachievements.png"
        alt="PlayStation Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const GithubIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/github.png"
        alt="Github Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const SpotifyIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/spotify.png"
        alt="Spotify Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const MediumIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/medium.png"
        alt="Medium Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const SubstackIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/substack.png"
        alt="Substack Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const SuiNSIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/suins.png"
        alt="Substack Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const SlushIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/slush.png"
        alt="Slush Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const SuiPlayIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/suiplay.jpg"
        alt="Substack Icon"
        width={40}
        height={40}
      />
    </div>
  );
};

const SuiPassportIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/sui.png"
        alt="Sui Passport Icon"
        width={50}
        height={50}
      />
    </div>
  );
};

const ClaynosaurzIcon = () => {
  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <Image
        src="/images/icons/claynosaurz.png"
        alt="Substack Icon"
        width={60}
        height={60}
      />
    </div>
  );
};

export {
  YouTubeIcon,
  TwitchIcon,
  XIcon,
  RedditIcon,
  FarcasterIcon,
  InstagramIcon,
  DiscordIcon,
  TelegramIcon,
  PlaystationIcon,
  XboxIcon,
  SteamIcon,
  GooglePlayIcon,
  RobloxIcon,
  ChessIcon,
  EpicGamesIcon,
  RetroachievementsIcon,
  GithubIcon,
  SpotifyIcon,
  MediumIcon,
  SubstackIcon,
  SuiNSIcon,
  SlushIcon,
  SuiPlayIcon,
  SuiPassportIcon,
  ClaynosaurzIcon,
};
