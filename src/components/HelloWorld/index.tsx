import React, { useState } from 'react'

interface IProps {
  msg: string
}

const HelloWorld: React.FC<IProps> = (props) => {
  const [isProd] = useState<boolean>(import.meta.env.PROD)
  return (
    <>
      <div>{ props.msg }</div>
      <p>is production: { isProd.toString() }</p>
    </>
  )
}

export default HelloWorld
