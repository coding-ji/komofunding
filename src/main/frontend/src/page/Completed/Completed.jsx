import React from 'react';
import TitleText from '../../components/TitleText';
import MyNavLine from '../../components/MyNavLine';
import MyContainers from '../../components/MyContainers';
import MyNav from '../../components/MyNav';

function Completed() {

    const products = [
        { title: "진행마감", description: "Description for product 1", text: "DELETE" },
        { title: "진행마감", description: "얄루얄루", text: "CHECK" },
        { title: "진행마감", description: "얄루얄루", text: "CHECK" },
        { title: "진행마감", description: "얄루얄루", text: "DELETE" },
        { title: "진행마감", description: "얄루얄루", text: "DELETE" },
        { title: "진행마감", description: "얄루얄루", text: "DELETE" },
        { title: "진행마감", description: "얄루얄루", text: "DELETE" },
        { title: "진행마감", description: "얄루얄루", text: "DELETE" },
        { title: "진행마감", description: "얄루얄루", text: "DELETE" },
      ];
      

    return (
        <div>
            <MyContainers products={products}/>
        </div>
    )

}

export default Completed;