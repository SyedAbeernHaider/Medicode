"use client"

import { useState } from "react"

const HumanModel = ({ zoomLevel = 1 }) => {
  const [imageLoaded, setImageLoaded] = useState(false)



  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f8ff",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {!imageLoaded && (
        <div style={{
          position: "absolute",
          color: "#666",
          fontSize: "1.2em",
          textAlign: "center",
          zIndex: 10
        }}>
          Loading image...
        </div>
      )}
      <img
        src="/humen.png"
        alt="Human Body Diagram"
        onLoad={handleImageLoad}
        style={{
          maxWidth: `${Math.min(100 * zoomLevel, 100)}%`,
          maxHeight: `${Math.min(100 * zoomLevel, 100)}%`,
          objectFit: "contain",
          transition: "all 0.3s ease"
        }}
      />
    </div>
  )
}

export default HumanModel
