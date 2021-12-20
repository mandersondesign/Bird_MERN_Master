/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { cssClass, data, delimiter } from './mock-data'

import MetaText from '..'

export default storiesOf('MetaText', module)
  .addWithJSX('simple (string as delimiter)', () => (
    <MetaText text={data} delimiter={delimiter} className={cssClass} />
  ))
  .addWithJSX('simple1 (number as delimiter)', () => (
    <MetaText text={data} delimiter={9829} className={cssClass} />
  ))
