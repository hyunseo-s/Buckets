const WaveHeader = () => {
  return (
    <div>
      {/* Blue Row */}
      <div className="bg-[#D5EEFF] h-10 w-full"></div> 

      {/* Wave SVG with Moved Up Wave */}
      <svg
        style={{ height: "120pt", minWidth: "100%" }}
        className="absolute top-10 left-0 w-full h-10"
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
    </div>
  );
};

export default WaveHeader;
