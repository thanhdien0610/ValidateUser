function Validator(option){

    function validate(selectorElement,rule){
        var errorElement = selectorElement.parentElement.querySelector(option.message);
        var errorMessage = rule.check(selectorElement.value);
        if (errorMessage){
            errorElement.innerText = errorMessage;
        } else {
            errorElement.innerText = '';
        }
    }

    var formElement = document.querySelector(option.form);
    console.log(formElement);

    if (formElement){
        option.rules.forEach(rule => {
            var selectorElement = formElement.querySelector(rule.selector);
            console.log(selectorElement);
            
            selectorElement.onblur = function(){
                validate(selectorElement,rule);
               
                selectorElement.oninput = function(){
                    var errorElement = selectorElement.parentElement.querySelector(option.message);
                    errorElement.innerText = '';
                }
                
                //console.log(errorElement );

                //console.log(rule.check(selectorElement.value)); 
            }


            
        });
    }
}

Validator.isRequired = function(selector){
    return {
        selector: selector,
        check: function(value){
            return value.trim() ? undefined : 'Vui lòng nhập tên';
        }
    }
};

Validator.isEmail = function(selector){
    return {
        selector: selector,
        check: function(value){
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return (value.match(regex)) ? undefined : 'Vui lòng nhập email'
        }
    }
};