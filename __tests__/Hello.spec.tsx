/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import HelloWorld from '@/components/HelloWorld'


describe('test hello world', () => {
  it('displays message', () => {
    const testMessage = 'Hello World!'
    const { container, getByText } = render(
      <HelloWorld msg={testMessage} />
    )

    expect(container.textContent).toContain(testMessage)
    expect(getByText(/is production: /i).textContent).toBe('is production: false')
  })
})
