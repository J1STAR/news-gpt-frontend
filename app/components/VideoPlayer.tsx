type VideoPlayerProps = {
  keyword: string;
};

export default function VideoPlayer({ keyword }: VideoPlayerProps) {
  return (
    <div className="video-container">
      <div className="video-player" id="videoPlayer">
        <div className="play-button"></div>
        <div className="video-title-overlay">
          <h2 id="videoTitle">{keyword} 뉴스 분석 리포트</h2>
          <p className="video-subtitle" id="videoSubtitle">AI가 분석한 최신 뉴스 트렌드</p>
        </div>
      </div>
    </div>
  );
} 