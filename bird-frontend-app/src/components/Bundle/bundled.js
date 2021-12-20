import React from 'react'
import { Bundle } from './Bundle'

const bundled = load => props => <Bundle load={load}>{Component => <Component {...props} />}</Bundle>

export default bundled
