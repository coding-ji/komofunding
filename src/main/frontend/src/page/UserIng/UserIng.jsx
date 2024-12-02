import React from 'react';
import TitleText from '../../components/TitleText';
import MyNavLine from '../../components/MyNavLine';
import MyContainers from '../../components/MyContainers';
import MyNav from '../../components/MyNav';

function UserIng() {

    const products = [
        { title: "Product 1", description: "Description for product 1", text: "REFUND" },
        { title: "포실포실하덕", description: "얄루얄루", text: "REFUND" },
        { title: "포실포실하덕", description: "얄루얄루", text: "REFUND" },
        { title: "포실포실하덕", description: "얄루얄루", text: "REFUND" },
        { title: "포실포실하덕", description: "얄루얄루", text: "REFUND" },
        { title: "포실포실하덕", description: "얄루얄루", text: "REFUND" },
        { title: "포실포실하덕", description: "얄루얄루", text: "REFUND" },
        { title: "포실포실하덕", description: "얄루얄루", text: "REFUND" },
        { title: "포실포실하덕", description: "얄루얄루", text: "REFUND" },
    ];

    return (
        <div>
            <MyContainers products={products} /> {/* 데이터 전달 */}
        </div>
    )

}

export default UserIng;