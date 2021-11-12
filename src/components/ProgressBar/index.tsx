import React, { useState, useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const ProgressBar: React.FC = function () {
  console.log('😋😋😋😋')
  NProgress.configure({ showSpinner: true })
  NProgress.start()
  useEffect(() => {

    return () => {
      NProgress.done()
    }
  })

  return <></>
}

export default ProgressBar
