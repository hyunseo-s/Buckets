import { Button, Title } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const WaveHeader = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    const updateToken = () => setToken(localStorage.getItem("token"));

    // Listen for storage changes (works across tabs)
    window.addEventListener("storage", updateToken);

    // Also listen for manual token updates
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem("token");
      setToken(currentToken);
    }, 500); // Poll every 500ms to detect changes

    return () => {
      window.removeEventListener("storage", updateToken);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="overflow-hidden w-full"
      style={{ position: 'relative' }}
    >
      <svg
        style={{ height: "120pt", width: "100%", position: 'absolute' }}
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#D5EEFF"
          fillOpacity="1"
          d="M1440,100L1360,90C1280,80,1120,60,960,70C800,80,640,100,480,110C320,120,160,110,80,100L0,90V0H1440Z"
        />
      </svg>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        left: '0',
        width: '95vw',
        paddingTop: '20px',
        paddingLeft: '40px',
        alignItems: 'center',
      }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px'
          }}
        >
          <svg width="41" height="42" viewBox="0 0 62 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M55.3685 56.9622C52.265 63.1693 22.8606 62.9477 16.6535 56.9622C16.0309 48.4637 11.3318 24.0868 9.88625 8.45651C9.44289 -1.98709 63.5614 -0.613491 61.095 7.34811L59.8816 29.7143L58.5515 52.9719H55.6071L55.3685 56.9622Z" fill="#1781FA"/>
          <path d="M9.88625 8.45651C9.44289 -1.98709 63.5614 -0.613491 61.095 7.34811M9.88625 8.45651C13.1066 14.8615 23.0823 17.4878 34.9737 17.7679M9.88625 8.45651C11.3318 24.0868 16.0309 48.4637 16.6535 56.9622C22.8606 62.9477 52.265 63.1693 55.3685 56.9622L55.6071 52.9719M34.9737 17.7679C44.1677 17.9845 53.3985 16.5669 57.807 16.1726L55.6071 52.9719M34.9737 17.7679V13.0881C50.1276 13.0881 59.0681 9.59753 61.095 7.34811M61.095 7.34811L59.8816 29.7143L58.5515 52.9719H55.6071" stroke="#0A4167" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M50.7926 47.7235C50.7926 48.703 49.2408 50.0301 37.4916 50.0301C25.7424 50.0301 24.4124 48.816 24.4124 47.8366C24.4124 46.8571 25.7424 48.7 37.4916 48.7C49.2408 48.7 50.7926 46.7441 50.7926 47.7235Z" fill="#D9D9D9"/>
          <path d="M53.231 30.2707C53.231 31.2501 49.6841 32.3744 37.9349 32.3744C26.1857 32.3744 21.9738 31.2501 21.9738 30.2706C21.9738 29.2912 26.1857 31.266 37.9349 31.266C49.6841 31.266 53.231 29.2912 53.231 30.2707Z" fill="#D9D9D9"/>
          <path d="M19.9786 54.9862C27.7933 58.1031 34.1748 59.0448 48.7974 59.4198C35.8522 61.5096 22.4171 60.0849 17.7618 56.7597L15.3233 39.6901L11.998 17.7435C13.7715 16.8568 17.7696 52.0981 19.9786 54.9862Z" fill="#0572C0"/>
          <circle cx="18.8703" cy="29.9361" r="1.10841" fill="white"/>
          <circle cx="21.5304" cy="47.2273" r="1.10841" fill="white"/>
          <circle cx="20.2003" cy="38.8032" r="1.10841" fill="white"/>
          <path d="M52.3444 38.8244C52.3444 39.8039 50.5709 41.4613 38.8217 41.4613C27.0726 41.4613 22.8606 39.8039 22.8606 38.8244C22.8606 37.845 27.0726 39.9329 38.8217 39.9329C50.5709 39.9329 52.3444 37.845 52.3444 38.8244Z" fill="#D9D9D9"/>
          <g filter="url(#filter0_d_143_528)">
          <path d="M56.4999 17.5C49.6201 32.8581 -10.6165 53.2799 10 8.5" stroke="#1C336A" stroke-width="2" stroke-linecap="round"/>
          </g>
          <path d="M61 6.2638C56.1628 11.9818 48.4697 12.2538 37.5 12.4999C56.6628 6.10923 19.6512 3.99989 15 3.99989C26.5 0.499979 52 0 61 6.2638Z" fill="#0F68CD"/>
          <defs>
          <filter id="filter0_d_143_528" x="0.721802" y="7.49976" width="60.7783" height="37.2478" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_143_528"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_143_528" result="shape"/>
          </filter>
          </defs>
          </svg>
          <Title>Bucket</Title>
        </div>
        {token 
          ? <IconUserCircle
              onClick={() => navigate('/profile')}
              size={40} 
            />
          : <></>
        }
      </div>
    </div>
  );
};

export default WaveHeader;