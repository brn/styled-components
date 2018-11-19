// @flow
import type { Interpolation, Target } from '../types'
import React from 'react'

export default (css: Function) => {
  const constructWithOptions = (
    componentConstructor: Function,
    tag: Target,
    options: Object = {},
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      typeof tag !== 'string' &&
      typeof tag !== 'function' &&
      typeof tag !== 'object'
    ) {
      // $FlowInvalidInputTest
      throw new Error(`Cannot create styled-component for component: ${tag}`)
    }

    /* This is callable directly as a template function */
    const templateFunction = (
      strings: Array<string>,
      ...interpolations: Array<Interpolation>
    ) => {
      const C = componentConstructor(
        tag,
        options,
        css(strings, ...interpolations),
      )
      return React.forwardRef((p, ref) => {
        const propsForElement = Object.keys(p).reduce((acc, propName) => {
          // Don't pass through non HTML tags through to HTML elements
          // always omit innerRef
          if (propName !== 'children') {
            // eslint-disable-next-line no-param-reassign
            acc[propName] = p[propName]
          }

          return acc
        }, {})
        propsForElement.innerRef = ref
        propsForElement.__styled_components_isTag = typeof tag === 'string';
        return React.createElement(C, propsForElement, p.children)
      })
    }

    /* If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = config =>
      constructWithOptions(componentConstructor, tag, { ...options, ...config })
    templateFunction.attrs = attrs =>
      constructWithOptions(componentConstructor, tag, {
        ...options,
        attrs: { ...(options.attrs || {}), ...attrs },
      })

    return templateFunction
  }

  return constructWithOptions
}
