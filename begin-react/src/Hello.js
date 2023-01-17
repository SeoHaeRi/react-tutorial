import React, { Component } from 'react';

// function Hello({ color, name, isSpecial }) {
//     return (
//         <div style={{
//             color
//         }}>
//             {isSpecial && <b>*</b>}
//             안녕하세요 {name}
//         </div>
//     );
// }

class Hello extends Component {
    render() {
        return (
            <div>
                {this.props.isSpecial && <b>*</b>}
            </div>
        );
    }
}

Hello.defaultProps = {
    name: '이름없음'
};
export default Hello;