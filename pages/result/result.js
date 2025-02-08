Page({
  data: {
    formData: {}  // 用来存储传递过来的表单数据
  },

  onLoad: function(options) {
    // 获取并解析 URL 中的 formData 参数
    if (options.formData) {
      const formData = JSON.parse(decodeURIComponent(options.formData)); // 解析并解码
      this.setData({
        formData: formData  // 设置到页面数据中
      });
    }
  },

  onRecalculate: function() {
    // 重新计算的逻辑
    wx.showToast({
      title: '重新计算',
      icon: 'success',
      duration: 2000
    });
  },

  onEditForm: function() {
    // 修改表单的逻辑
    wx.navigateBack({
      url: '/pages/index/index' // 假设修改表单时返回到 index 页面
    });
  },

  onCreateNewForm: function() {
    // 新建表单的逻辑
    wx.navigateTo({
      url: '/pages/index/index' // 假设新建表单时返回到 index 页面
    });
  }
});
