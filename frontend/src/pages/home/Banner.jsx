// import "animate.css";
// import bannerIMG from "../../assets/banner.png";

// const Banner = () => {
//   return (
//     <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12">
//       <div className="w-full md:w-1/2 flex items-center md:justify-end animate__animated animate__fadeInRight">
//         <img
//           src={bannerIMG}
//           alt="banner image"
//           className="animate__animated animate__slideInLeft"
//           style={{ animationDuration: "1.5s", animationDelay: "0.5s" }}
//         />
//       </div>
//       <div
//         className="w-full md:w-1/2 animate__animated animate__fadeInUp"
//         style={{ animationDuration: "1.5s" }}
//       >
//         <h1
//           className="text-2xl md:text-5xl font-medium mb-7 animate__animated animate__fadeInUp"
//           style={{ animationDelay: "0.5s" }}
//         >
//           New Releases This Week
//         </h1>
//         <p
//           className="mb-10 animate__animated animate__fadeInUp"
//           style={{ animationDelay: "1s" }}
//         >
//           It&apos;s time to update your reading list with some of the latest and
//           greatest releases in the literary world. From heart-pumping thrillers
//           to captivating memoirs, this week&apos;s new releases offer something
//           for everyone.
//         </p>
//         <button
//           className="btn-primary animate__animated animate__fadeInUp"
//           style={{ animationDelay: "1.5s" }}
//         >
//           Subscribe
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Banner;

import { useState, useEffect, useRef } from "react";
import "animate.css";
import bannerIMG from "../../assets/banner.png";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Trigger when 20% of the section is visible
    );

    const bannerElement = bannerRef.current;
    if (bannerElement) {
      observer.observe(bannerElement);
    }

    return () => {
      if (bannerElement) {
        observer.unobserve(bannerElement);
      }
    };
  }, []);

  return (
    <div
      ref={bannerRef}
      className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12"
    >
      {/* Image Section */}
      <div
        className={`w-full md:w-1/2 flex items-center md:justify-end ${
          isVisible ? "animate__animated animate__fadeInRight" : ""
        }`}
      >
        <img
          src={bannerIMG}
          alt="banner image"
          className={`${
            isVisible ? "animate__animated animate__slideInLeft" : ""
          }`}
          style={{
            animationDuration: "1.5s",
            animationDelay: "0.5s",
          }}
        />
      </div>

      {/* Text Section */}
      <div
        className={`w-full md:w-1/2 ${
          isVisible ? "animate__animated animate__fadeInUp" : ""
        }`}
        style={{ animationDuration: "1.5s" }}
      >
        <h1
          className={`text-2xl md:text-5xl font-medium mb-7 ${
            isVisible ? "animate__animated animate__fadeInUp" : ""
          }`}
          style={{ animationDelay: "0.5s" }}
        >
          New Releases This Week
        </h1>
        <p
          className={`mb-10 ${
            isVisible ? "animate__animated animate__fadeInUp" : ""
          }`}
          style={{ animationDelay: "1s" }}
        >
          It&apos;s time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week&apos;s new releases offer something
          for everyone.
        </p>
        <button
          className={`btn-primary ${
            isVisible ? "animate__animated animate__fadeInUp" : ""
          }`}
          style={{ animationDelay: "1.5s" }}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Banner;

// import bannerIMG from "../../assets/banner.png";

// const Banner = () => {
//   return (
//     <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12">
//       <div className="w-full md:w-1/2 flex items-center md:justify-end">
//         <img src={bannerIMG} alt="banner image" />
//       </div>
//       <div className="w-full md:w-1/2">
//         <h1 className="text-2xl md:text-5xl font-medium mb-7">
//           New Releases This Week
//         </h1>
//         <p className="mb-10">
//           It&apos;s time to update your reading list with some of the latest and
//           greatest releases in the literary world. From heart-pumping thrillers
//           to captivating memoirs, this week&apos;s new releases offer something
//           for everyone.
//         </p>
//         <button className="btn-primary">Subscribe</button>
//       </div>
//     </div>
//   );
// };

// export default Banner;
