import React from "react";
import "./TermsPopup.css";
import { Btn } from "../../../components/MyBtn";

function TermsPopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header"></div>
        <h2>이용 약관</h2>
        <div className="popup-terms-content">
          <p>
            <strong>제 1조 (목적)</strong>
            <br />
            본 약관은 제작자가 펀딩 플랫폼을 통해 프로젝트를 생성하고 운영함에 있어 준수해야 할 기본적인 권리와 의무를 규정함을 목적으로 합니다.
          </p>
          <p>
            <strong>제 2조 (용어의 정의)</strong>
            <br />
            1. 플랫폼: 본 서비스를 제공하는 온라인 기반의 펀딩 시스템을 의미합니다.
            <br />
            2. 제작자: 플랫폼을 통해 프로젝트를 생성하고 후원을 모집하는 개인 또는 단체를 의미합니다.
            <br />
            3. 후원자: 제작자의 프로젝트를 후원하는 개인 또는 단체를 의미합니다.
            <br />
            4. 프로젝트: 제작자가 펀딩을 위해 플랫폼에 등록한 사업, 활동, 또는 계획을 의미합니다.
          </p>
          <p>
            <strong>제 3조 (제작자의 의무)</strong>
            <br />
            1. 제작자는 플랫폼에 등록하는 모든 정보의 정확성을 보장해야 합니다.
            <br />
            2. 제작자는 플랫폼 운영 정책과 관련 법령을 준수해야 하며, 위반 시 책임을 집니다.
          </p>
          <p>
            <strong>제 4조 (후원금 사용)</strong>
            <br />
            제작자는 후원금을 약속된 프로젝트 진행에만 사용해야 하며, 불법적인 목적으로 사용할 수 없습니다.
          </p>
          <p>
            <strong>제 5조 (플랫폼의 권리)</strong>
            <br />
            플랫폼은 제작자가 약관을 위반하거나 허위 정보를 제공한 경우, 프로젝트를 중단하거나 제작자 자격을 박탈할 수 있습니다.
          </p>
          <p>
            <strong>제 6조 (면책)</strong>
            <br />
            플랫폼은 제작자와 후원자 간의 분쟁에 대해 책임을 지지 않으며, 모든 분쟁은 당사자 간 해결해야 합니다.
          </p>
          <p>
            <strong>제 7조 (정보 보호)</strong>
            <br />
            플랫폼은 제작자의 개인 정보를 보호하며, 관련 법령에 따라 처리합니다.
          </p>
          <p>
            <strong>제 8조 (약관의 변경)</strong>
            <br />
            플랫폼은 필요 시 약관을 변경할 수 있으며, 변경 사항은 플랫폼을 통해 공지됩니다.
          </p>
          <p>
            <strong>제 9조 (계약 해지)</strong>
            <br />
            제작자가 약관을 위반하거나 프로젝트 진행이 불가능할 경우, 플랫폼은 계약을 해지할 수 있습니다.
          </p>
          <p>
            <strong>제 10조 (기타)</strong>
            <br />
            1. 본 약관은 플랫폼과 제작자 간의 모든 법적 관계를 규율하며, 관련 법률에 따라 해석됩니다.
            <br />
            2. 약관에서 규정하지 않은 사항은 관계 법령과 상관례에 따릅니다.
          </p>
        </div>
        <div className="popup-button-container">
          <Btn
            onClick={onClose}
            text="확인"
            width="100px"
            padding="2px 2px"
            fontSize="1rem"
            height="30px"
          />
        </div>
      </div>
    </div>
  );
}

export default TermsPopup;
