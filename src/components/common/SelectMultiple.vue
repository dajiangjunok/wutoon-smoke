<template>
  <div>
    <van-field readonly
               clickable
               label="类型"
               required
               :rules="[{ required: true, message: '不能为空' }]"
               name="type"
               :value="type"
               placeholder="请选择"
               @click="selectTypes()" />
    <div v-if="showType"
         class="popup-bg">
      <div class="popup">
        <div class="btn flex-between">
          <div @click="showType=false"
               class="cancle">取消</div>
          <div @click="confirm"
               class="confirm">确定</div>
        </div>
        <div class="item"
             v-for="(item,index) of typesList"
             :key="index"
             @click="selectItem(item.code)">
          <span>{{item.text}}</span><i :class="{'selected':isSelected(item.code)}"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: null,
      showType: false,
      typesList: [{
        code: 1,
        text: '类型1'
      }, {
        code: 2,
        text: '类型2'
      }, {
        code: 3,
        text: '类型3'
      }, {
        code: 4,
        text: '类型4'
      }, {
        code: 1,
        text: '类型1'
      }, {
        code: 2,
        text: '类型2'
      }, {
        code: 3,
        text: '类型3'
      }, {
        code: 4,
        text: '类型4'
      }],
      activeIndexList: [],
    }
  },
  methods: {
    //选择施工类型
    selectTypes () {
      this.showType = true;
    },
    confirm () {
      this.showType = false;
    },
    //选中的类型
    selectItem (id) {
      this.activeIndexList.push(id)
      var arr1 = [];
      for (var i = 0; i < this.activeIndexList.length; i++) {
        if (arr1.indexOf(this.activeIndexList[i]) == -1) {
          //选中的新数组里面没有相同的数据push到选中的新数组里面
          arr1.push(this.activeIndexList[i])
        } else if (arr1.indexOf(this.activeIndexList[i]) > -1) {
          //选中的新数组里面有相同的数据，去掉选中的新数组里面的值,代表点击的行已被点击过，这次点击则删除选中数组里面的值
          var index = arr1.indexOf(this.activeIndexList[i]);
          arr1.splice(index, 1)
        }
      }
      this.activeIndexList = arr1;
    },
    isSelected (id) {
      for (let item of this.activeIndexList) {
        if (item == id) {
          return true;
        }
      }
    },
  }
};
</script>

<style scoped lang="scss">
.popup-bg {
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  .popup {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: auto;
    // border-radius: 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: #fff;

    .item {
      padding: 0 15px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #f7f8f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .selected {
        width: 16px;
        height: 16px;
        /* background: url("../../image/selected.png") no-repeat; */
        background-size: 16px auto;
      }
    }
  }
}
</style>