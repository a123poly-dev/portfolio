import styles from "./VideoEmbed.module.scss"

type TVideoEmbedProps = {
  vimeoId: string
  width?: number
  height?: number
}

export const VideoEmbed = ({
  vimeoId,
  width = 1100,
  height = 720,
}: TVideoEmbedProps) => (
  <div className={styles.wrapper}>
    <iframe
      src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
      width={width}
      height={height}
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      title="Video"
      className={styles.iframe}
    />
  </div>
)
