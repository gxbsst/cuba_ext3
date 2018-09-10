﻿/**
* 编辑配置控制器
*/

Ext.define('App.view.sys.config.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.configedit',

    onSaveClick: function () { // 点击保存按钮
        var view = this.getView();
        var form = view.down('form');
        if (!form.isValid()) {
            return;
        }
        var values = form.getValues();
        values.Section = {
            ID: values.PID
        };
        values.Status = 0;
        Ext.Ajax.request({
            url: '/api/Config/Edit',
            method: 'POST',
            jsonData: values,

            success: function (response, opts) {
                var data = response.responseText;
                var obj = Ext.JSON.decode(data);
                if (obj.Code == 200) {
                    view.hide();
                    var list = Ext.ComponentQuery.query('configlist')[0];
                    var controller = list.getController();
                    controller.refreshConfig();
                    // Ext.notify('消息', '编辑成功！');
                    Ext.Msg.alert('消息', '编辑成功！');

                } else {
                    Ext.Msg.alert('消息', obj.Msg);
                }
            },

            failure: function (response, opts) {
                Ext.Msg.alert('消息', response.responseText);
            }
        });
    },

    onCancelClick: function () { // 点击取消按钮
        this.getView().hide();
    }
});