import React, { useMemo } from 'react'
import './style.scss'

export type IconFontProps = {
  icon: string;
  shadow?: boolean;
  disabled?: boolean;
  verticalCenter?: boolean;
  cursor?: boolean;
  onClick?: Function;
}

const IconFont: React.FC<IconFontProps> = (props) => {

  const handleClick = () => {
    if (props.disabled) return
    props?.onClick?.()
  }

  const getSvgClassneme = useMemo(() => {
    const result = []
    if (props.verticalCenter) {
      result.push('middle')
    }
    if (props.cursor) {
      result.push('cursor')
    }
    if (props.disabled) {
      result.push('disabled')
    }
    const classProperties = result.join(' ')
    return classProperties ? ` ${classProperties}` : ''
  }, [props])

  const getAttrs = useMemo(() => {
    const attrs:any = {}
    if (props.shadow) {
      attrs.filter = 'url(#drop-shadow)'
    }
    return attrs
  }, [props.shadow])

  return (
    <svg
      aria-hidden="true"
      onClick={ handleClick }
      className={
        `icon-font${getSvgClassneme}`
      }
    >
      <filter
        id="drop-shadow"
        xmlns="http://www.w3.org/2000/svg"
      >
        <feGaussianBlur
          in="SourceAlpha"
          stdDeviation="2"
        />
        <feOffset
          dx="1"
          dy="1"
          result="offsetblur"
        />
        <feComponentTransfer>
          <feFuncA
            type="linear"
            slope="0.2"
          />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode
            in="SourceGraphic"
          />
        </feMerge>
      </filter>
      <g
        {...getAttrs}
      >
        <use xlinkHref={'#' + props.icon} />
      </g>
    </svg>
  )
}

export default IconFont
