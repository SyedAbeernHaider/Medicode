function LogoSlider() {
  // Top medical brands and institutions with logo image URLs
  const logos = [
    {
      id: 1,
      name: "Pfizer",
      logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyxrAaLKNONrvauMgplE5xOpSO-e9bd76Gcg&s"
    },
    {
      id: 2,
      name: "Johnson & Johnson",
      logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpn7S8KcKetxSPIovpl7H5GHpB8qTeUEV-yA&s"
    },
    {
      id: 3,
      name: "Novartis",
      logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2HqfsG0YB4jbs3SRuHj0YrsHbQD7k8Qg2Og&s"
    },
    {
      id: 4,
      name: "Roche",
      logoUrl: "https://pbs.twimg.com/profile_images/1884188790597541888/LvL1lIih_400x400.jpg"
    },
    {
      id: 5,
      name: "Merck",
      logoUrl: "https://civil-protection-knowledge-network.europa.eu/sites/default/files/styles/ucpkn_horizontal_featured/public/2022-08/Karolinska%20Institutet%20Logo.png?itok=iGQMKipq"
    },
    {
      id: 6,
      name: "Mayo Clinic",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/The_University_of_California_1868_UCSF.svg/2048px-The_University_of_California_1868_UCSF.svg.png"
    },
    {
      id: 7,
      name: "Cleveland Clinic",
      logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJpn7i_nihXSs_woxEFO5uEfXg7tGrjQxA&s"
    },
    {
      id: 8,
      name: "Medtronic",
      logoUrl: "https://w7.pngwing.com/pngs/710/105/png-transparent-imperial-college-london-university-of-london-imperial-college-school-of-medicine-ucl-advances-cass-business-school-others-emblem-text-logo-thumbnail.png"
    },
    {
      id: 9,
      name: "Abbott",
      logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlFy3Fis6Sk4GZWEtb_oE9Nv2SxGtBZ3XnsA&s"
    },
    {
      id: 10,
      name: "Siemens Healthineers",
      logoUrl: "https://gimgs2.nohat.cc/thumb/f/640/images-harvard-university-medical-logo--m2H7i8d3G6N4m2Z5.jpg"
    }
  ];

  return (
    <div className="w-full overflow-hidden bg-gray-50 py-12">
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide {
          animation: slide 30s linear infinite;
          display: flex;
          width: max-content;
        }
        .logo-track {
          display: flex;
          align-items: center;
          gap: 3rem;
        }
        .logo-item {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 140px;
          padding: 0 2rem;
        }
        .logo-img {
          height: 100%;
          width: 100%;
          object-fit: contain;
          filter: grayscale(100%);
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        .logo-img:hover {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.05);
        }
      `}</style>

      <div className="relative w-full">
        {/* Logo track - duplicated for seamless looping */}
        <div className="animate-slide">
          <div className="logo-track">
            {[...logos, ...logos].map((logo, index) => (
              <div key={`logo-${logo.id}-${index}`} className="logo-item">
                <img
                  src={logo.logoUrl}
                  alt={logo.name}
                  className="logo-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/200x80?text=Logo+Not+Found";
                    e.target.className = "logo-img placeholder-logo";
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoSlider;
