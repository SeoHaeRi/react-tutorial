import React from 'react';
import classNames from 'classnames';
import './button.scss';

function Button({ children, size, color, outline, fullWidth }) {
    //className에 CSS 클래스 이름을 동적으로 넣어줄 때
    return <button className={classNames('button', size, color, {
        outline,
        fullWidth
    })}>{children}</button>;
}

Button.defaultProps = {
    size: 'medium',
    color: 'blue'
};

export default Button;