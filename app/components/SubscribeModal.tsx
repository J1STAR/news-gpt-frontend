type SubscribeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <button className="close" onClick={onClose}>&times;</button>
        <h2>📧 뉴스레터 구독</h2>
        <p>매주 AI가 분석한 뉴스 인사이트를 이메일로 받아보세요!</p>

        <form className="email-form">
          <input type="email" className="email-input" placeholder="이메일 주소를 입력하세요" required />
          <button type="submit" className="submit-btn">구독하기</button>
        </form>

        <div className="success-message">
          ✅ 구독이 완료되었습니다! 매주 인사이트를 받아보세요.
        </div>
        <div className="error-message">
          ❌ 구독 중 오류가 발생했습니다. 다시 시도해주세요.
        </div>
      </div>
    </div>
  );
} 