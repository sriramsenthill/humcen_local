import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export { default as AuthUtils } from "./utils/authUtils";
export { default as commonUtils } from "./utils/commonUtils";
export * from './assets/images';
