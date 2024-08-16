import { ReactNode } from "react"

export type RowProps = {
  children: {
      node: ReactNode,
      span: number,
  }[]
}
export const Row = ({ children }: RowProps) => {
  return (
    <div className={`flex flex-row items-baseline justify-center`}>
      {
        children.map(
          (child, index) => <div key={index} className={`flex flex-col items-center justify-center w-full ${child.span ? `w-[${child.span}fr]` : ''}`}>{child.node}</div>
        )
      }
    </div>
  )
}

