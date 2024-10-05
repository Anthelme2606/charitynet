'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, ArrowClockwise, VolumeMute, VolumeUp } from 'react-bootstrap-icons';

const videoContent = [
  { 
    title: "Introduction", 
    content: "Les dons de bienfaisance sont essentiels pour soutenir diverses causes importantes.",
    icon: "❤️"
  },
  { 
    title: "Types de dons", 
    content: "Il existe plusieurs façons de faire un don : argent, nourriture, vêtements, ou temps.",
    icon: "🎁"
  },
  { 
    title: "Impact", 
    content: "Chaque don, quelle que soit sa taille, peut avoir un impact significatif sur la vie des autres.",
    icon: "🌟"
  },
  { 
    title: "Comment donner", 
    content: "Vous pouvez donner en ligne, par téléphone, ou en personne à des organisations caritatives.",
    icon: "📱"
  },
  { 
    title: "Conclusion", 
    content: "Votre générosité peut faire une réelle différence dans le monde. Merci de votre soutien!",
    icon: "🌍"
  }
]

const VideoSlide=()=> {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)
  const totalDuration = 10000 // 10 seconds in milliseconds
  const slideDuration = 2000 // 2 seconds in milliseconds

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % videoContent.length)
            return 0
          }
          return prevProgress + (100 / (slideDuration / 50))
        })
      }, 50)
    }
    return () => clearInterval(interval)
  }, [isPlaying])
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // Réglage du volume
    }
  }, []);
  
  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        if (isPlaying && !isMuted) {
          try {
            await audioRef.current.play();
          } catch (error) {
            console.error("Error playing audio:", error);
          }
        } else {
          audioRef.current.pause();
        }
      }
    };
    playAudio();
  }, [isPlaying, isMuted]);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) {
        handleRestart()
      }
    }, totalDuration)

    return () => clearTimeout(timer)
  }, [isPlaying])

  

  const handleRestart = () => {
    setCurrentSlide(0)
    setProgress(0)
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="card w-100 max-w-3xl mx-auto bg-violet-100">
      <div className="card-body p-4">
        <div className="aspect-video bg-violet-600 rounded-lg mb-4 position-relative overflow-hidden">
          <div className="text-center p-4 text-white">
            <div className="fs-1 mb-4">{videoContent[currentSlide].icon}</div>
            <h2 className="h5 font-weight-bold mb-2">{videoContent[currentSlide].title}</h2>
            <p className="lead">{videoContent[currentSlide].content}</p>
          </div>
          <div className="position-absolute bottom-0 start-0 w-100 h-2 bg-violet-300">
            <div 
              className="h-100 bg-orange-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <button onClick={handlePlayPause} className="btn btn-orange me-2">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button onClick={handleRestart} className="btn btn-orange me-2">
              <ArrowClockwise className="h-4 w-4" />
            </button>
            <button onClick={handleMute} className="btn btn-orange">
              {isMuted ? <VolumeMute className="h-4 w-4" /> : <VolumeUp className="h-4 w-4" />}
            </button>
          </div>
          <span className="text-sm text-violet-800">
            Slide {currentSlide + 1} / {videoContent.length}
          </span>
        </div>
      </div>
      <audio ref={audioRef} loop>
        <source src="https://soundcloud.com/user-212318464/twinkle-twinkle-little-star-bedtime-lullabies-baby-sleep-music?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
export default VideoSlide;