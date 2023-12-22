import React from 'react'
import {ErrorComp} from "./ErrorComp"
export const Error = ({error}) => {
  return (
   <ErrorComp>
    {error}
   </ErrorComp>
  )
}
