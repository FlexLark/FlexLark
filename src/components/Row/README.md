## Row 和 Col 组件

### 开发目的

实现首页定制化功能，实现不同组件的控件分割功能。

例如在首页第一个Row中使用两个Col将控件分为2份。

Row 需要的参数主要就是子元素，根据子元素划分横向控件。

Col 需要的参数主要也是子元素，也会根据子元素划分控件。

### Props

```ts
type RowProps = {
    children: {
        node: ReactNode,
        span: number,
    }[]
}
```
