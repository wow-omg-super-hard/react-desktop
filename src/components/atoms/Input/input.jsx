import React, { useState, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './input.css';

/*
 * props.className 输入框样式
 * props.type 类别
 * props.value 输入框内容
 * props.defaultValue 输入框在mount时候的值
 * props.placeholder 占位字符
 * props.onChange 输入框字符改变事件
*/
export default function Input (props) {
    // 设置props默认值
    const {
        className = '',
        type = 'text',
        value = '',
        defaultValue = '',
        placeholder = ''
    } = props;
    // 输入框活动状态
    const [ active, setActive ] = useState(false);

    // 定义change handle
    const handleChange = ({ target }) => {
        onChange(target.value);
    };

    // 定义focus handle
    const handleFocus = () => {
        setActive(true);
    };

    // 定义blur handle
    const handleBlur = () => {
        setActive(false);
    };

    // 在didMount或didUpdate里绑定事件，所以需要一个开关标识是否绑定过事件
    let isBinded = false;

    useEffect(() => {
        const $input = findDOMNode(this.refs[ '$input' ]);

        if (!isBinded) {
            isBinded = true;
            $input.addEventListener('input propertychange', handleChange, false);
        }

        return () => {
            $input.removeEventListener('input propertychange', handleChange, false);
        };   
    });    

    // 获取组件jsx结构
    const struct = Input.getStruct({
        className,
        type,
        value: value == '' ? defaultValue : value,
        placeholder,
        handleFocus,
        handleBlur
    }, active);

    return struct;
}

Input.getStruct = function ({ className, type, value, placeholder, handleFocus, handleBlur }, active) {
    return (
        <span className={
            classNames({
                [ style[ 'input' ] ]: true,
                [ className ]: true,
                active
            })
        }>
            <input
                rel="$input"  
                type={ type } 
                value={ value }
                placeholder={ placeholder }
                onFocus={ handleFocus }
                onBlur={ handleBlur } />
        </span>
    );
};

// 验证props
Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
};