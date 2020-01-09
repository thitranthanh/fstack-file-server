var FormWizardUtils = function () {
    return {
        onNext : function(tab, navigation, index) {
        	
            var isLastStep = false;
            
            var total = navigation.find('li').length;
            var current = index + 1;
            $('.stepHeader', $('#formWizard')).text('Step ' + (index + 1) + ' of ' + total);
            jQuery('li', $('#formWizard')).removeClass("done");
            var li_list = navigation.find('li');
            for (var i = 0; i < index; i++) {
                jQuery(li_list[i]).addClass("done");
            }
            if (current == 1) {
                $('#formWizard').find('.prevBtn').hide();
            } else {
                $('#formWizard').find('.prevBtn').show();
            }
            if (current >= total) {
                $('#formWizard').find('.nextBtn').hide();
                $('#formWizard').find('.submitBtn').show();
                isLastStep = true;
            } else {
                $('#formWizard').find('.nextBtn').show();
                $('#formWizard').find('.submitBtn').hide();
            }
            return isLastStep;
        },
        onPrevious : function(tab, navigation, index) {
            var total = navigation.find('li').length;
            var current = index + 1;
            $('.stepHeader', $('#formWizard')).text(
                    'Step ' + (index + 1) + ' of ' + total);
            jQuery('li', $('#formWizard')).removeClass("done");
            var li_list = navigation.find('li');
            for ( var i = 0; i < index; i++) {
                jQuery(li_list[i]).addClass("done");
            }
            if (current == 1) {
                $('#formWizard').find('.prevBtn').hide();
            } else {
                $('#formWizard').find('.prevBtn').show();
            }
            if (current >= total) {
                $('#formWizard').find('.nextBtn').hide();
                $('#formWizard').find('.submitBtn').show();
            } else {
                $('#formWizard').find('.nextBtn').show();
                $('#formWizard').find('.submitBtn').hide();
            }
        },
        onTabShow : function(tab, navigation, index) {
            var total = navigation.find('li').length;
            var current = index + 1;
            var $percent = (current / total) * 100;
            $('#formWizard').find('.progress-bar').css({
                width : $percent + '%'
            });
        },
        onTabClick : function(tab, navigation, index) {
            return false;
        },
        /* validation utils START*/
        highlight: function (element, msg) { 
            $(element)
                .closest('.form-group').removeClass('has-success').addClass('has-error');
            if(typeof msg != 'undefined') {
                $(element).parent().find("span.error-span").html(msg);
            }
        },
        unhighlight: function (element) { 
            $(element)
                .closest('.form-group').removeClass('has-error'); 
        },
        customHighlight: function (element, msg) { 
            $(element)
                .closest('.form-container').removeClass('has-success').addClass('has-error');
            if(typeof msg != 'undefined') {
                $(element).parent().find("span.error-span").html(msg);
            }
        },
        customUnhighlight: function (element) { 
            $(element)
                .closest('.form-container').removeClass('has-error'); 
        },
        success: function (label) {
//            if (label.attr("for") == "gender") { 
//                label.closest('.form-group').removeClass('has-error').addClass('has-success');
//                label.remove(); 
//            } else { 
                label.addClass('valid') 
                .closest('.form-group').removeClass('has-error').addClass('has-success'); 
//            }
        },
        customSuccess: function (label) {
            label.addClass('valid').closest('.form-container').removeClass('has-error').addClass('has-success'); 
        }
        /* validation utils END*/
    };
}();