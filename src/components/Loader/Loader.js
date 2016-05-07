import React from 'react'
// import styles from './Loader.css'

const styles = {}

function Loader() {
  return (
  	<div className={styles.loader}>
    	<span className={styles.block}></span>
    	<span className={styles.block}></span>
    	<span className={styles.block}></span>
    	<span className={styles.block}></span>
    	<span className={styles.block}></span>
    	<span className={styles.block}></span>
    	<span className={styles.block}></span>
    	<span className={styles.block}></span>
    	<span className={styles.block}></span>
    </div>
  )
}

export default Loader
