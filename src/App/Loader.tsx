import { Fragment } from 'react'
import loaderIcon from '../assets/icons/loader.png'
import { Store, useTypedSelector } from './Store'
export default function Loader() {
  const { isLoading } = useTypedSelector((state: Store) => state.loader)
  return (
    isLoading ?
      <div className="loader-wrapper">
        <img src={loaderIcon} alt="" width={50} height={50} className="loader-icon" />
      </div> : <Fragment></Fragment>
  )
}
