import { useMemo } from 'react'
import { textTruncate } from '../utils'

interface PropsType {
  children: string;
  charNum: number;
}

const TextTruncate = ({ children, charNum }: PropsType) => {
  const text = useMemo(() => {
    return textTruncate(children, charNum)
  }, [children, charNum])

  return <>{text}</>
}

export default TextTruncate
