Page({
  data: {
    deviceTypes: ['请选择', '铝管', '风机'],  // 设备类型选项
    selectedDeviceType: '',  // 选择的设备类型
    formData: {
      length: '',
      width: '',
      height: '',
      itemName: '',
      itemQuantity: '',
      startTemp: '',
      targetTemp: '',
      coolingTime: '',
      province: '',
      city: '',
      selectedDeviceType: ''  // 用于保存选择的设备类型
    },
    submitBtnClass: 'disabled',  // 按钮初始状态为禁用
  },

  // 校验数字输入
  validateNumberInput: function(value) {
    // 校验是否为有效数字，允许数字和小数
    const numberPattern = /^(\d+(\.\d+)?)?$/;
    return numberPattern.test(value);
  },

  // 更新设备类型或输入框值
  handleInputChange: function(e) {
    const field = e.target.dataset.field;  // 获取字段名
    const value = e.detail.value;  // 获取picker选中的值或输入框内容

    // 如果是数字输入框，进行数字校验
    if (field === 'length' || field === 'width' || field === 'height' || field === 'itemQuantity' || field === 'startTemp' || field === 'targetTemp' || field === 'coolingTime') {
      // 如果不是有效数字，弹出提示并阻止更新
      if (!this.validateNumberInput(value)) {
        wx.showToast({
          title: '请输入有效的数字',
          icon: 'none',
          duration: 2000
        });
        return;  // 不更新 formData 中的值
      }
    }

    if (field === 'selectedDeviceType') {
      const selectedIndex = e.detail.value;  // 获取 picker 选择的索引
      this.setData({
        [`formData.${field}`]: this.data.deviceTypes[selectedIndex],  // 更新 formData
        selectedDeviceType: this.data.deviceTypes[selectedIndex]  // 更新显示的设备类型
      });
    } else {
      this.setData({
        [`formData.${field}`]: value  // 更新输入框值
      });
    }
    this.checkFormCompletion();  // 每次更新输入框后，检查表单完整性
  },

  // 检查所有输入框是否为空
  checkFormCompletion: function() {
    const formData = this.data.formData;
    const isComplete = Object.values(formData).every(value => value !== '' && value !== null && value !== undefined);
    if (isComplete) {
      this.setData({
        submitBtnClass: 'enabled'  // 如果所有字段都填写了，启用按钮
      });
    } else {
      this.setData({
        submitBtnClass: 'disabled'  // 如果有任何字段为空，禁用按钮
      });
    }
  },

  // 提交表单
  onSubmit: function() {
    const formData = this.data.formData;
    const isComplete = Object.values(formData).every(value => value !== '' && value !== null && value !== undefined);

    if (isComplete) {
      const formDataString = encodeURIComponent(JSON.stringify(formData)); // 序列化并编码 formData
      wx.navigateTo({
        url: `/pages/result/result?formData=${formDataString}`  // 通过 URL 参数传递数据
      });
    } else {
      wx.showToast({
        title: '请完整输入列表数据',
        icon: 'none',
        duration: 2000
      });
    }
  }
});
