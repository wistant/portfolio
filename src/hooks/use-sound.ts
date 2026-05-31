"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { fetchAndDecodeAudio, getAudioContext } from "@/lib/sound-engine"

export interface UseSoundOptions {
  volume?: number
  playbackRate?: number
  interrupt?: boolean
  soundEnabled?: boolean
  lazy?: boolean
  onPlay?: () => void
  onEnd?: () => void
  onPause?: () => void
  onStop?: () => void
}

export type PlayFunction = (overrides?: {
  volume?: number
  playbackRate?: number
}) => void

export interface SoundControls {
  stop: () => void
  pause: () => void
  isPlaying: boolean
}

export type UseSoundReturn = readonly [PlayFunction, SoundControls]

export function useSound(
  url: string,
  options: UseSoundOptions = {}
): UseSoundReturn {
  const {
    volume = 1,
    playbackRate = 1,
    interrupt = false,
    soundEnabled = true,
    lazy = false,
    onPlay,
    onEnd,
    onPause,
    onStop,
  } = options

  const [isPlaying, setIsPlaying] = useState(false)

  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const bufferRef = useRef<AudioBuffer | null>(null)

  useEffect(() => {
    bufferRef.current = null

    if (lazy) return

    let cancelled = false

    fetchAndDecodeAudio(url).then((buffer) => {
      if (cancelled) return
      bufferRef.current = buffer
    })

    return () => {
      cancelled = true
    }
  }, [url, lazy])

  const stop = useCallback(() => {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop()
      } catch {
        // Already stopped
      }
      sourceRef.current = null
    }
    setIsPlaying(false)
    onStop?.()
  }, [onStop])

  const play: PlayFunction = useCallback(
    (overrides?) => {
      if (!soundEnabled) return

      const startPlayback = (buffer: AudioBuffer) => {
        const ctx = getAudioContext()

        if (ctx.state === "suspended") {
          ctx.resume()
        }

        if (interrupt && sourceRef.current) {
          stop()
        }

        const source = ctx.createBufferSource()
        const gain = ctx.createGain()

        source.buffer = buffer
        source.playbackRate.value = overrides?.playbackRate ?? playbackRate
        gain.gain.value = overrides?.volume ?? volume

        source.connect(gain)
        gain.connect(ctx.destination)

        source.onended = () => {
          setIsPlaying(false)
          onEnd?.()
        }

        source.start(0)
        sourceRef.current = source
        gainRef.current = gain
        setIsPlaying(true)
        onPlay?.()
      }

      if (bufferRef.current) {
        startPlayback(bufferRef.current)
        return
      }

      fetchAndDecodeAudio(url).then((buffer) => {
        bufferRef.current = buffer
        startPlayback(buffer)
      })
    },
    [soundEnabled, url, interrupt, playbackRate, volume, stop, onPlay, onEnd]
  )

  const pause = useCallback(() => {
    stop()
    onPause?.()
  }, [stop, onPause])

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = volume
    }
  }, [volume])

  useEffect(() => {
    return () => {
      if (sourceRef.current) {
        try {
          sourceRef.current.stop()
        } catch {
          // Already stopped
        }
      }
    }
  }, [])

  const controls: SoundControls = { stop, pause, isPlaying }

  return [play, controls] as const
}
