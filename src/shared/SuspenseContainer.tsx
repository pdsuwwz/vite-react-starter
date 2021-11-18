import React, { Suspense, useEffect, memo } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const ProgressBar: React.FC = function () {
  console.log('😋😋😋😋')
  NProgress.configure({
    showSpinner: false
  })
  NProgress.start()
  useEffect(() => {

    return () => {
      NProgress.done()
    }
  })

  return <></>
}


const SuspenseContainer: React.FC = ({ children: Children }) => {
  return (
    // <Suspense fallback={<ProgressBar />}>{Children}</Suspense>
    <Suspense fallback={<></>}>{Children}</Suspense>
  )
}

export default SuspenseContainer
