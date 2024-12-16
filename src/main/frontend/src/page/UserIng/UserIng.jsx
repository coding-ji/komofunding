import React, { useEffect } from 'react';
import { useStore } from '../../stores/PaymentStore/useStore';  // useStore 훅을 가져옵니다.
import MyContainers from '../../components/MyContainers';

function UserIng() {
    const { state, actions } = useStore();  // state와 actions를 useStore 훅을 통해 가져옵니다.

    // redux 상태에서 진행 중인 펀딩 데이터를 가져옵니다.
    const products = state.paymentData;  // 상태에서 paymentData를 가져옵니다.

    // 프로젝트 상태를 '진행 중'으로 설정하여 데이터를 가져옵니다.
    useEffect(() => {
        actions.getMyFundingByProject('ongoing').then((response) => {
            console.log('API 응답 데이터:', response);
        }).catch((error) => {
            console.error('API 호출 오류:', error);
        });
    }, []);

    console.log('products:', products);

    // 삭제 핸들러 예시 (여기에 실제 삭제 로직을 추가할 수 있습니다)
    const handleDelete = (product) => {
        console.log(`삭제하려는 제품: ${product.title}`);
        // 삭제 로직 추가 (예: API 호출 후 상태 업데이트)
    };

    // 수정 핸들러 예시 (여기에 실제 수정 로직을 추가할 수 있습니다)
    const handleEdit = (product) => {
        console.log(`수정하려는 제품: ${product.title}`);
        // 수정 로직 추가 (예: 수정 페이지로 이동)
    };

    // 컨테이너 클릭 시의 핸들러 예시 (제품 클릭 시 어떤 동작을 할지 정의)
    const handleContainerClick = (product) => {
        console.log(`컨테이너 클릭한 제품: ${product.title}`);
        // 클릭 후 어떤 동작을 할지 정의 (예: 상세 페이지로 이동)
    };

    return (
        <div>
        {products && products.length > 0 ? (
            <MyContainers
                text="ongoing"
                products={products} // Redux 상태에서 가져온 데이터 전달
                onDelete={handleDelete}
                onEdit={handleEdit}
                onContainerClick={handleContainerClick}
            />
        ) : (
            <p>후원 중인 프로젝트가 없습니다.</p>
        )}
    </div>
    );
}

export default UserIng;
