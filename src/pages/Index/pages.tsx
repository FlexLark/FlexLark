import React, { useState } from "react";
interface IndexComponent {
  Component: React.ComponentType,
  data: Record<string, any>,
  index: number
}
// TODO optimize
export function IndexPage() {
  const [indexComponentList, setIndexComponentList] = useState<Array<IndexComponent>>([])
  return (
    <div className="index pages">
      {
        indexComponentList.map(({ Component, data } ) => <Component {...data} />)
      }  
    </div>
  )
}