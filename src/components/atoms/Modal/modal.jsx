// React16之后提倡函数式组件，也适合新特性Hooks
import React from 'react';
import classNames from 'classnames';
import style from './model.css';

/*
  基于原子组件的特性
  props.title 标题
  props.contentCom 内容组件
  props.className 对话框包裹的样式（非外层遮罩）
  props.visible 是否可见
  props.maskable 是否显示遮罩
  props.dragable 是否可拖拽
  props.destroyChildOnClose 是否关闭时删除子组件，因为有些子组件中在didMount或willMount时候请求数据，因为关闭的时候，如果没有该属性，则子组件一直在didUpdate状态，就无法调用didMount或willMount生命周期函数
  props.onClose 关闭callback，一般是在外部设置visible为false，再传给组件
  props.onNarrow 缩小callback
*/
export default function Modal (props) {
    // 设置props默认值，也就是结构、样式、交互参数的默认值
    const { 
        title = '',
        contentCom = null,
        className = '',
        visible = true,
        maskable = true,
        dragable = true,
        destroyChildOnClose = true,
        onClose = () => {},
        onNarrow = () => {}
    } = props;
    
    // 定义`close`事件处理器
    const handleClose = () => {
        onClose();
    };
    
    // 定义`narrow(缩小)`事件处理器
    const handleNarrow = () => {
        onNarrow();
    };
    
    // 获取组件jsx结构
    const struct = Modal.getStruct(title, contentCom, className, maskable, destroyChildOnClose, handleClose, handleNarrow);


    return visible ? struct : void 0;
}

// 获取关闭图标svg
Modal.getCloseIconSVG = () => (
    <svg x="0px" y="0px" viewBox="0 0 10.2 10.1" data-radium="true" style={{ width: 10, height: 10 }}>
        <path fill="rgba(0, 0, 0, .4)" d="M0,0v10.1h10.2V0H0z M9.2,9.2H1.1V1h8.1V9.2z"></path>
    </svg>
);

// 获取缩小图标svg
Modal.getNarrowIconSVG = () => (
    <svg x="0px" y="0px" viewBox="0 0 10.2 10.2" data-radium="true" style={{ width: 10, height: 10 }}>
        <polygon fill="rgba(0, 0, 0, .4)" points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1 "></polygon>
    </svg>
);

// 获取组件结构
Modal.getStruct = function (title, content, className, maskable, destroyChildOnClose, handleNarrow, handleClose) {
    return (
        <div className={ style[ 'modal' ] }>
            {/* 遮罩 */}
            { maskable && (<div className={ style[ 'zask' ] } onClick={ handleClose }></div>) }
            <div className={ style[ 'modal-assist' ] }></div>
            <div className={    
                classNames({
                    [ style[ 'modal-actual' ] ]: true,
                    [ className ]: true
                })
            }>
                <div className={ style[ 'modal-header' ] }>
                    <span>{ title }</span>
                    <span>
                        <a href="javascript:;" onClick={ handleNarrow }>{ this.getNarrowIconSVG() }</a>
                        <a href="javascript:;" onClick={ handleClose }>{ this.getCloseIconSVG() }</a>
                    </span>
                </div>
                <div className={ style[ 'modal-content' ] }>
                    { destroyChildOnClose && content }
                </div>
            </div>
        </div>
    );
};

