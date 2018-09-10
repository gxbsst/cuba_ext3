Ext.define('App.view.main.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    requires: [
        'App.util.Config'
    ],

    init: function () {
        var controller = this;
        Ext.getBody().on('keypress', function (e) {
            if (e.keyCode == Ext.EventObject.ENTER) {
                controller.onLoginClick();
            }
        });
    },

    onLoginClick: function () { // 点击登录按钮
        var form = this.getView().down('form').getForm();
        if (!form.isValid()) {
            return;
        }

        var values = form.getValues();
        var username = values.username;
        var password = values.password;

        // 调用api控制器
        var mask = new Ext.LoadMask({
            target: this.getView(),
            msg: '正在登录...',
            indicator: true,
            centered: true
        });
        mask.show();
        //Ext.Ajax.request({
        //    url: '/api/Login/Login?username=' + username + '&password=' + password,
        //    method: 'POST',
        //    success: function (response, opts) {
        //        var obj = Ext.JSON.decode(response.responseText);
        //        if (obj.Code == 200) {
        //            var config = Ext.create('util.config');
        //            config.setState('login');
        //            window.location.reload();
        //        } else {
        //            Ext.Msg.alert('消息', obj.Msg);
        //        }
        //    },
        //    failure: function (response, opts) {
        //        mask.hide();
        //        Ext.Msg.alert('错误', response.responseText);
        //    }
        //});
        setTimeout(function () { // 登录
            var config = Ext.create('util.config');
            config.setState('login');
            window.location.reload();
        }, 2000);
    },

    onResetClick: function () { // 点击重置按钮
        this.getView().down('form').getForm().reset();
    }
});