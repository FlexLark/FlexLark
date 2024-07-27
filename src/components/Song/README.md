# Song 组件

### 开发目的

用于首页的自定义化，一般是以一组的形式存在，包含一个点击按钮，一个刷新按钮。

### Props

``` tsx
interface Props {
  title: string;
  songs: SongMateinfo[];
  onClick: () => void;
  onRefresh: () => void;
}
```