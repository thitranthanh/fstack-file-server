var ActionLogService = function() {
    
    var ACTION_LOGS = "web/controller/authenticated/action-logs";
    
    var TEMPLATES = undefined;
    
    return {
        getListActionLogDataModel : function(onsuccess, options) {
            var url = ACTION_LOGS + "/list-action-log-data-model";
            AjaxUtils.doGet(url, onsuccess, options);
        },
        loadTemplates : function() {
            var dfd = jQuery.Deferred();
            if(TEMPLATES != undefined) {
                dfd.resolve(TEMPLATES);
            } else {
                RequireJSUtils.loadActionLogModuleTemplates([
                     "list-action-log.htm", "action-log-detail.htm"], 
                     function(listActionLogTpl, actionLogDetailTpl) {
                         TEMPLATES = {
                             listActionLogTpl : listActionLogTpl,
                             actionLogDetailTpl : actionLogDetailTpl
                         };
                         dfd.resolve(TEMPLATES);
                     }
                );
            }
            return dfd.promise();
        },
        showActionLogListView : function() {
            var myself = this;
            myself.loadTemplates().done(function(templates) {
                myself.getListActionLogDataModel(function(actionLogDataModel) {
                    var targetView = new ActionLogListView({
                        templates : templates,
                        actionLogDataModel : actionLogDataModel
                    });
                    router.showView(mainContent, targetView);
                }, AjaxUtils.blockUILoadingAjax());
            });
        },
    };
}();

// action log list view start
var ActionLogListView = Backbone.View.extend({

    initialize : function(options) {
        var templates = options["templates"];
        this.templates = templates;
        
        var actionLogDataModel = options["actionLogDataModel"];
        
        this.tpl = templates["listActionLogTpl"];
        this.setActionLogs(actionLogDataModel["actionLogs"]);
        
        var breadcrumb = ActionLogConsts.getListActionLogBreadcrumb();
        InspiniaCommonUtil.renderBreadcrumb(ActionLogConsts.getBreadcrumbHeader(), breadcrumb);
        this.prepareData();
    },
    events : {
//        "click button[id='btnAdd']" : "showAddHost",
    },
    render : function() {
        var myself = this;
        var authorities = SessionManager.getActionLogModuleAuthorities();
        var renderHtml = _.template(myself.tpl, {
            actionLogs : myself.getActionLogs(),
            authorities : authorities
        });
        return this.$el.html(renderHtml);
    },
    getActionLogs : function() {
        var ret = this.actionLogs;
        if(ret == undefined) {
            ret = [];
        }
        return ret;
    },
    setActionLogs : function(actionLogs) {
        this.actionLogs = actionLogs;
    },
    getActionLogByActionLogId : function(actionLogId) {
        var ret = undefined;
        var actionLogs = this.getActionLogs();
        for(var i=0; i<actionLogs.length; i++) {
            var actionLog = actionLogs[i];
            if(actionLog["id"] == actionLogId) {
                ret = actionLog;
                break;
            }
        }
        return ret;
    },
    prepareData : function() {
        var myself = this;
        var authorities = SessionManager.getHostModuleAuthorities();
        var actionLogs = myself.getActionLogs();
        for(var i=0; i<actionLogs.length; i++) {
            var actionLog = actionLogs[i];
            actionLog["statusHtml"] = ActionLogConsts.getActionLogStatusHtml(actionLog["status"]);
        }
    },
    pageReady : function() {
        var authorities = SessionManager.getHostModuleAuthorities();
        var hasActionButtons = 
            authorities['isView'] || authorities['isUpdate'] || authorities['isDelete'];
        
        var aoColumns = [
                         { sWidth: '1%', "bSortable": false },
                         { "bSortable": true },
                         { "bSortable": true },
                         { "bSortable": true },
                         { "bSortable": true },
                         { "bSortable": true },
                       ];
        var order = [[ 1, "desc" ]];
        $('#tblActionLogs').DataTable({
//            dom: '<"html5buttons"B>lTfgitp',
            buttons: [
                {extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel', title: 'ExampleFile'},
                {extend: 'pdf', title: 'ExampleFile'},

                {extend: 'print',
                 customize: function (win){
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                }
                }
            ],
            "aoColumns": aoColumns,
            "order": order,
        });
    },
    viewDetail : function(actionLogId) {
        var myself = this;
        var actionLog = this.getActionLogByActionLogId(actionLogId);
        console.log(JSON.stringify(actionLog));
        var renderHtml = _.template(myself.templates["actionLogDetailTpl"], {
            actionLog : actionLog
        });
        
        var buttons = {
            cancel : {
                className : "btn-default",
                label : "Close",
            },
        }
        var dialogContainer = InspiniaDialogUtil.showDialog(
                "Action Log Detail", renderHtml, buttons);
        return false;
    },
    close : function() {
        this.unbind();
        this.remove();
        delete this.$el;
        delete this.el;
    }
});
// action log list view end