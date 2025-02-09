import React, { useEffect, useState } from 'react'
import { version } from '../../../../package.json'

declare global {
  interface Window {
    api: {
      onDownloadProgress: (callback: (event: Event, percent: number) => void) => void
      removeDownloadProgressListener: () => void
      onUpdateAvailable: (callback: (event: Event) => void) => void
    }
  }
}

const UpdateProgress: React.FunctionComponent = () => {
  const [downloading, setDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    // Listen for download progress
    window.api.onDownloadProgress((_, percent) => {
      setDownloading(true)
      setDownloadProgress(percent)
    })

    window.api.onUpdateAvailable(() => {
      setUpdateAvailable(true) // Show the update available message
    })

    return (): void => {
      window.api.removeDownloadProgressListener()
    }
  }, [])

  // disable if you want to show the full version
  function trimVersion(version: string): string {
    return version.split('.').slice(0, 2).join('.')
  }

  return (
    <div>
      {downloading ? (
        <div>
          <p>Downloading update...</p>
          <progress value={downloadProgress} max={100}></progress>
          <p>{Math.round(downloadProgress)}%</p>
        </div>
      ) : updateAvailable ? (
        <p>New version available! Please wait for the download to begin.</p>
      ) : (
        <p>version: {trimVersion(version)}</p>
      )}
    </div>
  )
}

export default UpdateProgress
