## bug修复、实现文章评论功能

## 1.bug修复

- 评论的回复数只有一条时，不会显示回复

  其实是文章详情页面 ，reviewRight 部分，判断时`item.subComments.length>1`,当时设计的时候好像是是打算，太少了就不用隐藏。结果后面忘了。改成`item.subComments.length>=1`，然后加一个判断，等于1时不用展示更多评论按钮，就可以了。