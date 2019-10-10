# musicPlayer
简单音乐播放器，简单实现上一曲、下一曲切换，音乐的播放、暂停功能，展现歌名、作者的功能

### 进度条的实现

使用父子容器，设置相同的高度，设置不同的背景颜色，将子容器的宽度设为0，此时父子容器会叠在一起，实现进度条功能。 后面使用js来控制子容器的宽度(设置为父容器的百分比)
```
<div class="bar">
  <div class="progress-now"></div>
</div>
```
### JS的实现
主要功能实现技术：创建或者获取audio对象，操作audio对象，操作DOM节点，添加事件
```
audio对象的创建
通过构造函数的方式创建audio对象

var music = new Audio()

使用到的audio对象相关属性、方法

music.play() //在媒体回放被暂停后再次开始时触发

music.pause() //播放暂停时触发

music.src //设置或者获取音乐地址

music.currentTime //设置或者获取播放时间

music.duration //获取音乐长度，单位为秒
```
### 进度条的实现
通过计算当前播放时长占总的音乐长度的百分比percent
将percent的值赋给进度条的宽度，从而实现进度条进度
var percent = (music.currentTime/music.duration)*100 + '%'
progressNowNode.style.width = percent
上一曲、下一曲的实现 通过改变音乐列表的index值来改变相关信息，来实现歌曲的切换,如：

music.src = musicList[index].src
