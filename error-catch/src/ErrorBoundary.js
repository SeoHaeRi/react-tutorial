import { render } from '@testing-library/react';
import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        error: false
    };

    //( 에러 내용, 에러 발생 위치 )
    componentDidCatch(error, info){
        console.log('에러가 발생');
        console.log({
            error,
            info
        });
        this.setState({
            error: true
        });
    }

    render() {
        if (this.state.error) {
            return <h1>에러 발생!</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;